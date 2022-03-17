import React from 'react';
import { Shadow } from './Shadow';
import { drawLinear } from '@anocca/sequence-viewer-render-linear';
import {
  tuple,
  SeqAnnotationDirectionsEnum,
  CircularCameraProgress,
  debounce,
  humanCodons,
  CircularSelection,
  Annotations,
  scaleBuffer,
  getRatio,
  dnaBaseWidth,
  matrixMultiply,
  createTranslateMatrix,
  createScaleMatrix,
  proteinBaseWidth,
  Annotation
} from '@anocca/sequence-viewer-utils';
import { useCanvas } from '@anocca/sequence-viewer-react-shared';
import { Slider } from '@material-ui/core';

export const StaticLinear = ({
  w = 640,
  h = 480,
  mouseX = 0,
  mouseY = h,
  sequence = 'TCCTCGCATAGGGCGGATCGGTATTCATGGGACGCCACACAACTCTTAGATTGATTGTCGCTTTCAGGCGTGTCATCCTGCGCCCCGGCACGAGCTCGTCCGGCGGTATAGTCGTATGTGCTTATACACATCAAAGCTAACAAATCTTTCTGCGGGCGGTCGTCACGACACACGTTCTTACG',
  len = sequence.length,
  isProtein,
  mid = len / 2,
  annotationLevels = [],
  startZoom = 55,
  circularSelection = [],
  searchResults = []
}: {
  w?: number;
  h?: number;
  mouseX?: number;
  mouseY?: number;
  sequence?: string;
  isProtein: boolean;
  len?: number;
  mid?: number;
  annotationLevels?: Annotation[][];
  startZoom?: number;
  circularSelection?: CircularSelection[];
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
    drawLinear({
      c,
      w,
      h,
      ratio,
      circularSelection,
      codons: humanCodons,
      data: {
        mouseX,
        mouseY,
        matrix: matrixMultiply(
          createTranslateMatrix(w / 2, 0),
          createScaleMatrix(zoomProgress / 100),
          createTranslateMatrix(-w / 2 / zoomProgress / 100, 0),
          createTranslateMatrix(-(isProtein ? proteinBaseWidth : dnaBaseWidth) * mid, 0)
        ),
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
      },
      sequence: sequence.slice(0, len),
      annotationLevels,
      renderStateRef: {
        hoveringFeature: undefined,
        clickedFeatures: []
      },
      isProtein,
      searchResults
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
      <Slider value={zoomProgress} onChange={handleSliderChange} min={1} />
    </div>
  );
};
