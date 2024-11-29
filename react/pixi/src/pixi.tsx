import { CircularController } from '@anocca/sequence-viewer-react-circular';
import { LinearController } from '@anocca/sequence-viewer-react-linear';
import type { ControllerProps, RenderProps } from '@anocca/sequence-viewer-react-shared';
import {
  getAaColor,
  getFont,
  getIndexMid,
  getNtColor,
  getNtComplement,
  getSelectionLabel,
  getSelectionOver,
  isSelectionOverOrigin,
  shouldInvertColor,
  tuple,
  type CircularSelection,
  type UpdateProps
} from '@anocca/sequence-viewer-utils';
import { Application, extend, useApplication, useTick } from '@pixi/react';
import isEqual from 'lodash.isequal';
import React, { useCallback, useMemo, useState } from 'react';
// import { DrawCallback } from "@pixi/react/src/typedefs/DrawCallback";
import type { CircularProperties } from '@anocca/sequence-viewer-render-circular';
import { getCircleProperties } from '@anocca/sequence-viewer-render-circular';
import type { TextStyleOptions } from 'pixi.js';
import {
  AlphaFilter,
  CanvasTextMetrics,
  Container,
  Graphics,
  MeshRope,
  MeshSimple,
  Point,
  Rectangle,
  RopeGeometry,
  Text,
  TextStyle
} from 'pixi.js';
import { useGetCoordinates } from './use-get-coordinates';
import { Sequence, useArrowHeight } from './sequence';
import { RenderDataContext, useRenderData } from './context';
import { minFontSize, renderAngleOffset } from './constants';
import { useFontSize } from './use-font-size';
import { useBaseAngle } from './use-base-angle';
import { CircularText } from './circular-text';
import { Codons } from './codons';
import { SelectionText } from './selection-text';
// import { Viewport, Wheel } from "pixi-viewport";

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

type AgkContextType = {
  updatePropsRef: React.MutableRefObject<UpdateProps | undefined>;
};

const AgkContext = React.createContext<undefined | AgkContextType>(undefined);

const AgkProvider = ({
  children,
  ...props
}: {
  updatePropsRef: React.MutableRefObject<UpdateProps | undefined>;
  children?: React.ReactNode;
}) => {
  return <AgkContext.Provider value={props}>{children}</AgkContext.Provider>;
};

const useAgk = () => {
  const ctx = React.useContext(AgkContext);
  if (!ctx) {
    throw new Error('You must wrap your component in <AgkProvider> to use useAgk()');
  }
  return ctx;
};

type Sequence = BaseSequenceType & {
  id: string;
};

type AppState = {
  sequences: Sequence[];
  rotation: number;
  updateRotation: (rotation: number) => void;
  updateSequence: (id: string, update: (sequence: Sequence) => Sequence) => void;
};

const AppStateContext = React.createContext<undefined | AppState>(undefined);

const BridgeContext = React.createContext<
  | undefined
  | {
      props: ControllerProps & { layout: 'linear' | 'circular' };
      renderProps: RenderProps;
      updatePropsRef: React.MutableRefObject<UpdateProps | undefined>;
    }
>(undefined);

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
  const Component = props.layout === 'circular' ? CircularController : LinearController;
  const [interactiveElement, setInteractiveElement] = React.useState<HTMLElement | null>(null);
  const updatePropsRef = React.useRef<UpdateProps | undefined>();

  return (
    <Component
      {...props}
      onUpdate={(update) => {
        updatePropsRef.current = update;
      }}
      interactiveElement={interactiveElement ?? undefined}
    >
      {(renderProps) => {
        return (
          <BridgeContext.Provider value={{ props, renderProps, updatePropsRef }}>
            {renderLayout ? (
              renderLayout({
                ...renderProps,
                canvas: (
                  <Bridge
                    interactiveElement={interactiveElement}
                    setInteractiveElement={setInteractiveElement}
                  />
                )
              })
            ) : renderProps.search ? (
              <div>
                <div>{renderProps.search}</div>
                <div>
                  <Bridge
                    interactiveElement={interactiveElement}
                    setInteractiveElement={setInteractiveElement}
                  />
                </div>
              </div>
            ) : (
              <Bridge interactiveElement={interactiveElement} setInteractiveElement={setInteractiveElement} />
            )}
          </BridgeContext.Provider>
        );
      }}
    </Component>
  );
}

function Bridge({
  interactiveElement,
  setInteractiveElement
}: {
  interactiveElement: HTMLElement | null;
  setInteractiveElement: (el: HTMLElement | null) => void;
}) {
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
      {wrapperRef && (
        <App
          wrapper={wrapperRef}
          sequences={[
            props.isProtein
              ? { type: 'protein', sequence: props.sequence }
              : { type: 'dna', sequence: props.sequence, defaultLayout: 'circular' }
          ]}
        />
      )}
    </div>
  );
}

function App({ wrapper, sequences }: { wrapper: HTMLDivElement; sequences: BaseSequenceType[] }) {
  const { props, updatePropsRef } = useBridge();
  return (
    <Application background={'white'} resizeTo={wrapper} antialias autoDensity resolution={2}>
      <AgkProvider updatePropsRef={updatePropsRef}>
        <Canvas />
      </AgkProvider>
    </Application>
  );
}

function Canvas() {
  const [rotation, setRotation] = useState(0);
  const [scale, setZoom] = useState(1);

  const { app } = useApplication();

  const appWidth = app.screen.width;
  const appHeight = app.screen.width;

  const rect = useMemo(() => new Rectangle(0, 0, appWidth, appHeight), [appWidth, appHeight]);

  const { updatePropsRef } = useAgk();

  const [updateProps, setUpdateProps] = useState<UpdateProps | undefined>(undefined);

  const tick = useCallback(() => {
    const props = updatePropsRef.current;
    if (!props) {
      return;
    }
    setUpdateProps((currentProps) => {
      return isEqual(currentProps, props) ? currentProps : structuredClone(props);
    });
  }, [updatePropsRef]);

  useTick(tick);

  const pivot = React.useMemo(() => ({ x: INTERFACE_WIDTH / 2, y: INTERFACE_HEIGHT / 2 }), []);

  const circularProperties = React.useMemo(
    () => (updateProps ? getCircleProperties(updateProps) : undefined),
    [updateProps]
  );
  const renderData = React.useMemo(() => {
    if (!circularProperties || !updateProps) {
      return;
    }
    return { updateProps, circularProps: circularProperties };
  }, [circularProperties, updateProps]);

  if (!renderData) {
    return null;
  }

  return (
    <container x={0} y={0} width={appWidth} height={appHeight} hitArea={rect} eventMode="dynamic" interactive>
      <container
        rotation={rotation}
        scale={scale}
        width={INTERFACE_WIDTH}
        height={INTERFACE_HEIGHT}
        pivot={pivot}
        x={appWidth / 2}
        y={appHeight / 2}
      >
        <RenderDataContext.Provider value={renderData}>
          <CircularSequence />
        </RenderDataContext.Provider>
      </container>
    </container>
  );
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const c: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d')!;

function CircularSequence() {
  return (
    <>
      <Codons />
      <Sequence />
      <SelectionText />
    </>
  );
}
