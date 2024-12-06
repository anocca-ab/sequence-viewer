import React from 'react';
import { StaticSequence } from '@anocca/sequence-viewer-react-pixi';
import type { CircularSelection, Annotations } from '@anocca/sequence-viewer-utils';
import {
  tuple,
  SeqAnnotationDirectionsEnum,
  CircularCameraProgress,
  debounce,
  humanCodons,
  scaleBuffer,
  getRatio
} from '@anocca/sequence-viewer-utils';
import { useCanvas } from '@anocca/sequence-viewer-react-shared';
import { Slider } from '@mui/material';
import { Shadow } from './Shadow';

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
  const [zoomProgress, setZoomProgress] = React.useState<number>(startZoom);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    const val = newValue as number;
    setZoomProgress(val);
  };

  return (
    <div style={{ width: `${w}px`, height: `${h}px` }}>
      <Shadow>
        <StaticSequence
          searchResults={searchResults}
          p={zoomProgress}
          w={w}
          h={h}
          len={len}
          circularSelections={circularSelection}
          annotationLevels={annotationLevels}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      </Shadow>
      <Slider value={zoomProgress} onChange={handleSliderChange} />
    </div>
  );
};
