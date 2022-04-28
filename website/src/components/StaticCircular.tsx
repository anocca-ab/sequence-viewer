import React from 'react';
import { Shadow } from './Shadow';
import { drawCircular } from '@anocca/sequence-viewer-render-circular';
import {
  tuple,
  SeqAnnotationDirectionsEnum,
  CircularCameraProgress,
  debounce,
  humanCodons,
  CircularSelection,
  Annotations,
  scaleBuffer,
  getRatio
} from '@anocca/sequence-viewer-utils';
import { useCanvas } from '@anocca/sequence-viewer-react-shared';
import { Slider } from '@mui/material';

export const StaticCircular = ({
  searchResults = [],
  startZoom = 55,
  w,
  h,
  len,
  circularSelection,
  annotationLevels,
  mouseX = 0,
  mouseY = h
}: {
  circularSelection: CircularSelection[];
  annotationLevels: Annotations[];
  len: number;
  w: number;
  h: number;
  startZoom?: number;
  mouseX?: number;
  mouseY?: number;
  searchResults?: {
    start: number;
    end: number;
    active: boolean;
    complement: boolean;
  }[];
}) => {
  const [buffer, ref] = useCanvas();
  const [zoomProgress, setZoomProgress] = React.useState<number>(startZoom);

  const cRef = React.useRef<CanvasRenderingContext2D | undefined>(undefined);
  if (buffer && !cRef.current) {
    scaleBuffer(buffer, w, h);
    cRef.current = buffer.getContext('2d');
  }

  const hasRendered = React.useRef(false);

  const rawUpdate = (circularCamera: CircularCameraProgress) => {
    const c = cRef.current;
    if (!c) {
      return;
    }
    hasRendered.current = true;
    const { ratio } = getRatio(c);
    drawCircular({
      c,
      w,
      h,
      ratio,
      data: {
        mouseX,
        mouseY,
        circluarCamera: {
          angleOffset: 0,
          scrollOffsetZoomed: 0,
          scrollOffsetZooming: 0,
          value: circularCamera,
          target: {
            /* progress */
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
      sequence:
        'TCCTCGCATAGGGCGGATCGGTATTCATGGGACGCCACACAACTCTTAGATTGATTGTCGCTTTCAGGCGTGTCATCCTGCGCCCCGGCACGAGCTCGTCCGGCGGTATAGTCGTATGTGCTTATACACATCAAAGCTAACAAATCTTTCTGCGGGCGGTCGTCACGACACACGTTCTTACG'.slice(
          0,
          len
        ),
      circularSelection,
      searchResults,
      annotationLevels,
      renderStateRef: {
        hoveringFeature: undefined,
        clickedFeatures: []
      },
      codons: humanCodons
    });
  };

  const update = debounce(rawUpdate);

  const getCameraFromProgress = (p: number) => {
    const angleProgress = Math.min(p, 50) / 50;
    const radiusProgress = Math.max(0, p - 50) / 50;
    const circularCamera = {
      zoom: 1,
      angle: angleProgress,
      radius: radiusProgress
    };
    return circularCamera;
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    const val = newValue as number;
    setZoomProgress(val);
    update(getCameraFromProgress(val));
  };

  const rawUpdateRef = React.useRef(rawUpdate);
  rawUpdateRef.current = rawUpdate;

  React.useEffect(() => {
    if (buffer && cRef.current && !hasRendered.current) {
      rawUpdateRef.current(getCameraFromProgress(zoomProgress));
    }
  }, [buffer, zoomProgress]);

  return (
    <div style={{ width: `${w}px`, height: `${h}px` }}>
      <Shadow>
        <canvas ref={ref}></canvas>
      </Shadow>
      <Slider value={zoomProgress} onChange={handleSliderChange} />
    </div>
  );
};
