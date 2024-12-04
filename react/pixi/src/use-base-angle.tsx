import { useAgk } from './context';

export const useBaseAngle = () => {
  const { circularProperties } = useAgk();
  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY, iLen } = circularProperties;

  const getBaseAngle = (i: number) => {
    const a0 = i * angleDelta + angleOffset - angleDelta / 2;
    const aMid = i * angleDelta + angleOffset;
    const a1 = i * angleDelta + angleOffset + angleDelta / 2;

    return { a0, a1, aMid };
  };
  return getBaseAngle;
};
