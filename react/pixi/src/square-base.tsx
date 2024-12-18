import { getNtColor, getNtComplement, tuple } from '@anocca/sequence-viewer-utils';
import { type Graphics } from 'pixi.js';
import React, { useCallback } from 'react';
import { minFontSize, renderAngleOffset } from './constants';
import { useAgk } from './context';

export const SquareBase = React.memo(function SquareBase({
  radius,
  i,
  rotation,
  complement,
  circleY
}: {
  radius: number;
  i: number;
  rotation: number;
  complement?: boolean;
  circleY: number;
}) {
  const { w, circularProperties, sequence } = useAgk();
  const xStart = w / 2;
  const color = getNtColor(complement ? getNtComplement(sequence[i]) : sequence[i]);
  const { angleDelta } = circularProperties;

  const draw = useCallback(
    (g: Graphics) => {
      const getCoordinates = (radius: number, angle: number) => {
        const x = xStart + radius * Math.cos(angle + renderAngleOffset);
        const y = circleY + radius * Math.sin(angle + renderAngleOffset);
        return tuple(x, y);
      };

      const getBaseAngle = (i: number) => {
        const a0 = i * angleDelta + rotation - angleDelta / 2;
        const aMid = i * angleDelta + rotation;
        const a1 = i * angleDelta + rotation + angleDelta / 2;

        return { a0, a1, aMid };
      };

      const { a0, a1 } = getBaseAngle(i);

      const [x1, y1] = getCoordinates(radius + minFontSize, a0);
      const [x2, y2] = getCoordinates(radius + minFontSize, a1);
      const [x3, y3] = getCoordinates(radius, a1);
      const [x4, y4] = getCoordinates(radius, a0);
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
    [angleDelta, circleY, color, i, radius, rotation, xStart]
  );

  return <graphics draw={draw} />;
});
