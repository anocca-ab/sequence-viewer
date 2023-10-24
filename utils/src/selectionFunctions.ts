import { SeqAnnotationDirectionsEnum } from './constants';
import { CircularSelection, SelectionRange } from './types';

/**
 * Check if annotation is over origin
 *
 * @internal
 */
export const annotationIsOverOrigin = (loc: [number, number], direction: SeqAnnotationDirectionsEnum) => {
  return direction == SeqAnnotationDirectionsEnum.REVERSE
    ? isRangeOverOrigin(
        {
          start: loc[1],
          end: loc[0]
        },
        true
      )
    : isRangeOverOrigin(
        {
          start: loc[0],
          end: loc[1]
        },
        false
      );
};

/**
 * Check if selection is over origin
 *
 * @internal
 */
export const isRangeOverOrigin = (selectionRange: SelectionRange, antiClockwise: boolean) => {
  const { start, end } = selectionRange;
  if (start !== end) {
    if (antiClockwise === true) {
      if (start > end) {
        return false;
      } else {
        /* over origin */
        return true;
      }
    } else if (antiClockwise === false) {
      if (end > start) {
        return false;
      } else {
        /* over origin */
        return true;
      }
    }
  }
  return false;
};

/**
 * Check if selection is over origin
 *
 * @internal
 */
export const isSelectionOverOrigin = (circularSelection: CircularSelection) => {
  return isRangeOverOrigin(circularSelection, !!circularSelection.antiClockwise);
};

/**
 * Check if range of indices (1-based) is within a circular selection
 *
 * @internal
 */
export const isRangeInSelection = (
  [a, b]: [number, number],
  circularSelection: Omit<CircularSelection, 'state'>
) => {
  const { start, end, antiClockwise } = circularSelection;
  if (start === end && end === a && end === b) {
    return true;
  }
  if (start !== end) {
    if (antiClockwise === true) {
      if (start > end) {
        if (a >= end && a <= start && b >= end && b <= start) {
          return true;
        }
      } else {
        /* over origin */
        if (a >= end || b <= start) {
          return true;
        }
      }
    } else if (antiClockwise === false) {
      if (end > start) {
        if (a >= start && a <= end && b >= start && b <= end) {
          return true;
        }
      } else {
        /* over origin */
        if (a >= start || b <= end) {
          return true;
        }
      }
    }
  }
  return false;
};

/**
 * Check if sequence index (1-based) is within a circular selection
 *
 * @internal
 */
export const isInSelection = (i: number, circularSelection: Omit<CircularSelection, 'state'>) => {
  const { start, end, antiClockwise } = circularSelection;
  if (start === end && end === i) {
    return true;
  }
  if (start !== end) {
    if (antiClockwise === true) {
      if (start > end) {
        if (i >= end && i <= start) {
          return true;
        }
      } else {
        /* over origin */
        if (i >= end || i <= start) {
          return true;
        }
      }
    } else if (antiClockwise === false) {
      if (end > start) {
        if (i >= start && i <= end) {
          return true;
        }
      } else {
        /* over origin */
        if (i >= start || i <= end) {
          return true;
        }
      }
    }
  }
  return false;
};

/**
 * Returns selection out of set of selections that is over an index
 *
 * @internal
 */
export const getSelectionOver = (i: number, circularSelection: CircularSelection[]) => {
  return circularSelection.find((c) => {
    return isInSelection(i, c);
  });
};

/**
 * The distance between start and end in a selection (0 indexed start and end)
 *
 * @internal
 */
export const getSelectionDelta = (len: number, antiClockwise: boolean, start: number, end: number) => {
  let s = start;
  let e = end;
  if (antiClockwise === true) {
    s = end;
    e = start;
  }
  if (s > e) {
    return len - s + e;
  } else {
    return e - s + 1;
  }
};

/**
 * In percentage get the angle between start and end (0 indexed start and end)
 *
 * @internal
 */
export const getSelectionDeltaAngle = (len: number, antiClockwise: boolean, start: number, end: number) => {
  return getSelectionDelta(len, antiClockwise, start, end) / len;
};

/**
 * gets the sequence index between two indices in a circular context (1-based indices)
 *
 * @internal
 */
export const getIndexMid = (start: number, end: number, len: number, antiClockwise?: boolean) => {
  let mid = (start + end) / 2;
  if (end > start && antiClockwise === false) {
    mid = (start + end) / 2;
  } else if (end < start && antiClockwise === false) {
    mid = (start + (len - start + end) / 2) % len;
  } else if (end < start && antiClockwise === true) {
    mid = (start + end) / 2;
  } else if (end > start && antiClockwise === true) {
    mid = (end + (len - end + start) / 2) % len;
  }
  return mid;
};

/**
 * gets the label under selections like 2 - 10
 *
 * @internal
 */
export const getSelectionLabel = (circularSelection: CircularSelection) => {
  const { end, start, antiClockwise } = circularSelection;

  let label = `${start + 1} - ${end + 1}`;
  if (start === end) {
    label = String(start + 1);
  } else if (antiClockwise) {
    label = `${end + 1} - ${start + 1}`;
  } else {
    label = `${start + 1} - ${end + 1}`;
  }
  const range = end - start > 0 ? end - start : start - end;
  if (range > 0) {
    const numberOfAminoacids = Math.floor((range + 1) / 3);
    label += ` (${range + 1} bases`;
    if (numberOfAminoacids > 0) {
      label += `, ${numberOfAminoacids} amino acids`;
    }
    label += `)`;
  }
  return label;
};
