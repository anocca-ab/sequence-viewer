import { SequenceViewerApp } from '@anocca/sequence-viewer-app';
import { AnnotationForm } from '@anocca/sequence-viewer-react-mui-formik-form';
import { Annotation } from '@anocca/sequence-viewer-utils';
import React from 'react';
import { useMockBackend } from '../mocks/mockBackend';

export const CircularApp = ({
  annotations = [],
  sequence,
  isProtein = false
}: {
  annotations?: Annotation[];
  sequence: string;
  isProtein: boolean;
}) => {
  const backend = useMockBackend(annotations);

  return (
    <SequenceViewerApp
      {...backend}
      sequence={sequence}
      isProtein={isProtein}
      renderLinearByDefault={false}
      AnnotationForm={AnnotationForm}
      width={800}
      height={640}
    />
  );
};
