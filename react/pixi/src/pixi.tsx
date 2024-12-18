import { useDOMListeners, type ControllerProps } from '@anocca/sequence-viewer-react-shared';
import type {
  Annotations,
  CircularCamera,
  CircularCameraProgress,
  CircularSelection,
  SearchResult,
  SelectionRange
} from '@anocca/sequence-viewer-utils';
import {
  getSelectionDeltaAngle,
  getSelectionOver,
  humanCodons,
  isInSelection,
  isRangeInSelection,
  packAnnotations
} from '@anocca/sequence-viewer-utils';
import { Application, extend, useApplication } from '@pixi/react';
import { createTunnel, InTunnel, OutTunnel } from '@ricsam/react-tunnel';
import {
  BitmapText,
  Container,
  Graphics,
  MeshRope,
  MeshSimple,
  Rectangle,
  RopeGeometry,
  Text
} from 'pixi.js';
import React, { useCallback, useMemo, useState } from 'react';
import {
  bindValue,
  getCircleProperties,
  getRadiusTargetForViewRange,
  increase,
  resetAngularScroll
} from './circular-helpers';
import { Codons } from './codons';
import { initialCircularCamera, minFontSize, renderAngleOffset } from './constants';
import { AgkProvider, useAgk } from './context';
import { Features } from './features';
import { Selections } from './selection';
import { Arc, Sequence } from './sequence';
import { useFontSize } from './use-font-size';
import { SearchResults } from './search-results';
import { BasePairMarkers } from './base-pair-markers';
import { Caret } from './caret';

extend({
  Container,
  Graphics,
  Text,
  MeshRope,
  MeshSimple,
  RopeGeometry,
  BitmapText
});

const INTERFACE_WIDTH = 800;
const INTERFACE_HEIGHT = 640;

type BaseSequenceType =
  | {
      type: 'dna';
      defaultLayout: 'linear' | 'circular';
      sequence: string;
      title?: string;
    }
  | {
      type: 'protein';
      sequence: string;
      title?: string;
    };

type Sequence = BaseSequenceType & {
  id: string;
};

type BridgeType = {
  props: ControllerProps & { layout: 'linear' | 'circular' };
  clickedAnnotation: string | undefined;
  setClickedAnnotation: React.Dispatch<React.SetStateAction<string | undefined>>;
  circularSelections: CircularSelection[];
  setCircularSelections: React.Dispatch<React.SetStateAction<CircularSelection[]>>;
  selectedAnnotations: string[];
  searchResults: SearchResult[];
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
};

const BridgeContext = React.createContext<undefined | BridgeType>(undefined);

const useBridge = () => {
  const ctx = React.useContext(BridgeContext);
  if (!ctx) {
    throw new Error('You must wrap your component in <BridgeProvider> to use useBridge()');
  }
  return ctx;
};

const searchComponentTunnel = createTunnel();

/**
 * Renders the sequence viewer in our pixi renderer
 * @public
 */
export function PixiRenderer(
  props: ControllerProps & {
    layout: 'linear' | 'circular';
  }
) {
  const renderLayout = props.children;
  const [interactiveElement, setInteractiveElement] = React.useState<HTMLElement | null>(null);

  const [clickedAnnotation, setClickedAnnotation] = React.useState<undefined | string>(undefined);
  const [circularSelections, setCircularSelections] = React.useState<CircularSelection[]>([]);

  const selectedAnnotations = React.useMemo(() => {
    const _annotations = new Set<string>();
    props.annotations.forEach((annotation) => {
      annotation.locations.forEach((location) => {
        circularSelections.forEach((selection) => {
          if (isRangeInSelection([location[0] - 1, location[1] - 1], selection)) {
            _annotations.add(annotation.id);
          }
        });
      });
    });
    return [..._annotations];
  }, [props.annotations, circularSelections]);
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);

  return (
    <BridgeContext.Provider
      value={{
        props,
        clickedAnnotation,
        setClickedAnnotation,
        circularSelections,
        setCircularSelections,
        selectedAnnotations,
        setSearchResults,
        searchResults
      }}
    >
      {renderLayout ? (
        renderLayout({
          buffer: null,
          canvas: (
            <Bridge interactiveElement={interactiveElement} setInteractiveElement={setInteractiveElement} />
          ),
          search: <OutTunnel tunnel={searchComponentTunnel} />,
          clickedAnnotation,
          selectedAnnotations,
          circularSelections,
          setCircularSelection(annotationId: string | undefined, cc: CircularSelection[]): void {
            setClickedAnnotation(annotationId);
            setCircularSelections(cc);
          },
          setSearchResults
        })
      ) : (
        <Bridge interactiveElement={interactiveElement} setInteractiveElement={setInteractiveElement} />
      )}
    </BridgeContext.Provider>
  );
}

function Bridge({
  interactiveElement,
  setInteractiveElement
}: {
  interactiveElement: HTMLElement | null;
  setInteractiveElement: (el: HTMLElement | null) => void;
}) {
  const { props } = useBridge();
  React.useEffect(() => {
    if (!interactiveElement) {
      return;
    }
    const wheelEvent = (ev: WheelEvent) => {
      ev.preventDefault();
    };
    interactiveElement.addEventListener('wheel', wheelEvent, { passive: false });
    return () => {
      interactiveElement.removeEventListener('wheel', wheelEvent);
    };
  }, [interactiveElement]);

  return (
    <>
      <div ref={setInteractiveElement} style={{ width: INTERFACE_WIDTH, height: INTERFACE_HEIGHT }}>
        {interactiveElement && <CanvasWrapper />}
      </div>
    </>
  );
}

function CanvasWrapper() {
  const [wrapperRef, setWrapperRef] = React.useState<HTMLDivElement | null>(null);
  const { props } = useBridge();

  return (
    <div
      ref={setWrapperRef}
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      {wrapperRef && <App wrapper={wrapperRef} />}
    </div>
  );
}

function App({ wrapper }: { wrapper: HTMLDivElement }) {
  const bridge = useBridge();
  return (
    <Application background={'white'} resizeTo={wrapper} antialias autoDensity resolution={2}>
      <Canvas {...bridge} wrapper={wrapper} />
    </Application>
  );
}

function Canvas({
  props,
  clickedAnnotation,
  setClickedAnnotation,
  circularSelections,
  setCircularSelections,
  selectedAnnotations,
  wrapper,
  setSearchResults,
  searchResults
}: BridgeType & { wrapper: HTMLDivElement }) {
  const { app } = useApplication();

  const appWidth = app.screen.width;
  const appHeight = app.screen.width;

  const rect = useMemo(() => new Rectangle(0, 0, appWidth, appHeight), [appWidth, appHeight]);

  const annotations = React.useMemo(() => props.annotations.filter((a) => !a.hidden), [props.annotations]);

  const len = props.sequence.length;

  const annotationLevels = React.useMemo(() => packAnnotations(annotations, len), [annotations, len]);

  const [circularCamera, setCircluarCamera] = React.useState<CircularCamera>(initialCircularCamera);

  const [mouse, setMouse] = React.useState({
    x: props.width / 2,
    y: 0
  });

  const circularProperties = React.useMemo(
    () =>
      getCircleProperties({
        circularCamera,
        circularSelections,
        h: props.height,
        w: props.width,
        mouse,
        sequence: props.sequence
      }),
    [circularCamera, circularSelections, mouse, props.height, props.sequence, props.width]
  );

  const circularScroll = useCallback(
    (deltaX: number, deltaY: number) => {
      setCircluarCamera((circularCamera) => {
        const zoomDelta = Math.abs(deltaX) > Math.abs(deltaY) ? 0 : -deltaY / 7500;
        const scrollDelta = Math.abs(deltaX) > Math.abs(deltaY) ? -deltaX / 1000 : 0;
        const newValue = increase(zoomDelta, circularCamera.value, circularCamera.target);

        const { radius } = circularProperties;

        const horizontalScrollSpeed = 300;

        const scrollFactor = scrollDelta * (horizontalScrollSpeed / radius);

        const newCamera = { ...circularCamera };

        if (newCamera.value.angle === 1) {
          newCamera.scrollOffsetZoomed += scrollFactor;
        } else {
          newCamera.scrollOffsetZooming += scrollFactor;
        }
        newCamera.angleOffset = (Math.PI * 2 + newCamera.angleOffset) % (2 * Math.PI);

        newCamera.value = newValue;

        return newCamera;
      });
    },
    [circularProperties]
  );

  const updateScroll = useCallback(
    (deltaX: number, deltaY: number) => {
      circularScroll(deltaX, deltaY);
    },
    [circularScroll]
  );

  const [containerRef, setContainerRef] = React.useState<Container | null>(null);

  const selecting = Boolean(circularSelections.find((s) => s.state === 'selecting'));

  const getCaretPosition = () => {
    const { hoveringCaretPosition } = circularProperties;
    return hoveringCaretPosition;
  };

  const onClick = (ev: MouseEvent) => {
    //
  };
  const onStartDrag = (ev: MouseEvent) => {
    const caretPosition = getCaretPosition();
    let cs = [...circularSelections];
    if (!ev.metaKey && !ev.shiftKey) {
      // just drag a new selection
      cs = [
        {
          state: 'selecting',
          start: caretPosition,
          end: caretPosition,
          antiClockwise: undefined
        }
      ];
    } else if (ev.metaKey) {
      // cmd clicking
      const currentSelection = getSelectionOver(caretPosition, cs);
      if (currentSelection) {
        // if you start a new selection within an exisitng selection, it should just be edited
        cs[cs.indexOf(currentSelection)] = {
          ...currentSelection,
          state: 'selecting'
        };
      } else {
        // we add a new selection
        cs.push({
          state: 'selecting',
          start: caretPosition,
          end: caretPosition,
          antiClockwise: undefined
        });
      }
    } else {
      // shift clicking
      if (!cs.length) {
        // we dont have any selections, so we start a new one
        cs = [
          {
            state: 'selecting',
            start: caretPosition,
            end: caretPosition,
            antiClockwise: undefined
          }
        ];
      } else {
        // we extend the last selection
        cs[cs.length - 1] = {
          ...cs[cs.length - 1],
          end: caretPosition
        };
      }
    }
    setClickedAnnotation(undefined);
    setCircularSelections(cs);
    setCircluarCamera(resetAngularScroll(circularProperties.angleOffset));
  };
  const onEndDrag = (ev: MouseEvent) => {
    if (selecting) {
      setClickedAnnotation(undefined);
      setCircularSelections(circularSelections.map((cs) => ({ ...cs, state: 'selected' })));
    }
  };
  const onScroll = (ev: WheelEvent) => {
    updateScroll(ev.deltaX, ev.deltaY);
  };
  const onMouseMove = (ev: MouseEvent) => {
    setMouse({ x: ev.offsetX, y: ev.offsetY });

    const caretPosition = getCaretPosition();

    if (ev.buttons === 1) {
      const _circularSelections = [...circularSelections];
      const csi = _circularSelections.findIndex((cs) => cs.state === 'selecting');
      if (csi !== -1) {
        const cs = { ...circularSelections[csi] };
        _circularSelections[csi] = cs;

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
        const toBeMerged = _circularSelections.filter(
          (c) => c !== cs && (isInSelection(c.start, cs) || isInSelection(c.end, cs))
        );
        if (toBeMerged.length > 0) {
          toBeMerged.forEach((m) => {
            _circularSelections.splice(_circularSelections.indexOf(m), 1);
          });
        }
        setClickedAnnotation(undefined);
        setCircularSelections(_circularSelections);
      }
    } else if (ev.buttons === 0) {
      onEndDrag(ev);
    }
  };
  const onDblClick = (ev: MouseEvent) => {
    //
  };

  const evsRef = React.useRef({
    onClick,
    onEndDrag,
    onMouseMove,
    onScroll,
    onStartDrag,
    onDblClick
  });
  evsRef.current = {
    onClick,
    onEndDrag,
    onMouseMove,
    onScroll,
    onStartDrag,
    onDblClick
  };

  React.useEffect(() => {
    if (!containerRef) {
      return;
    }
    const onMouseDown = (ev: MouseEvent) => {
      evsRef.current.onStartDrag(ev);
    };
    const onMouseUpOrLeave = (ev: MouseEvent) => {
      evsRef.current.onEndDrag(ev);
    };
    const onInnerClick = (ev: MouseEvent) => {
      evsRef.current.onClick(ev);
    };
    const onInnerMousedown = (ev: MouseEvent) => {
      ev.stopPropagation();
      onMouseDown(ev);
    };
    const onInnerMouseup = (ev: MouseEvent) => {
      ev.stopPropagation();
      onMouseUpOrLeave(ev);
    };
    const onInnerMouseleave = (ev: MouseEvent) => {
      onMouseUpOrLeave(ev);
    };
    const onInnerWheel = (ev: WheelEvent) => {
      evsRef.current.onScroll(ev);
      ev.preventDefault();
      ev.stopPropagation();
    };
    const onInnerMousemove = (ev: MouseEvent) => {
      evsRef.current.onMouseMove(ev);
    };
    const onDblClick = (ev: MouseEvent) => {
      evsRef.current.onDblClick(ev);
    };

    const opts = { passive: false };

    // mouse up
    containerRef.addEventListener('pointerup', onInnerMouseup, opts);
    containerRef.addEventListener('pointerleave', onInnerMouseleave, opts);

    // wheel is passive when using pixi so we listen to the DOM wrapper instead.
    wrapper.addEventListener('wheel', onInnerWheel, opts);

    containerRef.addEventListener('pointerdown', onInnerMousedown, opts);
    containerRef.addEventListener('pointerleave', onInnerMouseleave, opts);
    wrapper.addEventListener('mousemove', onInnerMousemove, opts);
    // wrapper.addEventListener('dblclick', onDblClick, opts);

    return () => {
      containerRef.removeEventListener('pointerup', onInnerMouseup);
      containerRef.removeEventListener('pointerleave', onInnerMouseleave);

      wrapper.removeEventListener('wheel', onInnerWheel);

      containerRef.removeEventListener('pointerdown', onInnerMousedown);
      containerRef.removeEventListener('pointerleave', onInnerMouseleave);
      wrapper.removeEventListener('mousemove', onInnerMousemove);

      // wrapper.removeEventListener('dblclick', onDblClick);
    };
  }, [wrapper, containerRef]);

  const zoomToSearchResult = (nextViewRange: SelectionRange, zoom: boolean) => {
    setCircluarCamera((circularCamera) => {
      const newCamera = resetAngularScroll(circularProperties.angleOffset)(circularCamera);
      newCamera.value = {
        zoom: zoom ? 1 : newCamera.value.zoom,
        angle: 1,
        radius: zoom
          ? getRadiusTargetForViewRange(props.width, props.height, len, 1, nextViewRange)
          : newCamera.value.radius
      };
      return { ...newCamera, value: bindValue(newCamera.value, newCamera.target) };
    });
  };

  const _zoomTo = (nextViewRange: SearchResult, zoom: boolean) => {
    zoomToSearchResult(nextViewRange, zoom);
    setClickedAnnotation(undefined);
    setCircularSelections([
      {
        state: 'selected',
        start: nextViewRange.complement ? nextViewRange.end - 1 : nextViewRange.start,
        end: nextViewRange.complement ? nextViewRange.start : nextViewRange.end - 1,
        antiClockwise: nextViewRange.complement
      }
    ]);
  };

  const search = props.Search && (
    <props.Search
      isProtein={props.isProtein}
      sequence={props.sequence}
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

  return (
    <container
      x={0}
      y={0}
      width={appWidth}
      height={appHeight}
      hitArea={rect}
      eventMode="dynamic"
      interactive
      ref={setContainerRef}
    >
      <InTunnel tunnel={searchComponentTunnel}>{search}</InTunnel>
      <container width={INTERFACE_WIDTH} height={INTERFACE_HEIGHT} x={0} y={0}>
        <AgkProvider
          circularProperties={circularProperties}
          w={props.width}
          h={props.height}
          circularSelections={circularSelections}
          sequence={props.sequence}
          codons={props.codons}
          circularCamera={circularCamera}
          annotationLevels={annotationLevels}
          searchResults={searchResults}
          openAnnotationDialog={props.openAnnotationDialog}
          annotations={props.annotations}
          setCircularSelections={setCircularSelections}
          setClickedAnnotation={setClickedAnnotation}
          clickedAnnotation={clickedAnnotation}
          selectedAnnotations={selectedAnnotations}
          setCircluarCamera={setCircluarCamera}
        >
          <CircularSequence />
        </AgkProvider>
      </container>
    </container>
  );
}

export function StaticSequence({
  searchResults = [],
  p = 55,
  w,
  h,
  len,
  circularSelections,
  annotationLevels,
  mouseX = 0,
  mouseY = h
}: {
  circularSelections: CircularSelection[];
  annotationLevels: Annotations[];
  len: number;
  w: number;
  h: number;
  p?: number;
  mouseX?: number;
  mouseY?: number;
  searchResults?: {
    start: number;
    end: number;
    active: boolean;
    complement: boolean;
  }[];
}) {
  const [wrapperRef, setWrapperRef] = React.useState<HTMLDivElement | null>(null);

  const circularCameraProgress = React.useMemo(() => {
    const angleProgress = Math.min(p, 50) / 50;
    const radiusProgress = Math.max(0, p - 50) / 50;
    const circularCamera = {
      zoom: 1,
      angle: angleProgress,
      radius: radiusProgress
    };
    return circularCamera;
  }, [p]);

  const circularCamera = React.useMemo(
    (): CircularCamera => ({
      angleOffset: 0,
      scrollOffsetZoomed: 0,
      scrollOffsetZooming: 0,
      value: circularCameraProgress,
      target: {
        zoom: 1,
        angle: 1,
        radius: 1
      }
    }),
    [circularCameraProgress]
  );

  const sequence =
    'TCCTCGCATAGGGCGGATCGGTATTCATGGGACGCCACACAACTCTTAGATTGATTGTCGCTTTCAGGCGTGTCATCCTGCGCCCCGGCACGAGCTCGTCCGGCGGTATAGTCGTATGTGCTTATACACATCAAAGCTAACAAATCTTTCTGCGGGCGGTCGTCACGACACACGTTCTTACG'.slice(
      0,
      len
    );

  const circularProperties = React.useMemo(
    () =>
      getCircleProperties({
        circularSelections,
        h,
        w,
        mouse: { x: mouseX, y: mouseY },
        sequence,
        circularCamera
      }),
    [circularCamera, circularSelections, h, mouseX, mouseY, sequence, w]
  );

  return (
    <div
      ref={setWrapperRef}
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      {wrapperRef && (
        <Application background={'white'} resizeTo={wrapperRef} antialias autoDensity resolution={2}>
          <container width={INTERFACE_WIDTH} height={INTERFACE_HEIGHT} x={0} y={0}>
            <AgkProvider
              circularProperties={circularProperties}
              w={w}
              h={h}
              circularSelections={circularSelections}
              sequence={sequence}
              codons={humanCodons}
              circularCamera={circularCamera}
              annotationLevels={annotationLevels}
              searchResults={searchResults}
              openAnnotationDialog={() => {
                //
              }}
              annotations={annotationLevels.flat()}
              setCircularSelections={() => {
                //
              }}
              setClickedAnnotation={() => {
                //
              }}
              clickedAnnotation={undefined}
              selectedAnnotations={[]}
              setCircluarCamera={() => {
                //
              }}
            >
              <CircularSequence />
            </AgkProvider>
          </container>
        </Application>
      )}
    </div>
  );
}

function CircularSequence() {
  const { circularProperties, circularSelections: circularSelection } = useAgk();
  const { radius, len, hoveringCaretPosition, circleY, iLen } = circularProperties;

  return (
    <>
      <Codons />
      <Sequence />
      <Features />
      <SearchResults />
      <Selections />
      <BasePairMarkers />
      <Caret />
    </>
  );
}
