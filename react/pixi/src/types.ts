import { type ControllerProps } from '@anocca/sequence-viewer-react-shared';
import type {
  Annotations,
  CircularCamera,
  CircularSelection,
  SearchResult
} from '@anocca/sequence-viewer-utils';
import type React from 'react';

export type PixiUpdateProps = {
  w: number;
  h: number;
  mouse: {
    x: number;
    y: number;
  };
  circularCamera: CircularCamera;
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

export type BridgeType = {
  props: ControllerProps & { layout: 'linear' | 'circular' };
  clickedAnnotation: string | undefined;
  setClickedAnnotation: React.Dispatch<React.SetStateAction<string | undefined>>;
  circularSelections: CircularSelection[];
  setCircularSelections: React.Dispatch<React.SetStateAction<CircularSelection[]>>;
  selectedAnnotations: string[];
  searchResults: SearchResult[];
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
};
