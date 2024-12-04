import React from 'react';
import {
  matrixMultiply,
  Matrix,
  createTranslateMatrix,
  createScaleMatrix,
  dnaBaseWidth,
  RenderData,
  proteinBaseWidth
} from '@anocca/sequence-viewer-utils';

export const getInitialTransformMatrix = (w: number, sequenceLength: number, isProtein: boolean): Matrix => {
  const baseWidth = isProtein ? proteinBaseWidth : dnaBaseWidth;

  const scale = (w - 96) / (sequenceLength * baseWidth);

  const m = matrixMultiply(createTranslateMatrix(48, 0), createScaleMatrix(scale));

  return m;
};

/**
 * contains initial data used for drawCircular/drawLinear
 *
 * @internal
 */
export const useRenderData = (width: number, sequence: string, isProtein: boolean) => {
  const renderData = React.useRef<RenderData | null>(null);

  if (!renderData.current && width) {
    renderData.current = {
      mouseX: 0,
      mouseY: 0,
      matrix: getInitialTransformMatrix(width, sequence.length, isProtein),
      circluarCamera: {
        angleOffset: 0,
        scrollOffsetZoomed: 0,
        scrollOffsetZooming: 0,
        value: {
          /* progress */
          zoom: 0,
          angle: 0,
          radius: 0
        },
        target: {
          /* progress */
          zoom: 1,
          angle: 1,
          radius: 1
        }
      }
    };
  }

  return renderData;
};
