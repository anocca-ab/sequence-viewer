import { tuple } from '@anocca/sequence-viewer-utils';
import { minFontSize } from './constants';
import { useRenderData } from './context';

export const useFontSize = () => {
  const { circularProps } = useRenderData();

  const { radius, len } = circularProps;

  const fontSize = Math.max(Math.min((2 * radius * Math.PI) / len, 16), 0);

  const constrainedFontSize = fontSize >= minFontSize ? fontSize : minFontSize;

  return tuple(fontSize, constrainedFontSize);
};
