import { getNtColor, getNtComplement, getSelectionOver, tuple } from '@anocca/sequence-viewer-utils';
import type { Graphics } from 'pixi.js';
import React, { useCallback } from 'react';
import { CircularText } from './circular-text';
import { initialCircularCamera, minFontSize } from './constants';
import { useAgk } from './context';
import { useArrowHeight } from './selection';
import { useBaseAngle } from './use-base-angle';
import { useFontSize } from './use-font-size';
import { useGetCoordinates } from './use-get-coordinates';
import { SquareBase } from './square-base';
import { getCircleProperties } from './circular-helpers';

export const Sequence = React.memo(function Sequence() {
  const components: JSX.Element[] = [];

  const { w, circularSelections: circularSelection, sequence, circularProperties } = useAgk();

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY } = circularProperties;

  /**
   * How many bases can be displayed on the screen
   */
  const inScreen = Math.floor(w / minFontSize);

  if ((2 * radius * Math.PI) / len > minFontSize) {
    // when zoomed in
    const start = hoveringCaretPosition - inScreen;
    const end = hoveringCaretPosition + inScreen;
    return <AllBases start={start} end={end} />;
  }

  return <AllBases start={0} end={len} />;
});

const AllBases = React.memo(function AllBases({ start, end }: { start: number; end: number }) {
  const [fontSize, constrainedFontSize] = useFontSize();
  const { w, h, circularSelections: circularSelection, sequence, circularProperties } = useAgk();

  const { radius, angleDelta, angleOffset } = circularProperties;

  const initialCircularProps = React.useMemo(() => {
    return getCircleProperties({
      w,
      h,
      circularSelections: [],
      sequence,
      circularCamera: initialCircularCamera,
      mouse: { x: 0, y: 0 }
    });
  }, [h, sequence, w]);

  const rotation = angleOffset;

  if (fontSize < minFontSize) {
    const scale = radius / initialCircularProps.radius;
    return (
      <container
        rotation={rotation}
        pivot={{ x: w / 2, y: h / 2 }}
        width={w}
        height={h}
        x={w / 2}
        y={circularProperties.circleY}
        scale={scale}
      >
        <SquareBaseCircle
          start={start}
          end={end}
          rotation={0}
          radius={initialCircularProps.radius}
          circleY={initialCircularProps.circleY}
        />
      </container>
    );
  }
  return <TextBaseCircle start={start} end={end} />;
});

const useRenderAllBases = (
  start: number,
  end: number,
  inRadius: number,
  callback: (index: number, outRadius: number, complement: boolean) => JSX.Element
) => {
  const components: JSX.Element[] = [];

  const { w, circularSelections: circularSelection, sequence, circularProperties } = useAgk();

  const { len, hoveringCaretPosition, angleDelta, angleOffset, circleY } = circularProperties;

  const [fontSize, constrainedFontSize] = useFontSize();

  for (let i = start; i < end; i += 1) {
    const index = (i + len) % len;
    const selection = getSelectionOver(index, circularSelection);

    const complement = selection?.antiClockwise === true;

    components.push(callback(index, inRadius, false));
    if (complement) {
      components.push(callback(index, inRadius - constrainedFontSize - 1, true));
    }
  }

  return <>{components}</>;
};

const SquareBaseCircle = React.memo(function AllBases({
  start,
  end,
  rotation,
  radius,
  circleY
}: {
  start: number;
  end: number;
  rotation: number;
  radius: number;
  circleY: number;
}) {
  return useRenderAllBases(start, end, radius, (index, radius, complement) => {
    return (
      <SquareBase
        key={`base-${index}-${complement ? 'complement' : 'normal'}`}
        i={index}
        radius={radius}
        complement={complement}
        rotation={rotation}
        circleY={circleY}
      />
    );
  });
});

const TextBaseCircle = React.memo(function AllBases({ start, end }: { start: number; end: number }) {
  const { w, circularSelections: circularSelection, sequence, circularProperties } = useAgk();

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY } = circularProperties;

  return useRenderAllBases(start, end, radius, (index, outRadius, complement) => {
    return (
      <TextBase
        key={`base-${index}-${complement ? 'complement' : 'normal'}`}
        i={index}
        radius={outRadius}
        complement={complement}
      />
    );
  });
});

export const Arc = React.memo(function Sequence({ i, complement }: { i: number; complement?: boolean }) {
  const components: JSX.Element[] = [];

  const { circularProperties } = useAgk();

  const { radius, angleDelta, angleOffset, circleY } = circularProperties;
  const [fontSize, constrainedFontSize] = useFontSize();

  const rotation = angleOffset;

  if (fontSize < minFontSize) {
    components.push(
      <SquareBase
        rotation={rotation}
        key={`base-${i}`}
        i={i}
        radius={radius}
        complement={false}
        circleY={circleY}
      />
    );
    if (complement) {
      components.push(
        <SquareBase
          rotation={rotation}
          key={`base-complement-${i}`}
          i={i}
          radius={radius - constrainedFontSize - 1}
          complement={true}
          circleY={circleY}
        />
      );
    }
  } else {
    components.push(<TextBase key={`base-${i}`} i={i} radius={radius} complement={false} />);
    if (complement) {
      components.push(
        <TextBase
          key={`base-complement-${i}`}
          i={i}
          radius={radius - constrainedFontSize}
          complement={true}
        />
      );
    }
  }

  return <>{components}</>;
});

export const TextBase = React.memo(function Base({
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
  const { sequence } = useAgk();

  const getBaseAngle = useBaseAngle();

  const nt = _base || sequence[i];
  const { aMid } = getBaseAngle(i);
  const base = !complement ? nt : getNtComplement(nt);
  const color = getNtColor(base);
  const [fontSize] = useFontSize();

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
      radius={radius}
      angle={aMid}
    />
  );
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

  const rotation = angleOffset;

  let _radius = radius;

  if (complement) {
    _radius -= constrainedFontSize;
  }

  if (fontSize < minFontSize) {
    if (complement) {
      _radius -= 1;
    }

    return (
      <SquareBase radius={_radius} i={i} complement={complement} rotation={rotation} circleY={circleY} />
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
