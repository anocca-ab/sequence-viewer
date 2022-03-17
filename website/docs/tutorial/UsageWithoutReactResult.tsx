import React from 'react';
import { drawCircular } from '@anocca/sequence-viewer-render-circular';
import { getRatio, humanCodons, scaleBuffer } from '@anocca/sequence-viewer-utils';

export const UsageWithoutReactResult = () => {
  return (
    <canvas
      ref={(buffer) => {
        if (!buffer) {
          return;
        }

        const w = 640;
        const h = 480;

        scaleBuffer(buffer, w, h);

        const c = buffer.getContext('2d');

        const { ratio } = getRatio(c);

        drawCircular({
          c,
          w,
          h,
          ratio,
          data: {
            mouseX: 0,
            mouseY: 0,
            circluarCamera: {
              angleOffset: 0,
              scrollOffsetZoomed: 0,
              scrollOffsetZooming: 0,
              value: {
                zoom: 1,
                angle: 1,
                radius: 1
              },
              target: {
                zoom: 1,
                angle: 1,
                radius: 1
              }
            },
            matrix: {
              a: 1,
              b: 0,
              c: 0,
              d: 1,
              e: 0,
              f: 0
            }
          },
          isProtein: false,
          sequence: 'TCCTCGCATAGGGCGGATCGGTATTCAT',
          circularSelection: [],
          searchResults: [],
          annotationLevels: [],
          renderStateRef: {
            hoveringFeature: undefined,
            clickedFeatures: []
          },
          codons: humanCodons
        });
      }}
    ></canvas>
  );
};
