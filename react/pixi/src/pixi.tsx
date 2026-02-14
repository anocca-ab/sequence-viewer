import { type ControllerProps } from '@anocca/sequence-viewer-react-shared';
import type { CircularSelection, SearchResult } from '@anocca/sequence-viewer-utils';
import { isRangeInSelection } from '@anocca/sequence-viewer-utils';
import { Application, extend } from '@pixi/react';
import { OutTunnel } from '@ricsam/react-tunnel';
import { BitmapText, Container, Graphics, MeshRope, MeshSimple, RopeGeometry, Text } from 'pixi.js';
import React from 'react';
import { CircularCanvas } from './circular';
import { INTERFACE_HEIGHT, INTERFACE_WIDTH } from './constants';
import { searchComponentTunnel } from './tunnels';
import type { BridgeType } from './types';
import { LinearCanvas } from './linear';

extend({
  Container,
  Graphics,
  Text,
  MeshRope,
  MeshSimple,
  RopeGeometry,
  BitmapText
});

const BridgeContext = React.createContext<undefined | BridgeType>(undefined);

const useBridge = () => {
  const ctx = React.useContext(BridgeContext);
  if (!ctx) {
    throw new Error('You must wrap your component in <BridgeProvider> to use useBridge()');
  }
  return ctx;
};

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
      {bridge.props.layout === 'circular' ? (
        <CircularCanvas {...bridge} wrapper={wrapper} />
      ) : (
        <LinearCanvas {...bridge} wrapper={wrapper} />
      )}
    </Application>
  );
}
