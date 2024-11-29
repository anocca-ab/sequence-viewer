import { tuple } from '@anocca/sequence-viewer-utils';
import { renderAngleOffset } from './constants';
import { useRenderData } from './context';

export const useGetCoordinates = () => {
  const { updateProps, circularProps } = useRenderData();
  const { w, circularSelection, sequence } = updateProps;
  const { len, hoveringCaretPosition, angleDelta, angleOffset, circleY } = circularProps;

  const xStart = w / 2;
  const getCoordinates = (radius: number, angle: number) => {
    const x = xStart + radius * Math.cos(angle + renderAngleOffset);
    const y = circleY + radius * Math.sin(angle + renderAngleOffset);
    return tuple(x, y);
  };
  return getCoordinates;
};
