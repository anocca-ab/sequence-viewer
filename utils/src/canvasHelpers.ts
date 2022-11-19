/**
 * Creates a font string based on fontSize and fontWeight
 *
 * @public
 */
export function getFont(size: number, weight: 'normal' | 'bold' | number = 'normal') {
  return `normal normal ${weight} ${size}px sans-serif`;
}
/**
 * Get the device pixel ratio
 *
 * @public
 */
export function getRatio(context: CanvasRenderingContext2D) {
  // assume the device pixel ratio is 1 if the browser doesn't specify it
  const devicePixelRatio = window.devicePixelRatio || 1;

  // determine the 'backing store ratio' of the canvas context
  const backingStoreRatio =
    (context as any).webkitBackingStorePixelRatio ||
    (context as any).mozBackingStorePixelRatio ||
    (context as any).msBackingStorePixelRatio ||
    (context as any).oBackingStorePixelRatio ||
    (context as any).backingStorePixelRatio ||
    1;

  // determine the actual ratio we want to draw at
  const ratio = devicePixelRatio / backingStoreRatio;

  return {
    ratio,
    shouldScale: devicePixelRatio !== backingStoreRatio
  };
}

/**
 * Scale the canvas according to the device pixel ratio
 *
 * @public
 */
export function scaleBuffer(canvas: HTMLCanvasElement, width: number, height: number) {
  const context = canvas.getContext('2d');
  if (!context) {
    return;
  }
  const { ratio, shouldScale } = getRatio(context);

  if (shouldScale) {
    // set the 'real' canvas size to the higher width/height
    canvas.width = width * ratio;
    canvas.height = height * ratio;

    // ...then scale it back down with CSS
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  } else {
    // this is a normal 1:1 device; just scale it simply
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = '';
    canvas.style.height = '';
  }
  return { ratio, shouldScale };
}

let offScreenCanavs: null | HTMLCanvasElement = null;
let offScreenContext: null | CanvasRenderingContext2D = null;
/**
 * Based on the intensity of the background color selects white or back text color
 *
 * @internal
 */
export const getTextColor = (background: string) => {
  if (!offScreenCanavs) {
    const existingCanvas = document.getElementById('seq-view-offscreen-canvas') as HTMLCanvasElement;
    if (existingCanvas) {
      offScreenCanavs = existingCanvas;
    } else {
      offScreenCanavs = document.createElement('canvas');
      offScreenCanavs.id = 'seq-view-offscreen-canvas';
      offScreenCanavs.style.position = 'absolute';
      offScreenCanavs.style.left = '-10px';
      offScreenCanavs.style.width = '1px';
      offScreenCanavs.style.height = '1px';
      offScreenCanavs.width = 2;
      offScreenCanavs.height = 2;
      offScreenCanavs.style.visibility = 'hidden';
      document.body.appendChild(offScreenCanavs);
    }
  }
  if (!offScreenContext) {
    offScreenContext = offScreenCanavs.getContext('2d', {
      willReadFrequently: true
    } as any as undefined);
  }
  const c = offScreenContext;
  if (c) {
    const x = 0;
    const y = 0;
    c.clearRect(x, y, 1, 1);
    c.fillStyle = background;
    c.fillRect(x, y, 1, 1);
    var {
      data: [red, green, blue]
    } = c.getImageData(x, y, 1, 1);
    c.clearRect(x, y, 1, 1);
    return red * 0.299 + green * 0.587 + blue * 0.114 > 150 ? 'black' : 'white';
  }
  return 'black';
};
