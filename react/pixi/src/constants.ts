import type { CircularCamera } from '@anocca/sequence-viewer-utils';

export const minFontSize = 4;
export const renderAngleOffset = -Math.PI / 2;
export const initialCircularCamera: CircularCamera = {
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
};
