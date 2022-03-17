import { complementBases, dnaColors, aas, SeqAnnotationDirectionsEnum } from './constants';
import { Annotation, Annotations } from './types';

/**
 * Tuple
 *
 * @internal
 */
export function tuple<A, B, C, D>(a: A, b: B, c: C, d: D): [A, B, C, D];
/**
 * Tuple
 *
 * @internal
 */
export function tuple<A, B, C>(a: A, b: B, c: C): [A, B, C];
/**
 * Tuple
 *
 * @internal
 */
export function tuple<A, B>(a: A, b: B): [A, B];
/**
 * Tuple
 *
 * @internal
 */
export function tuple(...args: any[]) {
  return args;
}

/**
 * If amino acid text color should be bright or dark
 *
 * @internal
 */
export function shouldInvertColor(a: string) {
  return 'FYKRDELIV*.'.includes(a);
}

/**
 * DNA nt color
 *
 * @internal
 */
export const getNtColor = (nt: string) => {
  return dnaColors[nt];
};

/**
 * Amino acid color
 *
 * @internal
 */
export const getAaColor = (aa: string) => {
  return aas[aa]?.color;
};

const sum = (arr: number[]) => {
  let v = 0;
  arr.forEach((n) => {
    v += n;
  });
  return v;
};

const tagLen = (annotation: Annotation) => {
  const tag = annotation.rightTag;
  if (!tag) {
    return 0;
  }
  return String(tag).length * 2;
};

const annotSortIteratee = (a: Annotation) => {
  // const [startBase, endBase] = a.location;
  const startBase = Math.min(...a.locations.flat());
  const endBase = Math.max(...a.locations.flat());
  return Math.abs(endBase - startBase) + tagLen(a);
};

const levelSort = (asc: boolean) => (a: Annotation[], b: Annotation[]) => {
  const m = asc ? 1 : -1;
  const l = m * (a.length - b.length);
  const diff = m * sum(a.map(annotSortIteratee)) - sum(b.map(annotSortIteratee));

  if (diff === 0) {
    return 0;
  } else if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
  } else if (l === 0) {
    return 0;
  } else if (l < 0) {
    return -1;
  } else if (l > 0) {
    return 1;
  }

  return 0;
};

const annotationOverlapping = (
  annotA: Annotation,
  annotB: Annotation,
  sequenceLength: number,
  iterRef: { value: number }
): boolean => {
  const astart = Math.min(...annotA.locations.map(([a]) => a).flat());
  const aend = Math.max(...annotA.locations.map(([, a]) => a).flat());
  const bstart = Math.min(...annotB.locations.map(([a]) => a).flat());
  const bend = Math.max(...annotB.locations.map(([, a]) => a).flat());

  const aOverOrigin = astart > aend;
  const bOverOrigin = bstart > bend;

  iterRef.value += 1;
  if (iterRef.value > 20) {
    return true;
  }
  if (!aOverOrigin && !bOverOrigin) {
    /* overlapping */
    return Math.max(astart, bstart) <= Math.min(aend + tagLen(annotA), bend + tagLen(annotB));
  }

  const negativeSegment = (annot: Annotation) => {
    return {
      ...annot,
      locations: [tuple(Math.min(...annot.locations.map(([a]) => a).flat()), sequenceLength)]
    };
  };
  const positiveSegment = (annot: Annotation) => {
    return {
      ...annot,
      locations: [tuple(0, Math.max(...annot.locations.map(([, a]) => a).flat()))]
    };
  };
  /* a annotation segemented */
  if (aOverOrigin && !bOverOrigin) {
    return (
      annotationOverlapping(negativeSegment(annotA), annotB, sequenceLength, iterRef) ||
      annotationOverlapping(positiveSegment(annotA), annotB, sequenceLength, iterRef)
    );
  }
  /* b annotation segemented */
  if (!aOverOrigin && bOverOrigin) {
    return (
      annotationOverlapping(negativeSegment(annotB), annotA, sequenceLength, iterRef) ||
      annotationOverlapping(positiveSegment(annotB), annotA, sequenceLength, iterRef)
    );
  }
  /* a and b annotation segemented */
  if (aOverOrigin && bOverOrigin) {
    return (
      annotationOverlapping(negativeSegment(annotB), negativeSegment(annotA), sequenceLength, iterRef) ||
      annotationOverlapping(positiveSegment(annotB), positiveSegment(annotA), sequenceLength, iterRef)
    );
    /* eslint-enable prettier/prettier */
  }
  return false;
};

/**
 * Will construct "levels" of Annotation[][] where each level are non overlapping annotations
 *
 * @internal
 */
export const packAnnotations = (annotations: Annotations, sequenceLength: number): Annotations[] => {
  const levels: Annotations[] = [];

  /* big last */
  const annotStack = [...annotations].sort((a, b) => {
    return annotSortIteratee(a) - annotSortIteratee(b);
  });

  stackLoop: while (annotStack.length) {
    const last = annotStack.pop();
    if (!last) {
      continue stackLoop;
    }
    for (const level of levels) {
      const notOverlapping = level.every((iAnnot) => {
        /* not overlapping */
        return !annotationOverlapping(last, iAnnot, sequenceLength, {
          value: 0
        });
      });
      /* not overlapping */
      if (notOverlapping) {
        level.push(last);
        continue stackLoop;
      }
    }
    levels.push([last]);
  }

  return levels.sort(levelSort(true)).reverse();
};

let timeout: any;
/**
 * debounce with animation frame
 *
 * @internal
 */
export const debounce = <T extends (...args: any[]) => any>(fn: T) => {
  return ((...args) => {
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }
    timeout = window.requestAnimationFrame(() => {
      fn(...args);
    });
  }) as T;
};

/**
 * Gets the complement DNA nucleotide
 *
 * @internal
 */
export const getNtComplement = (n: string) => {
  if (n.match(/-|\.| /)) {
    return n;
  }
  const c = complementBases[n];
  if (!c) {
    throw new Error('invalid nucleotide ' + n);
  }
  return c;
};

/**
 * Gets the reverse complement of DNA or peptide sequence
 *
 * @internal
 */
export const getReverseComplement = (isProtein: boolean, nucleotides: string) => {
  const ns = nucleotides.split('');
  ns.reverse();
  if (isProtein) {
    return ns.join('');
  }
  return ns.map(getNtComplement).join('');
};

/*
https://www.bioinformatics.org/sms/iupac.html
*/
const IUPACNDNAAmbiguousNucleotideMatch = (nucleotide: string, code: string) => {
  if (nucleotide.match(/-|\.| /) && code.match(/-|\.| /)) {
    return true;
  }
  /* eslint-disable prettier/prettier */
  return (
    (code === 'A' && nucleotide === 'A') ||
    (code === 'C' && nucleotide === 'C') ||
    (code === 'G' && nucleotide === 'G') ||
    ((code === 'T' || code === 'U') && (nucleotide === 'T' || nucleotide === 'U')) ||
    (code === 'R' && (nucleotide === 'A' || nucleotide === 'G')) ||
    (code === 'Y' && (nucleotide === 'C' || nucleotide === 'T' || nucleotide === 'U')) ||
    (code === 'S' && (nucleotide === 'G' || nucleotide === 'C')) ||
    (code === 'W' && (nucleotide === 'A' || nucleotide === 'T' || nucleotide === 'U')) ||
    (code === 'K' && (nucleotide === 'G' || nucleotide === 'T' || nucleotide === 'U')) ||
    (code === 'M' && (nucleotide === 'A' || nucleotide === 'C')) ||
    (code === 'B' &&
      (nucleotide === 'C' || nucleotide === 'G' || nucleotide === 'T' || nucleotide === 'U')) ||
    (code === 'D' &&
      (nucleotide === 'A' || nucleotide === 'G' || nucleotide === 'T' || nucleotide === 'U')) ||
    (code === 'H' &&
      (nucleotide === 'A' || nucleotide === 'C' || nucleotide === 'T' || nucleotide === 'U')) ||
    (code === 'V' && (nucleotide === 'A' || nucleotide === 'C' || nucleotide === 'G')) ||
    code === 'N'
  );
  /* eslint-enable prettier/prettier */
};

function dnaMatch(sequence: string, site: string) {
  if (site.length !== sequence.length) {
    throw new Error('sequence and site must be the same length');
  }
  for (let j = 0; j < site.length; j += 1) {
    if (!IUPACNDNAAmbiguousNucleotideMatch(sequence[j], site[j])) {
      return false;
    }
  }
  return true;
}
const aminoAcidMatch = (sequence: string, site: string) => {
  for (let j = 0; j < site.length; j += 1) {
    if (sequence[j] !== site[j]) {
      return false;
    }
  }
  return true;
};

/**
 * Test if sequence matches ambiguous site
 *
 * @param isProtein - Is it a peptide sequence
 * @param sequence - Nucleotide sequence or peptide sequence
 * @param site - Ambiguous nucleotide or peptide sequence
 *
 * @internal
 */
export const sequenceMatch = (isProtein: boolean, sequence: string, site: string) => {
  if (!isProtein) {
    return dnaMatch(sequence, site);
  }
  return aminoAcidMatch(sequence, site);
};
