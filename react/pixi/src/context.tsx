import React from 'react';
import type { CircularProperties } from '@anocca/sequence-viewer-render-circular';
import type { Annotations, CircularCamera, CircularSelection } from '@anocca/sequence-viewer-utils';
import type { PixiUpdateProps } from './types';

type AgkContextType = {
  circularProperties: CircularProperties;
  w: number;
  h: number;
  circularSelection: CircularSelection[];
  sequence: string;
  codons: Record<string, string>;
  circluarCamera: CircularCamera;
  annotationLevels: Annotations[];
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
