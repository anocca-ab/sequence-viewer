import { useCanvas, useDOMListeners } from './hooks';
import { FilterChromatogramType, SearchComponent } from './types';
import {
  getSelectionDeltaAngle,
  isInSelection,
  isRangeInSelection,
  getSelectionOver,
  Annotations,
  CircularSelection,
  debounce,
  DrawFunction,
  getRatio,
  packAnnotations,
  RenderData,
  scaleBuffer,
  SeqAnnotationDirectionsEnum,
  SequenceControllerRef,
  SearchResult,
  SelectionRange,
  ChromatogramData
} from '@anocca/sequence-viewer-utils';
import React, { useEffect, useState } from 'react';

/**
 * Will add mouse and keyboard interactions to the sequence viewer.
 *
 * See:
 * {@link @anocca/sequence-viewer-utils#SequenceControllerRef | SequenceControllerRef},
 * {@link @anocca/sequence-viewer-utils#Annotations | Annotations},
 * {@link @anocca/sequence-viewer-utils#DrawFunction | DrawFunction},
 * {@link @anocca/sequence-viewer-utils#RenderData | RenderData},
 * {@link @anocca/sequence-viewer-utils#CircularSelection | CircularSelection},
 * {@link @anocca/sequence-viewer-utils#SelectionRange | SelectionRange},
 * {@link SearchComponent | SearchComponent}
 *
 * @public
 */
export const useController = ({
  isProtein,
  chromatogramData,
  clickedAnnotation,
  renderData,
  circularSelection,
  setCircularSelection,
  getCaretPosition,
  updateScroll,
  resetAngularScroll,
  zoomToSearchResult,
  draw,
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
  draw: DrawFunction;
  zoomToSearchResult: (nextViewRange: SelectionRange, zoom: boolean) => void;
  resetAngularScroll?: () => void;
  updateScroll: (deltaX: number, deltaY: number, mouseX: number, mouseY: number, shift: boolean) => void;
  getCaretPosition: () => number;
  renderData: React.MutableRefObject<RenderData | null>;
  circularSelection: CircularSelection[];
  setCircularSelection: (annotationId: undefined | string, cc: CircularSelection[]) => void;
  clickedAnnotation: string | undefined;
  isProtein: boolean;
  chromatogramData?: ChromatogramData;
}) => {
  const len = sequence.length;
  const iLen = len - 1;
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const [context, setContext] = useState<null | CanvasRenderingContext2D>(null);
  const [buffer, canvasRef] = useCanvas();

  const selectedAnnotations = React.useMemo(() => {
    const _annotations = new Set<string>();
    allAnnotations.forEach((annotation) => {
      annotation.locations.forEach((location) => {
        circularSelection.forEach((selection) => {
          if (isRangeInSelection([location[0] - 1, location[1] - 1], selection)) {
            _annotations.add(annotation.id);
          }
        });
      });
    });
    return [..._annotations];
  }, [allAnnotations, circularSelection]);

  const annotations = React.useMemo(() => allAnnotations.filter((a) => !a.hidden), [allAnnotations]);

  const annotationLevels = React.useMemo(() => packAnnotations(annotations, len), [annotations, len]);

  const [hoveringFeature, setHoveringFeature] = React.useState<undefined | string>();

  const [ratio, setRatio] = React.useState<undefined | number>(undefined);

  const [filterChromOptions, setFilterChromOptions] = React.useState<string[]>(['A', 'C', 'G', 'T', 'phred']);

  React.useEffect(() => {
    if (context) {
      setRatio(getRatio(context).ratio);
    }
  }, [context]);

  const canRender =
    ratio !== undefined && context && renderData.current
      ? {
          context,
          ratio,
          data: renderData.current
        }
      : undefined;

  const hasRendered = React.useRef(false);
  const render = () => {
    if (!canRender) {
      return;
    }
    hasRendered.current = true;
    const { hoveringFeature: _hoveringFeature } = draw({
      codons,
      annotationLevels,
      c: canRender.context,
      w: width,
      h: height,
      ratio: canRender.ratio,
      data: canRender.data,
      sequence,
      circularSelection,
      searchResults,
      renderStateRef: {
        hoveringFeature,
        clickedFeatures: selectedAnnotations
      },
      isProtein,
      filterChromOptions,
      chromatogramData
    });
    setHoveringFeature(_hoveringFeature);
  };

  const onClickAnnotation = (id: string | undefined, append?: boolean) => {
    if (id) {
      const nextSelections = annotations
        .filter((annotation) => annotation.id === id)
        .flatMap((a) => {
          const antiClockwise = a.direction === SeqAnnotationDirectionsEnum.REVERSE;

          return a.locations.map((location) => {
            const range = {
              start: location[antiClockwise ? 1 : 0] - 1,
              end: location[antiClockwise ? 0 : 1] - 1
            };
            return {
              state: 'selected' as const,
              antiClockwise,
              ...range
            };
          });
        });
      if (renderData.current) {
        if (resetAngularScroll) {
          resetAngularScroll();
        }
      }
      if (append) {
        setCircularSelection(id, [...circularSelection, ...nextSelections]);
      } else {
        setCircularSelection(id, nextSelections);
      }
    }
  };

  if (ref) {
    if ('current' in ref) {
      ref.current = {
        onClickAnnotation
      };
    } else {
      ref({
        onClickAnnotation
      });
    }
  }

  const clickedAnnotationCandidateDuringMouseDown = React.useRef<string | undefined>(undefined);

  const onScrollCb = (ev: WheelEvent) => {
    ev.preventDefault();
    updateScroll(ev.deltaX, ev.deltaY, ev.offsetX, ev.offsetY, ev.shiftKey);
    render();
  };

  const onScroll = debounce(onScrollCb);

  const selecting = !!circularSelection.find((s) => s.state === 'selecting');

  const _onStartDrag = (ev: MouseEvent) => {
    if (selecting) {
      return;
    }
    if (hoveringFeature) {
      clickedAnnotationCandidateDuringMouseDown.current = hoveringFeature;
      return;
    }
    clickedAnnotationCandidateDuringMouseDown.current = undefined;
    if (renderData.current) {
      const caretPosition = getCaretPosition();
      {
        const cs = [...circularSelection];
        if (!ev.shiftKey) {
          cs.splice(0, cs.length);
        }
        const currentSelection = getSelectionOver(caretPosition, cs);
        if (currentSelection) {
          /* a little fishy pattern but works since the arr is updated */
          currentSelection.state = 'selecting';
          if (currentSelection.start === currentSelection.end) {
            cs.splice(cs.indexOf(currentSelection), 1);
          }
        } else {
          cs.push({
            state: 'selecting',
            start: caretPosition,
            end: caretPosition,
            antiClockwise: undefined
          });
        }
        setCircularSelection(undefined, cs);
      }

      if (resetAngularScroll) {
        resetAngularScroll();
      }

      render();
    }
  };

  const onDblClick = (ev: MouseEvent) => {
    if (clickedAnnotation && openAnnotationDialog) {
      openAnnotationDialog(clickedAnnotation);
    }
  };

  const _onEndDrag = (ev: MouseEvent) => {
    if (hoveringFeature) {
      if (hoveringFeature === clickedAnnotationCandidateDuringMouseDown.current) {
        onClickAnnotation(hoveringFeature, ev.shiftKey);
        clickedAnnotationCandidateDuringMouseDown.current = undefined;
        return;
      }
    }
    clickedAnnotationCandidateDuringMouseDown.current = undefined;
    if (selecting) {
      setCircularSelection(
        undefined,
        circularSelection.map((cs) => ({ ...cs, state: 'selected' }))
      );
    }
    render();
  };

  const calledOtherDragFn = React.useRef(false);
  calledOtherDragFn.current = false;
  const onMouseMoveCb = (ev: MouseEvent) => {
    if (!hoveringFeature && clickedAnnotationCandidateDuringMouseDown.current) {
      clickedAnnotationCandidateDuringMouseDown.current = undefined;
    }
    if (
      ev.buttons === 1 &&
      !selecting &&
      clickedAnnotationCandidateDuringMouseDown.current === undefined &&
      calledOtherDragFn.current === false
    ) {
      calledOtherDragFn.current = true;
      _onStartDrag(ev);
      return;
    }
    if (
      ev.buttons === 0 &&
      selecting &&
      clickedAnnotationCandidateDuringMouseDown.current === undefined &&
      calledOtherDragFn.current === false
    ) {
      calledOtherDragFn.current = true;
      _onEndDrag(ev);
      return;
    }
    const rd = renderData.current;
    if (rd) {
      rd.mouseX = ev.offsetX;
      rd.mouseY = ev.offsetY;
      const caretPosition = getCaretPosition();

      if (ev.buttons === 1) {
        const _circularSelection = [...circularSelection];
        const cs = _circularSelection.find((cs) => cs.state === 'selecting');
        if (cs) {
          if (typeof cs.antiClockwise === 'undefined') {
            if (cs.start !== caretPosition) {
              cs.antiClockwise = caretPosition < cs.start;
            }
          } else if (cs.start === caretPosition) {
            cs.antiClockwise = undefined;
          }
          if (typeof cs.antiClockwise !== 'undefined') {
            if (
              getSelectionDeltaAngle(len, cs.antiClockwise, cs.start, caretPosition) -
                getSelectionDeltaAngle(len, cs.antiClockwise, cs.start, cs.end) >
              0.5
            ) {
              cs.antiClockwise = !cs.antiClockwise;
            }
          }
          cs.end = caretPosition;
          const toBeMerged = _circularSelection.filter(
            (c) => c !== cs && (isInSelection(c.start, cs) || isInSelection(c.end, cs))
          );
          if (toBeMerged.length > 0) {
            toBeMerged.forEach((m) => {
              _circularSelection.splice(_circularSelection.indexOf(m), 1);
            });
          }
          setCircularSelection(undefined, _circularSelection);
        }
      }
      render();
    }
  };

  const onMouseMove = debounce(onMouseMoveCb);

  const onClick = (ev: MouseEvent) => {
    if (ev.shiftKey) {
      const start = circularSelection[0]?.start;
      const end = getCaretPosition();
      const antiClockwise = start === end ? undefined : start > end;
      if (start) setCircularSelection(undefined, [{ start, end, antiClockwise, state: 'selecting' }]);
    }
  };

  useDOMListeners(buffer, onClick, _onStartDrag, _onEndDrag, onScroll, onMouseMove, onDblClick);

  const renderRef = React.useRef(render);
  renderRef.current = render;

  useEffect(() => {
    if (buffer) {
      scaleBuffer(buffer, width, height);
      setContext(buffer.getContext('2d'));
    }
  }, [buffer, height, setContext, width]);

  useEffect(() => {
    if (canRender && !hasRendered.current) {
      renderRef.current();
    }
  }, [canRender]);

  React.useEffect(() => {
    renderRef.current();
  }, [
    circularSelection,
    allAnnotations,
    width,
    height,
    isProtein,
    clickedAnnotation,
    sequence,
    codons,
    searchResults,
    filterChromOptions
  ]);
  React.useLayoutEffect(() => {
    renderRef.current();
  }, [
    circularSelection,
    allAnnotations,
    width,
    height,
    isProtein,
    clickedAnnotation,
    sequence,
    codons,
    searchResults
  ]);

  const canvas = <canvas ref={canvasRef} />;

  const _zoomTo = (nextViewRange: SearchResult, zoom: boolean) => {
    zoomToSearchResult(nextViewRange, zoom);
    setCircularSelection(undefined, [
      {
        state: 'selected',
        start: nextViewRange.complement ? nextViewRange.end - 1 : nextViewRange.start,
        end: nextViewRange.complement ? nextViewRange.start : nextViewRange.end - 1,
        antiClockwise: nextViewRange.complement
      }
    ]);
    renderRef.current();
  };

  const search = Search && (
    <Search
      isProtein={isProtein}
      sequence={sequence}
      zoomOnResult={(result) => {
        _zoomTo(result, true);
      }}
      onSearchResults={(results) => {
        setSearchResults(results);
      }}
      spinOnResult={(result) => {
        _zoomTo(result, false);
      }}
    />
  );

  const filterChromatogram = chromatogramData && FilterChromatogram && (
    <FilterChromatogram
      optionsToRender={filterChromOptions}
      setOptionsToRender={(options: string[]) => setFilterChromOptions(options)}
    />
  );

  return {
    canvas,
    selectedAnnotations,
    circularSelection,
    clickedAnnotation,
    search,
    filterChromatogram,
    canvasRef,
    zoomToSearchResult,
    setSearchResults
  };
};
