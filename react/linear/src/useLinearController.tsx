import { FilterChromatogramType, SearchComponent, useController, useRenderData } from '@anocca/sequence-viewer-react-shared';
import {
  Annotations,
  dnaBaseWidth,
  CircularSelection,
  createScaleMatrix,
  createTranslateMatrix,
  matrixMultiply,
  SequenceControllerRef,
  proteinBaseWidth,
  SelectionRange,
  Matrix,
  ChromatogramData
} from '@anocca/sequence-viewer-utils';
import React from 'react';
import { drawLinear, getInverseMatrix, transformPoint } from '@anocca/sequence-viewer-render-linear';
import { identityMatrix, projectPointToMatrix } from './helpers';

const translateMatrix = (m: Matrix, w: number, viewRange: SelectionRange, isProtein: boolean) => {
  const baseWidth = isProtein ? proteinBaseWidth : dnaBaseWidth;

  const start = viewRange.start - 1;
  const end = viewRange.end;
  const bpsLen = end - start;
  const width = bpsLen * baseWidth;
  const screenWidth = w;
  // const scale = w / width;
  const padding = (screenWidth - width * m.a) / 2;

  m.e = -start * baseWidth * m.a + padding;
};

export const zoomMatrix = (m: Matrix, w: number, viewRange: SelectionRange, isProtein: boolean) => {
  const baseWidth = isProtein ? proteinBaseWidth : dnaBaseWidth;
  const start = viewRange.start - 1;
  const end = viewRange.end;
  const bpsLen = end - start;
  const width = bpsLen * baseWidth;
  const scale = w / width;
  const padding = Math.max((width * scale - width) / 2, 0);
  const appliedScale = Math.min(scale, 1);

  const nextMatrix = matrixMultiply(
    createTranslateMatrix(-start * baseWidth * appliedScale + padding, 0),
    createScaleMatrix(appliedScale)
  );

  m.e = nextMatrix.e;
  m.a = nextMatrix.a;
};

export const useLinearController = ({
  isProtein,
  chromatogramData,
  ref,
  width,
  height,
  sequence,
  allAnnotations,
  codons,
  Search,
  FilterChromatogram,
  openAnnotationDialog
}: {
  ref: React.ForwardedRef<SequenceControllerRef>;
  width: number;
  height: number;
  sequence: string;
  allAnnotations: Annotations;
  codons: { [k: string]: string };
  Search?: SearchComponent;
  FilterChromatogram?: FilterChromatogramType;
  openAnnotationDialog?: (annotationId: string) => void;
  isProtein: boolean;
  chromatogramData?: ChromatogramData
}) => {
  const len = sequence.length;
  const iLen = len - 1;

  const renderData = useRenderData(width, sequence, isProtein);
  const baseWidth = isProtein ? proteinBaseWidth : dnaBaseWidth;
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

  const updateScroll = (deltaX: number, deltaY: number, mouseX: number, mouseY: number, shift: boolean) => {
    if (!renderData.current) {
      return;
    }

    let zoom = !shift ? 1.1 ** (-deltaY / 50) : 1;

    let translateY = !shift ? 0 : -1 * deltaY * 0.1;
    let translateX = !shift ? -deltaX / renderData.current.matrix.a ** (1 / 1.2) : 0;

    let transformMatrix = identityMatrix();
    let newMatrix = identityMatrix();

    const transform = () => {
      const mousePos = projectPointToMatrix(mouseX, mouseY, renderData.current!.matrix);
      transformMatrix = matrixMultiply(
        createTranslateMatrix(mousePos.x, mousePos.y),
        createScaleMatrix(zoom),
        createTranslateMatrix(-mousePos.x, -mousePos.y),
        createTranslateMatrix(translateX, translateY)
      );
      newMatrix = matrixMultiply(renderData.current!.matrix, transformMatrix);
    };

    transform();

    let totalWidth = len * baseWidth * newMatrix.a;

    const minWidth = width - 96;

    if (totalWidth < minWidth && zoom < 1) {
      const targetA = minWidth / (len * baseWidth);

      zoom = 1 / targetA;
      // zoom = 1;
      transform();
    }

    if (newMatrix.a >= 1 && zoom > 1) {
      zoom = 1;
      transform();
    }

    totalWidth = len * baseWidth * newMatrix.a;

    /* at left edge */
    if (newMatrix.e > width / 2) {
      if (translateX > 0) {
        translateX = 0;
      }
      if (zoom < 1) {
        mouseX = Math.min(mouseX, width / 2);
      } else {
        mouseX = Math.max(mouseX, width / 2);
      }
      transform();
    }

    /* at right edge */
    if (newMatrix.e < -totalWidth + width / 2) {
      if (translateX < 0) {
        translateX = 0;
      }
      if (zoom > 1) {
        mouseX = Math.min(mouseX, width / 2);
      } else {
        mouseX = Math.max(mouseX, width / 2);
      }
      transform();
    }
    /* restrict vertical scroll */
    // const contentHeight =
    //   annotationLevels.length * baseHeight + 32 + 80 + 16 + 16;
    // if (newMatrix.f < height - contentHeight) {
    //   if (translateY < 0) {
    //     translateY = 0;
    //   }
    //   transform();
    // }
    if (newMatrix.f > 0) {
      if (translateY > 0) {
        translateY = 0;
      }
      transform();
    }

    renderData.current.matrix = newMatrix;
  };

  const getCaretPosition = () => {
    if (!renderData.current) {
      return 0;
    }

    const { mouseX, mouseY, matrix } = renderData.current;

    const inverseMatrix = getInverseMatrix(matrix);

    const mouseMatrixPos = transformPoint(mouseX, mouseY, inverseMatrix);
    const i = Math.min(Math.max(Math.floor(mouseMatrixPos.x / baseWidth), 0), iLen);
    return i;
  };

  const zoomToSearchResult = (nextViewRange: SelectionRange, zoom: boolean) => {
    if (renderData.current) {
      const { start, end } = nextViewRange;
      if (!zoom) {
        translateMatrix(
          renderData.current.matrix,
          width,
          {
            start,
            end: end + 1
          },
          isProtein
        );
      } else {
        zoomMatrix(
          renderData.current.matrix,
          width,
          {
            start,
            end: end + 1
          },
          isProtein
        );
      }
    }
  };

  return useController({
    circularSelection,
    setCircularSelection,
    clickedAnnotation,
    renderData,
    getCaretPosition,
    updateScroll,
    draw: drawLinear,
    zoomToSearchResult,
    ref,
    width,
    height,
    sequence,
    allAnnotations,
    codons,
    Search,
    FilterChromatogram,
    openAnnotationDialog,
    isProtein,
    chromatogramData
  });
};
