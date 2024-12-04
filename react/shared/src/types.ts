import {
  Annotations,
  ChromatogramData,
  CircularSelection,
  DrawFunction,
  SearchResult,
  SelectionRange,
  UpdateProps
} from '@anocca/sequence-viewer-utils';
/**
 * Filter options to be shown on chromatogram
 *
 * See: {@link @anocca/sequence-viewer-utils#ChromatogramData | ChromatogramData}
 *
 * @public
 */
export type FilterChromatogramType = ({
  optionsToRender,
  setOptionsToRender
}: {
  optionsToRender: string[];
  setOptionsToRender: (options: string[]) => void;
}) => JSX.Element;

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
  FilterChromatogram?: FilterChromatogramType;
  openAnnotationDialog?: (annotationId: string) => void;
  isProtein: boolean;
  chromatogramData?: ChromatogramData;
  draw?: DrawFunction;
  children?: (props: RenderProps) => React.ReactNode;
  interactiveElement?: HTMLElement;
  onUpdate?: (props: UpdateProps) => void;
};

/**
 * When providing a custom layout to the CircularController or LinearController, this is the props that will be passed to the layout.
 *
 * @public
 */
export type RenderProps = {
  canvas: React.ReactNode;
  search?: React.ReactNode;
  buffer: HTMLCanvasElement | null;
  filterChromatogram?: React.ReactNode;
  selectedAnnotations: string[];
  circularSelections: CircularSelection[];
  setCircularSelection: (annotationId: string | undefined, cc: CircularSelection[]) => void;
  clickedAnnotation?: string;
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
};
