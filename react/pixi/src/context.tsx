import React from 'react';
import type { CircularProperties } from '@anocca/sequence-viewer-render-circular';
import type {
  Annotations,
  CircularCamera,
  CircularSelection,
  SearchResult
} from '@anocca/sequence-viewer-utils';
import type { PixiUpdateProps } from './types';

type AgkContextType = {
  circularProperties: CircularProperties;
  w: number;
  h: number;
  circularSelections: CircularSelection[];
  sequence: string;
  codons: Record<string, string>;
  circularCamera: CircularCamera;
  annotationLevels: Annotations[];
  searchResults: SearchResult[];
  openAnnotationDialog: undefined | ((annotationId: string) => void);
  annotations: Annotations;
  setCircularSelections: React.Dispatch<React.SetStateAction<CircularSelection[]>>;
  setClickedAnnotation: React.Dispatch<React.SetStateAction<string | undefined>>;
  clickedAnnotation: string | undefined;
  selectedAnnotations: string[];
  setCircluarCamera: React.Dispatch<React.SetStateAction<CircularCamera>>;
};

const AgkContext = React.createContext<undefined | AgkContextType>(undefined);

export const AgkProvider = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
} & AgkContextType) => {
  return <AgkContext.Provider value={props}>{children}</AgkContext.Provider>;
};

export const useAgk = () => {
  const ctx = React.useContext(AgkContext);
  if (!ctx) {
    throw new Error('You must wrap your component in <AgkProvider> to use useAgk()');
  }
  return ctx;
};
