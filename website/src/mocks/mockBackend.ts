import React from 'react';
import { Annotation } from '@anocca/sequence-viewer-utils';
import { sequence, annotations as dbAnnotations } from './moleculeA';
import { useBackend } from '@anocca/sequence-viewer-backend-react-state';

export const useMockBackend = (annotations: Annotation[] = dbAnnotations) => {
  return useBackend(annotations);
};
