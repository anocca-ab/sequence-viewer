import { tuple } from '@anocca/sequence-viewer-utils';
import { renderAngleOffset } from './constants';
import { useAgk } from './context';

export const useGetCoordinates = () => {
  const { w, circularProperties } = useAgk();
  const { circleY } = circularProperties;

  const xStart = w / 2;
  const getCoordinates = (radius: number, angle: number) => {
    const x = xStart + radius * Math.cos(angle + renderAngleOffset);
    const y = circleY + radius * Math.sin(angle + renderAngleOffset);
    return tuple(x, y);
  };
  return getCoordinates;
};
