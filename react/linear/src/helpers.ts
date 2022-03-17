import React from 'react';
import { Matrix } from '@anocca/sequence-viewer-utils';
import { transformPoint, getInverseMatrix } from '@anocca/sequence-viewer-render-linear';

export const identityMatrix = (): Matrix => {
  return {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0
  };
};

export const projectPointToMatrix = (x: number, y: number, matrix: Matrix) => {
  return transformPoint(x, y, getInverseMatrix(matrix));
};
