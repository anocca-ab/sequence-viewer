import { SearchComponent, ControllerProps } from '@anocca/sequence-viewer-react-shared';
import {
  Annotations,
  CircularSelection,
  SelectionRange,
  SequenceControllerRef
} from '@anocca/sequence-viewer-utils';
import React from 'react';
import { useLinearController } from './useLinearController';

/**
 * Renders interactive linear viewer.
 *
 * See:
 * {@link @anocca/sequence-viewer-utils#Annotations | Annotations},
 * {@link @anocca/sequence-viewer-utils#CircularSelection | CircularSelection},
 * {@link @anocca/sequence-viewer-utils#SequenceControllerRef | SequenceControllerRef},
 * {@link @anocca/sequence-viewer-react-shared#SearchComponent | SearchComponent}
 *
 * @public
 */
export const LinearController = React.forwardRef<SequenceControllerRef, ControllerProps>(
  (
    {
      width,
      height,
      sequence,
      annotations: allAnnotations,
      codons,
      Search,
      FilterChromatogram,
      children: renderLayout,
      openAnnotationDialog,
      isProtein,
      chromatogramData
    },
    ref
  ) => {
    const {
      canvas,
      selectedAnnotations,
      circularSelection,
      clickedAnnotation,
      search,
      filterChromatogram,
      canvasRef,
      zoomToSearchResult,
      setSearchResults
    } = useLinearController({
      ref,
      width,
      height,
      sequence,
      allAnnotations,
      codons,
      Search,
      FilterChromatogram,
      openAnnotationDialog,
      isProtein,
      chromatogramData
    });

    return (
      <>
        {renderLayout ? (
          renderLayout({
            canvas,
            selectedAnnotations,
            circularSelections: circularSelection,
            clickedAnnotation,
            search,
            filterChromatogram,
            canvasRef,
            zoomToSearchResult,
            setSearchResults
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
