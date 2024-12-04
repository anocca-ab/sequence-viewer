import { useDOMListeners, type ControllerProps } from '@anocca/sequence-viewer-react-shared';
import type {
  CircularCamera,
  CircularSelection,
  SearchResult,
  SelectionRange
} from '@anocca/sequence-viewer-utils';
import {
  getSelectionDeltaAngle,
  getSelectionOver,
  isInSelection,
  isRangeInSelection,
  packAnnotations
} from '@anocca/sequence-viewer-utils';
import { Application, extend, useApplication } from '@pixi/react';
import React, { useCallback, useMemo, useState } from 'react';
import { createTunnel, InTunnel, OutTunnel } from '@ricsam/react-tunnel';
import { Container, Graphics, MeshRope, MeshSimple, Rectangle, RopeGeometry, Text } from 'pixi.js';
import {
  bindValue,
  getCircleProperties,
  getRadiusTargetForViewRange,
  increase,
  resetAngularScroll
} from './circular-helpers';
import { Codons } from './codons';
import { initialCircularCamera } from './constants';
import { AgkProvider, useAgk } from './context';
import { Features } from './features';
import { SelectionText } from './selection-text';
import { Sequence } from './sequence';

extend({
  Container,
  Graphics,
  Text,
  MeshRope,
  MeshSimple,
  RopeGeometry
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
  setClickedAnnotation: (annotationId: string | undefined) => void;
  circularSelections: CircularSelection[];
  setCircularSelections: (cc: CircularSelection[]) => void;
  selectedAnnotations: string[];
  searchResults: SearchResult[];
  setSearchResults: (results: SearchResult[]) => void;
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
  setSearchResults
}: BridgeType & { wrapper: HTMLDivElement }) {
  const [rotation, setRotation] = useState(0);
  const [scale, setZoom] = useState(1);

  const { app } = useApplication();

  const appWidth = app.screen.width;
  const appHeight = app.screen.width;

  const rect = useMemo(() => new Rectangle(0, 0, appWidth, appHeight), [appWidth, appHeight]);

  // const tick = useCallback(() => {
  //   const props = updatePropsRef.current;
  //   if (!props) {
  //     return;
  //   }
  //     return isEqual(currentProps, props) ? currentProps : structuredClone(props);
  //   });
  // }, []);

  // useTick(tick);

  const pivot = React.useMemo(() => ({ x: INTERFACE_WIDTH / 2, y: INTERFACE_HEIGHT / 2 }), []);

  const annotations = React.useMemo(() => props.annotations.filter((a) => !a.hidden), [props.annotations]);
  const [circularSelection, setCircularSelection] = React.useState<CircularSelection[]>([
    {
      state: 'selected',
      start: 0,
      end: 0,
      antiClockwise: undefined
    }
  ]);
  const [clickedAnnotations, setClickedAnnotations] = React.useState<string[]>([]);
  const [hoveredAnonotation, setHoveredAnnotation] = React.useState<string | undefined>(undefined);

  const len = props.sequence.length;

  const annotationLevels = React.useMemo(() => packAnnotations(annotations, len), [annotations, len]);

  const [circluarCamera, setCircluarCamera] = React.useState<CircularCamera>(initialCircularCamera);

  const [mouse, setMouse] = React.useState({
    x: props.width / 2,
    y: 0
  });

  const [staticCircularProperties] = React.useState(
    getCircleProperties({
      circluarCamera,
      circularSelection,
      h: props.height,
      w: props.width,
      mouse,
      sequence: props.sequence
    })
  );

  const circularProperties = React.useMemo(
    () =>
      getCircleProperties({
        circluarCamera,
        circularSelection,
        h: props.height,
        w: props.width,
        mouse,
        sequence: props.sequence
      }),
    [circluarCamera, circularSelection, mouse, props.height, props.sequence, props.width]
  );

  const circularScroll = useCallback(
    (deltaX: number, deltaY: number) => {
      setCircluarCamera((circluarCamera) => {
        const zoomDelta = Math.abs(deltaX) > Math.abs(deltaY) ? 0 : -deltaY / 7500;
        const scrollDelta = Math.abs(deltaX) > Math.abs(deltaY) ? -deltaX / 1000 : 0;
        const newValue = increase(zoomDelta, circluarCamera.value, circluarCamera.target);

        const { radius } = circularProperties;

        const horizontalScrollSpeed = 300;

        const scrollFactor = scrollDelta * (horizontalScrollSpeed / radius);

        const newCamera = { ...circluarCamera };

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

  const selecting = Boolean(circularSelection.find((s) => s.state === 'selecting'));

  const getCaretPosition = () => {
    const { hoveringCaretPosition } = circularProperties;
    return hoveringCaretPosition;
  };

  const onClick = (ev: MouseEvent) => {
    //
  };
  const onStartDrag = (ev: MouseEvent) => {
    const caretPosition = getCaretPosition();
    let cs = [...circularSelection];
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
    setCircularSelection(cs);
    setCircluarCamera(resetAngularScroll(circularProperties.angleOffset));
  };
  const onEndDrag = (ev: MouseEvent) => {
    if (selecting) {
      setClickedAnnotation(undefined);
      setCircularSelection(circularSelection.map((cs) => ({ ...cs, state: 'selected' })));
    }
  };
  const onScroll = (ev: WheelEvent) => {
    updateScroll(ev.deltaX, ev.deltaY);
  };
  const onMouseMove = (ev: MouseEvent) => {
    setMouse({ x: ev.offsetX, y: ev.offsetY });

    const caretPosition = getCaretPosition();

    if (ev.buttons === 1) {
      const _circularSelection = [...circularSelection];
      const csi = _circularSelection.findIndex((cs) => cs.state === 'selecting');
      if (csi !== -1) {
        const cs = { ...circularSelection[csi] };
        _circularSelection[csi] = cs;

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
        setClickedAnnotation(undefined);
        setCircularSelection(_circularSelection);
      }
    }
  };
  const onDblClick = (ev: MouseEvent) => {
    //
  };

  useDOMListeners(wrapper, onClick, onStartDrag, onEndDrag, onScroll, onMouseMove, onDblClick);

  const zoomToSearchResult = (nextViewRange: SelectionRange, zoom: boolean) => {
    setCircluarCamera((circluarCamera) => {
      const newCamera = resetAngularScroll(circularProperties.angleOffset)(circluarCamera);
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
    setCircularSelection([
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
      <InTunnel tunnel={searchComponentTunnel}>
        <Component />
        {search}
      </InTunnel>
      <container
        rotation={rotation}
        scale={scale}
        width={INTERFACE_WIDTH}
        height={INTERFACE_HEIGHT}
        x={0}
        y={0}
      >
        <AgkProvider
          circularProperties={circularProperties}
          w={props.width}
          h={props.height}
          circularSelection={circularSelection}
          sequence={props.sequence}
          codons={props.codons}
          circluarCamera={circluarCamera}
          annotationLevels={annotationLevels}
        >
          <CircularSequence />
        </AgkProvider>
      </container>
    </container>
  );
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const c: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d')!;

function CircularSequence() {
  const { circularProperties, circularSelection } = useAgk();
  const { radius, len, hoveringCaretPosition, circleY, iLen } = circularProperties;

  return (
    <>
      <Codons />
      <Sequence />
      <SelectionText />
      <Features />
    </>
  );
}
