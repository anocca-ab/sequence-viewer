/**
 * Creates an annotation backend that stores annotations in React.setState
 *
 * @packageDocumentation
 */

import React from 'react';
import { Annotation } from '@anocca/sequence-viewer-utils';

/**
 * Creates an annotation backend that stores annotations in React.setState.
 *
 * See: {@link @anocca/sequence-viewer-utils#Annotation | Annotation}
 *
 * @public
 */
export const useBackend = (initialAnnotations: Annotation[] = []) => {
  const [annotations, setAnnotations] = React.useState<Annotation[]>(initialAnnotations);
  const annotationsDictionary = Object.fromEntries(
    annotations.map((annotation) => {
      return [annotation.id, annotation];
    })
  );
  const getAnnotationLabelById = (id: string) => {
    const label = annotationsDictionary[id]?.label;
    if (!label) {
      throw new Error('could not fetch label for ' + id);
    }
    return label;
  };
  const getAnnotationById = (id: string): Annotation => {
    const annot = annotationsDictionary[id];
    if (!annot) {
      throw new Error('could not fetch annot for ' + id);
    }
    return annot;
  };
  const addAnnotation = (annotation: Annotation) => {
    setAnnotations([...annotations, annotation]);
  };
  const hideAnnotations = (ids: string[]) => {
    setAnnotations(
      annotations.map((annotation) => {
        if (ids.includes(annotation.id)) {
          return {
            ...annotation,
            hidden: true
          };
        }
        return annotation;
      })
    );
  };
  const showAnnotations = (ids: string[]) => {
    setAnnotations(
      annotations.map((annotation) => {
        if (ids.includes(annotation.id)) {
          return {
            ...annotation,
            hidden: false
          };
        }
        return annotation;
      })
    );
  };
  const deleteAnnotations = (ids: string[]) => {
    setAnnotations(
      annotations.filter((annotation) => {
        return !ids.includes(annotation.id);
      })
    );
  };
  const updateAnnotation = (annotation: Annotation) => {
    setAnnotations(
      annotations.map((someAnnot) => {
        if (annotation.id === someAnnot.id) {
          return annotation;
        }
        return someAnnot;
      })
    );
  };
  return {
    annotations,
    getAnnotationLabelById,
    getAnnotationById,
    addAnnotation,
    deleteAnnotations,
    showAnnotations,
    hideAnnotations,
    updateAnnotation
  };
};
