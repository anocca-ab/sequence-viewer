import { SeqAnnotationDirectionsEnum } from './constants';

/**
 * Selection range
 *
 * @public
 */
export type SelectionRange = {
  start: number;
  end: number;
};

/**
 * Sequence selection defines `[start, end]` where start is the tail and end is the head.
 *
 * lets say we have sequence of length 3000 and annotation of 4 bp length
 * locations:
 *
 * `reverse: [10 - 6], antiClockwise: true`,
 *
 * `reverse(over the origin): [2 - 2998], antiClockwise: true`,
 *
 * `forward: [6 - 10], antiClockwise: false`,
 *
 * `forward(over the origin): [2998 - 2], antiClockwise: false`
 *
 * @public
 */
export type CircularSelection =
  | (SelectionRange & {
      state: 'selecting';
      antiClockwise?: boolean;
    })
  | (SelectionRange & {
      state: 'selected';
      antiClockwise?: boolean;
    });

/**
 * The progress on zoom, angle and radius between 0 and 1 inclusive
 *
 * @public
 */
export type CircularCameraProgress = {
  zoom: number;
  angle: number;
  radius: number;
};

/**
 * A transform matrix
 *
 * @public
 */
export type Matrix = {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
};

/**
 * Frequently updated data for drawCircular and drawLinear
 *
 * @public
 */
export type RenderData = {
  mouseX: number;
  mouseY: number;
  /**
   * Used in the circular viewer
   */
  circluarCamera: CircularCamera;
  /**
   * Used in the linear viewer
   */
  matrix: Matrix;
};

export type CircularCamera = {
  angleOffset: number;
  scrollOffsetZoomed: number;
  scrollOffsetZooming: number;
  value: CircularCameraProgress;
  target: CircularCameraProgress;
};

/**
 * Chromatogram data to render the chromatogram
 *
 * @public
 */
export type ChromatogramData = {
  aTrace: number[];
  gTrace: number[];
  cTrace: number[];
  tTrace: number[];
  phred: number[];
  peakLocations: number[];
  sequence: string;
};

/**
 * Annotation
 *
 * @public
 */
export type Annotation = {
  /**
   * An unique id
   */
  id: string;
  /**
   * A label for the annotation
   */
  label: string;
  /**
   * Automatically determined color for the annotation based on user, group and type
   */
  color: string;
  /**
   * Locations of the annotation relative to the sequence. List of 2-tuples, (start, end) integers. 1-based counting, with the end being inclusive, e.g. (1, 99) means starting from the first base-pair to the 99th base-pair inclusive
   */
  locations: [number, number][];
  /**
   * If checked true then the annotation will not be rendered/displayed
   */
  hidden: boolean;
  /**
   * If checked true, then will display the annotations as sequence if sufficiently zoomed
   */
  displayAsSequence: boolean;
  /**
   * The value to display as a right tag
   */
  rightTag: string;
  /**
   * The value to display as the label of the annotation
   */
  displayLabel: string;
  /**
   * The direction of the annotation for display and extraction only purposes. All location coordinates are always defined from left-to-right, where 1 is start of the molecule. For protein sequences Reverse is not applicable and will default to Not Defined.
   */
  direction: SeqAnnotationDirectionsEnum;
} & (
  | {
      type: 'DNA_OLIGO';
      fivePExtension: string;
    }
  | {
      type: 'DNA_RE_NUC';
      cleavageSites: [number, number][];
    }
  | {
      type: 'OTHER';
    }
);

/**
 * List of annotations
 *
 * @public
 */
export type Annotations = Annotation[];

/**
 * To programatically call onClickAnnotation to select annotation in the sequence controller
 *
 * @public
 */
export type SequenceControllerRef = {
  onClickAnnotation: (id: string | undefined, append?: boolean | undefined) => void;
};

/**
 * The draw function, e.g. drawLinear or drawCircular that paints the canvas element
 *
 * @public
 */
export type DrawFunction = (props: DrawProps) => {
  clickedFeatures: string[];
  hoveringFeature: undefined | string;
};

export type UpdateProps = {
  w: number;
  h: number;
  data: RenderData;
  sequence: string;
  circularSelection: CircularSelection[];
  searchResults: {
    start: number;
    end: number;
    active: boolean;
    complement: boolean;
  }[];
  filterChromOptions: string[];
  annotationLevels: Annotations[];
  renderStateRef: {
    clickedFeatures: string[];
    hoveringFeature: undefined | string;
  };
  codons: {
    [k: string]: string;
  };
  isProtein: boolean;
  chromatogramData?: ChromatogramData;
};

export type DrawProps = UpdateProps & {
  c: CanvasRenderingContext2D;
  ratio: number;
};

/**
 * Search result
 *
 * @public
 */
export type SearchResult = {
  start: number;
  end: number;
  complement: boolean;
  active: boolean;
};

/**
 * Props for an AnnotationForm component
 *
 * @public
 */
export type AnnotationFormProps = {
  onSubmit: (annotation: Annotation) => void;
  title: string;
  initialValues: {
    [k in keyof Annotation]?: Annotation[k];
  };
};
