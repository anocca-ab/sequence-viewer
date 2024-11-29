import type { CircularProperties } from '@anocca/sequence-viewer-render-circular';
import type { UpdateProps } from '@anocca/sequence-viewer-utils';
import React from 'react';

export const RenderDataContext = React.createContext<
  undefined | { updateProps: UpdateProps; circularProps: CircularProperties }
>(undefined);

export const useRenderData = () => {
  const ctx = React.useContext(RenderDataContext);
  if (!ctx) {
    throw new Error('You must wrap your component in <RenderDataProvider> to use useRenderData()');
  }
  return ctx;
};
