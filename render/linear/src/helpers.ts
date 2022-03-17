import { aas, dnaBaseWidth, dnaColors, Matrix, proteinBaseWidth } from '@anocca/sequence-viewer-utils';

/**
 * Get the aa or dna name
 *
 * @internal
 */
export const getBaseName = (level: 0 | 1 | 2 | 3, isProtein: boolean, ntOrAa: string) => {
  if (!isProtein) {
    return ntOrAa;
  }

  if (level === 0) {
    return aas[ntOrAa].name;
  }

  if (level === 1) {
    return aas[ntOrAa].threeLettersName;
  }

  return ntOrAa;
};

/**
 * Get the aa or dna color
 *
 * @internal
 */
export const getBaseColor = (isProtein: boolean, ntOrAa: string) => {
  if (isProtein) {
    return aas[ntOrAa].color;
  }
  return dnaColors[ntOrAa];
};

/**
 * Gets the inverse matrix
 *
 * @internal
 */
export const getInverseMatrix = (m: Matrix): Matrix => {
  // \begin{pmatrix}-\frac{d}{cb-ad}&\frac{c}{cb-ad}&\frac{ed-cf}{cb-ad}\\ \frac{b}{cb-ad}&-\frac{a}{cb-ad}&-\frac{eb-af}{cb-ad}\\ 0&0&1\end{pmatrix}
  const { a, b, c, d, e, f } = m;
  return {
    a: -d / (c * b - a * d),
    b: b / (c * b - a * d),
    c: c / (c * b - a * d),
    d: -a / (c * b - a * d),
    e: (e * d - c * f) / (c * b - a * d),
    f: -(e * b - a * f) / (c * b - a * d)
  };
};

/**
 * Transforms point based on matrix
 *
 * @internal
 */
export const transformPoint = (x: number, y: number, m: Matrix) => {
  // \begin{pmatrix}a&c&e\\ b&d&f\\ 0&0&1\end{pmatrix}\begin{pmatrix}x\\ y\\ 1\end{pmatrix}=\begin{pmatrix}ax+cy+e\\ bx+dy+f\\ 1\end{pmatrix}
  return {
    x: m.a * x + m.c * y + m.e,
    y: m.b * x + m.d * y + m.f
  };
};

/**
 * Scales rect based on matrix
 *
 * @internal
 */
export const scaleRectByMatrix = (x: number, y: number, width: number, height: number, matrix: Matrix) => {
  const inverseMatrix = getInverseMatrix(matrix);
  const pos1 = transformPoint(x, y, inverseMatrix);
  const pos2 = transformPoint(x + width, y + height, inverseMatrix);
  return {
    x: pos1.x,
    y: pos1.y,
    width: pos2.x - pos1.x,
    height: pos2.y - pos1.y
  };
};

/**
 * Generates selection in bps units based on current mouse position and initial mouse position
 *
 * @internal
 */
export const getSelectedSequence = (
  currentMousePosition: {
    x: number;
    y: number;
  },
  initialMousePosition: {
    x: number;
    y: number;
  },
  matrix: Matrix,
  sequence: string,
  isProtein: boolean
) => {
  const len = sequence.length;
  const baseWidth = isProtein ? proteinBaseWidth : dnaBaseWidth;
  const inverseMatrix = getInverseMatrix(matrix);
  const mouseMatrixPos = transformPoint(currentMousePosition.x, currentMousePosition.y, inverseMatrix);
  const transformedMouseX = mouseMatrixPos.x;
  let x1 = Math.min(transformedMouseX, initialMousePosition.x);
  x1 = Math.max(x1 - (x1 % baseWidth), 0);
  let x2 = Math.max(transformedMouseX, initialMousePosition.x);
  x2 = Math.max(x2 - (x2 % baseWidth), 0);
  let width = Math.abs(x1 - x2);
  const sequenceStart = Math.floor(x1 / baseWidth);
  const sequenceEnd = Math.max(Math.min(Math.floor(x2 / baseWidth), len), 0);
  x2 = sequenceEnd * baseWidth;
  width = Math.abs(x1 - x2);
  const _sequence = sequence.slice(sequenceStart, sequenceEnd);
  return {
    width,
    x: x1,
    sequence: _sequence,
    sequenceStart,
    sequenceEnd
  };
};
