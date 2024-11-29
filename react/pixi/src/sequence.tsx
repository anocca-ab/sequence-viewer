import {
  getNtColor,
  getNtComplement,
  getSelectionOver,
  tuple,
  type CircularSelection
} from '@anocca/sequence-viewer-utils';
import React, { useCallback } from 'react';
// import { DrawCallback } from "@pixi/react/src/typedefs/DrawCallback";
import type { TextStyleOptions, Container, Graphics } from 'pixi.js';
import { CanvasTextMetrics, TextStyle } from 'pixi.js';
import { minFontSize, renderAngleOffset } from './constants';
import { useRenderData } from './context';
import { useGetCoordinates } from './use-get-coordinates';
import { useFontSize } from './use-font-size';
import { useBaseAngle } from './use-base-angle';
import { CircularText } from './circular-text';

export const Sequence = React.memo(function Sequence() {
  const components: JSX.Element[] = [];

  const { updateProps, circularProps } = useRenderData();

  const { w, circularSelection, sequence } = updateProps;
  const data = updateProps.data;

  const { zoom: zoomProgress, radius: radiusProgress } = data.circluarCamera.value;

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY } = circularProps;

  const inScreen = Math.floor(w / minFontSize);

  const factor = Math.ceil(inScreen / len);

  if ((2 * radius * Math.PI) / len > minFontSize) {
    // when zoomed out
    const start = hoveringCaretPosition - inScreen;
    const end = hoveringCaretPosition + inScreen;

    for (let i = start; i < end; i += 1) {
      const index = (i + len * factor) % len;
      const selection = getSelectionOver(index, circularSelection);
      // drawArc(index, selection?.antiClockwise === true);
      components.push(<Arc key={`arc-${index}`} complement={selection?.antiClockwise === true} i={index} />);
    }
  } else {
    // when zoomed in
    for (let i = 0; i < len; i += 1) {
      const selection = getSelectionOver(i, circularSelection);
      // drawArc(i, selection?.antiClockwise === true);
      components.push(<Arc key={`arc-${i}`} complement={selection?.antiClockwise === true} i={i} />);
    }
  }

  return <>{components}</>;
});

export const Arc = React.memo(function Sequence({ i, complement }: { i: number; complement?: boolean }) {
  const components: JSX.Element[] = [];

  const { updateProps, circularProps } = useRenderData();

  const { w, circularSelection, sequence } = updateProps;
  const data = updateProps.data;

  const { zoom: zoomProgress, radius: radiusProgress } = data.circluarCamera.value;

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY } = circularProps;

  const inScreen = Math.floor(w / minFontSize);

  const factor = Math.ceil(inScreen / len);

  const xStart = w / 2;

  const getCoordinates = useGetCoordinates();

  const getBaseAngle = useBaseAngle();

  const [fontSize, constrainedFontSize] = useFontSize();

  const { a0, a1, aMid } = getBaseAngle(i);

  const selection = getSelectionOver(i, circularSelection);
  if (selection) {
    components.push(
      <SelectionLine key={`selection-line-${i}`} selection={selection} complement={complement} i={i} />
    );
  }

  let interval = Math.floor(len / 4);
  if (zoomProgress > 0.25) {
    interval = Math.floor(len / 8);
  }
  if (radiusProgress > 0) {
    interval = Math.floor(len / 16);
  }
  const mod = i % interval;
  if (mod === 0 && (i + interval / 2) % len >= interval / 2) {
    components.push(<BasePairMarker key={`base-pair-marker-${i}`} aMid={aMid} i={i} />);
  }

  components.push(<Base key={`base-${i}`} i={i} radius={radius} complement={false} />);
  if (complement) {
    components.push(<Base key={`base-complement-${i}`} i={i} radius={radius} complement={true} />);
  }

  return <>{components}</>;
});

const SquareBase = React.memo(function SquareBase({
  x1,
  y1,
  x2,
  y2,
  x3,
  y3,
  x4,
  y4,
  color
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
  x4: number;
  y4: number;
  color: string;
}) {
  const draw = useCallback(
    (g: Graphics) => {
      g.clear();
      g.setStrokeStyle({
        color: 'black',
        width: 1
      });
      g.beginPath();
      g.moveTo(x1, y1);
      g.lineTo(x2, y2);
      g.lineTo(x3, y3);
      g.lineTo(x4, y4);
      g.fill(color);
      g.closePath();
    },
    [color, x1, x2, x3, x4, y1, y2, y3, y4]
  );
  const [container, setContainer] = React.useState<Container | null>(null);

  return <graphics draw={draw} ref={setContainer} />;
});

export const Base = React.memo(function Base({
  i,
  radius,
  complement,
  base: _base
}: {
  i: number;
  radius: number;
  complement?: boolean;
  base?: string;
}) {
  const { sequence } = useRenderData().updateProps;

  const getBaseAngle = useBaseAngle();

  const nt = _base || sequence[i];
  const { aMid } = getBaseAngle(i);
  const base = !complement ? nt : getNtComplement(nt);
  const color = getNtColor(base);
  const [fontSize, constrainedFontSize] = useFontSize();
  const getCoordinates = useGetCoordinates();
  const { a0, a1 } = getBaseAngle(i);

  let _radius = radius;

  if (complement) {
    _radius -= constrainedFontSize;
  }

  if (fontSize < minFontSize) {
    if (complement) {
      _radius -= 1;
    }

    const [x1, y1] = getCoordinates(_radius + minFontSize, a0);
    const [x2, y2] = getCoordinates(_radius + minFontSize, a1);
    const [x3, y3] = getCoordinates(_radius, a1);
    const [x4, y4] = getCoordinates(_radius, a0);

    return (
      <SquareBase
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        x3={x3}
        y3={y3}
        x4={x4}
        y4={y4}
        color={getNtColor(complement ? getNtComplement(sequence[i]) : sequence[i])}
      />
    );
  }

  return (
    <CircularText
      fontSize={fontSize}
      style={{
        fill: color,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        textBaseline: 'bottom'
      }}
      text={base}
      radius={_radius}
      angle={aMid}
    />
  );
});

export const useArrowHeight = () => {
  const [fontSize, constrainedFontSize] = useFontSize();

  const { updateProps, circularProps } = useRenderData();

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY } = circularProps;

  /* black line of selection under the letter in the circle */
  const arrowHeight = Math.max(constrainedFontSize * 0.5, 8);
  return arrowHeight;
};

const SelectionLine = React.memo(function SelectionLine({
  selection,
  complement,
  i
}: {
  selection: CircularSelection;
  i: number;
  complement?: boolean;
}) {
  const arrowHeight = useArrowHeight();
  const [fontSize, constrainedFontSize] = useFontSize();

  const { updateProps, circularProps } = useRenderData();

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY } = circularProps;

  /* black line of selection under the letter in the circle */

  let arrowRadius = radius;
  if (complement) {
    arrowRadius = radius + constrainedFontSize + arrowHeight / 2;
  } else {
    arrowRadius = radius - arrowHeight / 2;
  }

  const getCoordinates = useGetCoordinates();

  const { w, circularSelection, sequence } = updateProps;

  const xStart = w / 2;

  const getBaseAngle = useBaseAngle();

  const { a0, a1, aMid } = getBaseAngle(i);

  return (
    <graphics
      draw={(g) => {
        g.clear();
        g.setStrokeStyle({
          color: 'red',
          width: Math.max(arrowHeight * 0.1, 2)
        });
        g.beginPath();
        g.arc(xStart, circleY, arrowRadius, a0 + renderAngleOffset, a1 + renderAngleOffset, false);
        g.stroke();
        g.closePath();
        if (i === selection.end && selection.antiClockwise !== undefined) {
          // Draw the triangle at the end of the arrow
          g.beginPath();
          if (selection.antiClockwise) {
            const [x1, y1] = getCoordinates(arrowRadius - arrowHeight / 2, a0);
            const [x2, y2] = getCoordinates(arrowRadius, a0 - arrowHeight / (2 * radius));
            const [x3, y3] = getCoordinates(arrowRadius + arrowHeight / 2, a0);

            g.moveTo(x1, y1); /* top */
            g.lineTo(x2, y2); /* point */
            g.lineTo(x3, y3); /* bottom */
          }
          if (!selection.antiClockwise) {
            const [x1, y1] = getCoordinates(arrowRadius - arrowHeight / 2, a1);
            const [x2, y2] = getCoordinates(arrowRadius, a1 + arrowHeight / (2 * radius));
            const [x3, y3] = getCoordinates(arrowRadius + arrowHeight / 2, a1);

            g.moveTo(x1, y1); /* top */
            g.lineTo(x2, y2); /* point */
            g.lineTo(x3, y3); /* bottom */
          }
          g.closePath();
          g.fillStyle = 'black';
          g.fill();
        }
      }}
    />
  );
});

export const useBasePairMarkerRadius = () => {
  const { updateProps, circularProps } = useRenderData();

  const { w, circularSelection, sequence } = updateProps;
  const data = updateProps.data;

  const { zoom: zoomProgress, radius: radiusProgress } = data.circluarCamera.value;

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY } = circularProps;

  const [fontSize] = useFontSize();
  const components: JSX.Element[] = [];
  const getCoordinates = useGetCoordinates();
  const getVerticalLine = (radius1: number, radius2: number, angle: number) => {
    const [x1, y1] = getCoordinates(radius1, angle);
    const [x2, y2] = getCoordinates(radius2, angle);
    return tuple(x1, y1, x2, y2);
  };
  const arrowHeight = useArrowHeight();
  const lineOuterRadius = radius + fontSize + 2 + (fontSize < minFontSize ? 0 : fontSize) + arrowHeight;
  return {
    lineInnerRadius: radius + fontSize + arrowHeight / 2,
    lineOuterRadius,
    outerRadius: lineOuterRadius + 16
  };
};

/* draw base pair indicator, like 1, 1500, 3000, 4500 in a 6000 bp sequence */
const BasePairMarker = React.memo(function BasePairMarker({ aMid, i }: { aMid: number; i: number }) {
  const { updateProps, circularProps } = useRenderData();

  const { w, circularSelection, sequence } = updateProps;
  const data = updateProps.data;

  const { zoom: zoomProgress, radius: radiusProgress } = data.circluarCamera.value;

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY } = circularProps;

  const [fontSize] = useFontSize();
  const components: JSX.Element[] = [];
  const getCoordinates = useGetCoordinates();
  const getVerticalLine = (radius1: number, radius2: number, angle: number) => {
    const [x1, y1] = getCoordinates(radius1, angle);
    const [x2, y2] = getCoordinates(radius2, angle);
    return tuple(x1, y1, x2, y2);
  };
  const arrowHeight = useArrowHeight();
  const { lineInnerRadius, lineOuterRadius, outerRadius } = useBasePairMarkerRadius();
  const topCaret = getVerticalLine(lineInnerRadius, lineOuterRadius, aMid);
  components.push(
    <graphics
      key={`base-pair-marker-line-${i}`}
      draw={(g) => {
        g.clear();
        g.setStrokeStyle({
          width: 1,
          color: 'black'
        });
        g.beginPath();
        g.moveTo(topCaret[0], topCaret[1]);
        g.lineTo(topCaret[2], topCaret[3]);
        g.closePath();
        g.stroke();
      }}
    />
  );

  components.push(
    <CircularText
      key={`base-pair-marker-num-${i}`}
      fontSize={16}
      style={{
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
        textBaseline: 'bottom'
      }}
      text={String(i + 1)}
      radius={lineOuterRadius}
      angle={aMid}
    />
  );
  return <>{components}</>;
});
