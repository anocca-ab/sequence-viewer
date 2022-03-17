import { SeqAnnotationDirectionsEnum } from './constants';
import { Annotation } from './types';

/**
 * render a sequence in a selection range
 *
 * @internal
 */
export const renderSequenceInSelectionRange = (
  props: {
    len: number;
    startIndex: number;
    endIndex: number;
  } & (
    | {
        sequence: string;
        onRenderBase: (i: number, base: string) => void;
      }
    | {
        onRenderBase: (i: number) => void;
      }
  )
) => {
  const { len, startIndex, endIndex } = props;
  let j = 0;
  const getBase = (sequence: string) => {
    const i = j++;
    return sequence[i];
  };
  const doCallback =
    'sequence' in props
      ? (i: number) => props.onRenderBase(i, getBase(props.sequence))
      : (i: number) => props.onRenderBase(i);
  if (startIndex > endIndex) {
    // draw in two section
    for (let i = startIndex; i < len; i += 1) {
      doCallback(i);
    }
    for (let i = 0; i < endIndex + 1; i += 1) {
      doCallback(i);
    }
  } else {
    for (let i = startIndex; i < endIndex + 1; i += 1) {
      doCallback(i);
    }
  }
};

/**
 * Logic to do render oligo tag
 *
 * @internal
 */
export const maybeRenderOligo = (
  feature: Annotation,
  location: [number, number],
  len: number,
  onRenderBase: (i: number, base: string) => void
) => {
  if (feature.type === 'DNA_OLIGO') {
    const v = feature.fivePExtension;
    if (v) {
      if (feature.direction === SeqAnnotationDirectionsEnum.REVERSE) {
        renderSequenceInSelectionRange({
          startIndex: location[1],
          endIndex: (location[1] + v.length - 1) % len,
          sequence: v.split('').reverse().join(''),
          len,
          onRenderBase: onRenderBase
        });
      } else {
        renderSequenceInSelectionRange({
          startIndex: (location[0] - 1 - v.length + len) % len,
          endIndex: (location[0] - 2 + len) % len,
          sequence: v,
          len,
          onRenderBase: onRenderBase
        });
      }
    }
  }
};
