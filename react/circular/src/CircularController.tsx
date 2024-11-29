import { SearchComponent, ControllerProps } from '@anocca/sequence-viewer-react-shared';
import {
  Annotations,
  CircularSelection,
  SelectionRange,
  SequenceControllerRef
} from '@anocca/sequence-viewer-utils';
import React from 'react';
import { useCircularController } from './useCircularController';

/**
 * Renders interactive circular viewer.
 *
 * See:
 * {@link @anocca/sequence-viewer-utils#Annotations | Annotations},
 * {@link @anocca/sequence-viewer-utils#CircularSelection | CircularSelection},
 * {@link @anocca/sequence-viewer-utils#SequenceControllerRef | SequenceControllerRef},
 * {@link @anocca/sequence-viewer-react-shared#SearchComponent | SearchComponent}
 *
 * @public
 */
export const CircularController = React.forwardRef<SequenceControllerRef, ControllerProps>(
  (
    {
      width,
      height,
      sequence,
      annotations: allAnnotations,
      codons,
      Search,
      children: renderLayout,
      openAnnotationDialog,
      isProtein,
      draw,
      interactiveElement,
      onUpdate
    },
    ref
  ) => {
    const {
      canvas,
      selectedAnnotations,
      circularSelection,
      clickedAnnotation,
      search,
      canvasRef,
      zoomToSearchResult,
      setSearchResults,
      setCircularSelection,
      buffer
    } = useCircularController({
      ref,
      width,
      height,
      sequence,
      allAnnotations,
      codons,
      Search,
      openAnnotationDialog,
      isProtein,
      draw,
      interactiveElement,
      onUpdate
    });

    return (
      <>
        {renderLayout ? (
          renderLayout({
            canvas,
            selectedAnnotations,
            circularSelections: circularSelection,
            setCircularSelection,
            clickedAnnotation,
            search,
            canvasRef,
            zoomToSearchResult,
            setSearchResults,
            buffer
          })
        ) : search ? (
          <div>
            <div>{search}</div>
            <div>{canvas}</div>
          </div>
        ) : (
          canvas
        )}
      </>
    );
  }
);
