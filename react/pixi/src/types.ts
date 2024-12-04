import type {
  Annotations,
  CircularCamera,
  CircularSelection,
  RenderData
} from '@anocca/sequence-viewer-utils';

export type PixiUpdateProps = {
  w: number;
  h: number;
  mouse: {
    x: number;
    y: number;
  };
  circluarCamera: CircularCamera;
  sequence: string;
  circularSelection: CircularSelection[];
  searchResults: {
    start: number;
    end: number;
    active: boolean;
    complement: boolean;
  }[];
  annotationLevels: Annotations[];
  clickedFeatures: string[];
  hoveringFeature: undefined | string;
  codons: Record<string, string>;
  isProtein: boolean;
};
