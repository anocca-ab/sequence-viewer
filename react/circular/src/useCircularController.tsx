import { SearchComponent, useController, useRenderData } from '@anocca/sequence-viewer-react-shared';
import {
  bindValue,
  drawCircular,
  getCircleProperties,
  getRadiusTargetForViewRange,
  increase
} from '@anocca/sequence-viewer-render-circular';
import {
  Annotations,
  CircularSelection,
  DrawFunction,
  SelectionRange,
  SequenceControllerRef,
  UpdateProps
} from '@anocca/sequence-viewer-utils';
import React from 'react';

export const useCircularController = ({
  isProtein,
  ref,
  width,
  height,
  sequence,
  allAnnotations,
  codons,
  Search,
  openAnnotationDialog,
  draw = drawCircular,
  interactiveElement,
  onUpdate
}: {
  ref: React.ForwardedRef<SequenceControllerRef>;
  width: number;
  height: number;
  sequence: string;
  allAnnotations: Annotations;
  codons: { [k: string]: string };
  Search?: SearchComponent;
  openAnnotationDialog?: (annotationId: string) => void;
  isProtein: boolean;
  draw?: DrawFunction;
  interactiveElement?: HTMLElement;
  onUpdate?: (props: UpdateProps) => void;
}) => {
  const len = sequence.length;
  const iLen = len - 1;
  const renderData = useRenderData(width, sequence, isProtein);
  const [circularSelection, _setCircularSelection] = React.useState<CircularSelection[]>([
    {
      state: 'selected',
      start: 0,
      end: 0,
      antiClockwise: undefined
    }
  ]);

  const [clickedAnnotation, setClickedAnnotation] = React.useState<undefined | string>(undefined);
  const setCircularSelection = (annotationId: undefined | string, cc: CircularSelection[]) => {
    setClickedAnnotation(annotationId);
    _setCircularSelection(cc);
  };

  const resetAngularScroll = () => {
    if (!renderData.current) {
      return;
    }

    const { angleOffset } = getCircleProperties({
      data: renderData.current,
      sequence,
      w: width,
      h: height,
      circularSelection
    });

    renderData.current.circularCamera.value.angle = 0;
    renderData.current.circularCamera.angleOffset = angleOffset;
    if (angleOffset > Math.PI) {
      renderData.current.circularCamera.angleOffset = -(Math.PI * 2 - angleOffset);
    }
    renderData.current.circularCamera.scrollOffsetZooming = 0;
    renderData.current.circularCamera.scrollOffsetZoomed = 0;
  };

  const zoomToSearchResult = (nextViewRange: SelectionRange, zoom: boolean) => {
    if (renderData.current) {
      resetAngularScroll();

      renderData.current.circularCamera.value = {
        zoom: zoom ? 1 : renderData.current.circularCamera.value.zoom,
        angle: 1,
        radius: zoom
          ? getRadiusTargetForViewRange(width, height, len, 1, nextViewRange)
          : renderData.current.circularCamera.value.radius
      };
      bindValue(renderData.current.circularCamera.value, renderData.current.circularCamera.target);
    }
  };

  const circularScroll = (deltaX: number, deltaY: number) => {
    if (!renderData.current) {
      return;
    }

    const zoomDelta = Math.abs(deltaX) > Math.abs(deltaY) ? 0 : -deltaY / 7500;
    const scrollDelta = Math.abs(deltaX) > Math.abs(deltaY) ? -deltaX / 1000 : 0;
    increase(zoomDelta, renderData.current.circularCamera.value, renderData.current.circularCamera.target);

    const { radius } = getCircleProperties({
      data: renderData.current,
      sequence,
      w: width,
      h: height,
      circularSelection
    });

    const horizontalScrollSpeed = 300;

    const scrollFactor = scrollDelta * (horizontalScrollSpeed / radius);

    if (renderData.current.circularCamera.value.angle === 1) {
      renderData.current.circularCamera.scrollOffsetZoomed += scrollFactor;
    } else {
      renderData.current.circularCamera.scrollOffsetZooming += scrollFactor;
    }
    renderData.current.circularCamera.angleOffset =
      (Math.PI * 2 + renderData.current.circularCamera.angleOffset) % (2 * Math.PI);
  };

  const updateScroll = (deltaX: number, deltaY: number) => {
    circularScroll(deltaX, deltaY);
  };

  const getCaretPosition = () => {
    if (!renderData.current) {
      return 0;
    }
    const { hoveringCaretPosition } = getCircleProperties({
      data: renderData.current,
      sequence,
      w: width,
      h: height,
      circularSelection
    });
    return hoveringCaretPosition;
  };

  return useController({
    resetAngularScroll,
    circularSelection,
    setCircularSelection,
    clickedAnnotation,
    renderData,
    getCaretPosition,
    updateScroll,
    draw,
    zoomToSearchResult,
    ref,
    width,
    height,
    sequence,
    allAnnotations,
    codons,
    Search,
    openAnnotationDialog,
    isProtein,
    isCircularView: true,
    interactiveElement,
    onUpdate,
  });
};
