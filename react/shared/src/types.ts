import { Annotations, CircularSelection, SearchResult, SelectionRange } from '@anocca/sequence-viewer-utils';

/**
 * Search component that can be passed to the circular controller.
 *
 * See: {@link @anocca/sequence-viewer-utils#SearchResult | SearchResult}
 *
 * @public
 */
export type SearchComponent = ({
  sequence,
  zoomOnResult,
  onSearchResults,
  spinOnResult,
  isProtein
}: {
  sequence: string;
  zoomOnResult: (range: SearchResult) => void;
  spinOnResult: (range: SearchResult) => void;
  onSearchResults: (results: SearchResult[]) => void;
  isProtein: boolean;
}) => JSX.Element;

/**
 * Props for the CircularController and the LinearController component
 *
 * @public
 */
export type ControllerProps = {
  width: number;
  height: number;
  sequence: string;
  annotations: Annotations;
  codons: { [k: string]: string };
  Search?: SearchComponent;
  openAnnotationDialog?: (annotationId: string) => void;
  isProtein: boolean;
  children?: (props: {
    canvas: React.ReactNode;
    search?: React.ReactNode;
    selectedAnnotations: string[];
    circularSelections: CircularSelection[];
    clickedAnnotation?: string;
    canvasRef: (buffer: HTMLCanvasElement | null) => void;
    zoomToSearchResult: (nextViewRange: SelectionRange, zoom: boolean) => void;
    setSearchResults: (
      value: React.SetStateAction<
        {
          start: number;
          end: number;
          active: boolean;
          complement: boolean;
        }[]
      >
    ) => void;
  }) => React.ReactNode;
};
