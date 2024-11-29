import { useRenderData } from './context';

export const useBaseAngle = () => {
  const { updateProps, circularProps } = useRenderData();
  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY, iLen } = circularProps;

  const getBaseAngle = (i: number) => {
    const a0 = i * angleDelta + angleOffset - angleDelta / 2;
    const aMid = i * angleDelta + angleOffset;
    const a1 = i * angleDelta + angleOffset + angleDelta / 2;

    return { a0, a1, aMid };
  };
  return getBaseAngle;
};
