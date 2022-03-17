import React from 'react';
import { SequenceViewerApp } from '@anocca/sequence-viewer-app';
import { useBackend } from '@anocca/sequence-viewer-backend-react-state';
import { AnnotationForm } from '@anocca/sequence-viewer-react-mui-formik-form';

export const GetStarted = () => {
  const annotationBackend = useBackend();
  return (
    <div>
      <SequenceViewerApp
        {...annotationBackend}
        sequence={'ATGCTGATATCA'}
        AnnotationForm={AnnotationForm}
        width={800}
        height={640}
      />
      <SequenceViewerApp
        {...annotationBackend}
        isProtein
        sequence={'DYKDHDGDYKDH'}
        AnnotationForm={AnnotationForm}
        width={800}
        height={640}
      />
    </div>
  );
};
