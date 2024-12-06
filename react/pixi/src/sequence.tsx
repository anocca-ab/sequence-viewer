import { getNtColor, getNtComplement, getSelectionOver, tuple } from '@anocca/sequence-viewer-utils';
import type { Graphics } from 'pixi.js';
import React, { useCallback } from 'react';
import { CircularText } from './circular-text';
import { minFontSize } from './constants';
import { useAgk } from './context';
import { useArrowHeight } from './selection';
import { useBaseAngle } from './use-base-angle';
import { useFontSize } from './use-font-size';
import { useGetCoordinates } from './use-get-coordinates';

export const Sequence = React.memo(function Sequence() {
  const components: JSX.Element[] = [];

  const { w, circularSelections: circularSelection, sequence, circularProperties } = useAgk();

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY } = circularProperties;

  const inScreen = Math.floor(w / minFontSize);

  const factor = Math.ceil(inScreen / len);

  if ((2 * radius * Math.PI) / len > minFontSize) {
    // when zoomed in
    const start = hoveringCaretPosition - inScreen;
    const end = hoveringCaretPosition + inScreen;

    for (let i = start; i < end; i += 1) {
      const index = (i + len * factor) % len;
      const selection = getSelectionOver(index, circularSelection);
      components.push(<Arc key={`arc-zoomed-in-${i}`} complement={selection?.antiClockwise === true} i={index} />);
    }
  } else {
    // when zoomed out
    for (let i = 0; i < len; i += 1) {
      const selection = getSelectionOver(i, circularSelection);
      components.push(<Arc key={`arc-zoomed-out-${i}`} complement={selection?.antiClockwise === true} i={i} />);
    }
  }

  return <>{components}</>;
});

export const Arc = React.memo(function Sequence({ i, complement }: { i: number; complement?: boolean }) {
  const components: JSX.Element[] = [];

  const { circularProperties } = useAgk();

  const { radius } = circularProperties;

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

  return <graphics draw={draw} />;
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
  const { sequence, circularProperties } = useAgk();

  const getBaseAngle = useBaseAngle();

  const nt = _base || sequence[i];
  const { aMid } = getBaseAngle(i);
  const base = !complement ? nt : getNtComplement(nt);
  const color = getNtColor(base);
  const [fontSize, constrainedFontSize] = useFontSize();
  const getCoordinates = useGetCoordinates();
  const { a0, a1 } = getBaseAngle(i);
  const { len, hoveringCaretPosition, angleDelta, angleOffset, circleY, iLen } = circularProperties;

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
        textBaseline: 'bottom',
        align: 'center'
      }}
      text={base}
      radius={_radius}
      angle={aMid}
    />
  );
});
