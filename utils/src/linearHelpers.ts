import { Matrix } from './types';

/**
 * Create a transform matrix that is pan target by x, y
 *
 * @internal
 */
export const createTranslateMatrix = (x: number, y: number): Matrix => {
  return {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: x,
    f: y
  };
};

/**
 * create transform matrix that scales target by scale
 *
 * @internal
 */
export const createScaleMatrix = (scale: number): Matrix => {
  return {
    a: scale,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0
  };
};

const shiftMatrixKeys = (m: Matrix) => {
  const { a, b, c, d, e, f } = m;
  return {
    g: a,
    h: b,
    i: c,
    j: d,
    k: e,
    l: f
  };
};

const matrixMultiplyOnce = (m1: Matrix, m2: Matrix): Matrix => {
  // \begin{pmatrix}ag+ch&ai+cj&ak+cl+e\\ bg+dh&bi+dj&bk+dl+f\\ 0&0&1\end{pmatrix}
  const { a, b, c, d, e, f } = m1;
  const { g, h, i, j, k, l } = shiftMatrixKeys(m2);
  return {
    a: a * g + c * h,
    b: b * g + d * h,
    c: a * i + c * j,
    d: b * i + d * j,
    e: a * k + c * l + e,
    f: b * k + d * l + f
  };
};

/**
 * Multiply matrices
 *
 * @internal
 */
export const matrixMultiply = (...matrices: Matrix[]) => {
  let matrix = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0
  };
  matrices.forEach((m) => {
    matrix = matrixMultiplyOnce(matrix, m);
  });
  return {
    ...matrix
  };
};
