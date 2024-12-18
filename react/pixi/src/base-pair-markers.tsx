import { tuple } from '@anocca/sequence-viewer-utils';
import React from 'react';
import { CircularText } from './circular-text';
import { minFontSize } from './constants';
import { useAgk } from './context';
import { useArrowHeight } from './selection';
import { useFontSize } from './use-font-size';
import { useGetCoordinates } from './use-get-coordinates';
import { useBaseAngle } from './use-base-angle';

export const useBasePairMarkerRadius = () => {
  const { circularProperties } = useAgk();

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY } = circularProperties;

  const [fontSize] = useFontSize();
  const arrowHeight = useArrowHeight();
  const lineOuterRadius = radius + fontSize + 2 + fontSize + arrowHeight;
  return {
    lineInnerRadius: radius + fontSize + arrowHeight / 2,
    lineOuterRadius,
    outerRadius: lineOuterRadius + 16
  };
};

/* draw base pair indicator, like 1, 1500, 3000, 4500 in a 6000 bp sequence */
const BasePairMarker = React.memo(function BasePairMarker({ aMid, i }: { aMid: number; i: number }) {
  const { circularProperties } = useAgk();

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY } = circularProperties;

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
        textBaseline: 'bottom',
        align: 'center'
      }}
      text={String(i + 1)}
      radius={lineOuterRadius}
      angle={aMid}
    />
  );
  return <>{components}</>;
});

export const BasePairMarkers = React.memo(function BasePairMarkers() {
  const components: JSX.Element[] = [];

  const { w, circularSelections: circularSelection, sequence, circularProperties, circularCamera } = useAgk();

  const { zoom: zoomProgress, radius: radiusProgress } = circularCamera.value;

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY } = circularProperties;

  const inScreen = Math.floor(w / minFontSize);

  const factor = Math.ceil(inScreen / len);

  const xStart = w / 2;

  const getCoordinates = useGetCoordinates();

  const getBaseAngle = useBaseAngle();

  const [fontSize, constrainedFontSize] = useFontSize();

  let interval = Math.floor(len / 4);
  if (zoomProgress > 0.25) {
    interval = Math.floor(len / 8);
  }
  if (radiusProgress > 0) {
    interval = Math.floor(len / 16);
  }
  for (let i = 0; i < len; i += interval) {
    const { a0, a1, aMid } = getBaseAngle(i);
    const mod = i % interval;
    if (mod === 0 && (i + interval / 2) % len >= interval / 2) {
      components.push(<BasePairMarker key={`base-pair-marker-${i}`} aMid={aMid} i={i} />);
    }
  }
  return <>{components}</>;
});
