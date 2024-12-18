import { RenderData, SelectionRange, CircularSelection, getIndexMid } from '@anocca/sequence-viewer-utils';

const addAngles = (...angles: number[]) => {
  const sum = angles.reduce((ac, c) => ac + c, 0);
  const value = sum % (Math.PI * 2);
  if (value < 0) {
    return Math.PI * 2 + value;
  }
  return value;
};

const getMouseAngle = (mouseX: number, mouseY: number, xMid: number, yMid: number) => {
  const yd = mouseY - yMid;
  const xd = mouseX - xMid;
  const mouseAngle = Math.abs(Math.atan(yd / xd));
  if (yd <= 0 && xd >= 0) {
    /* 1st cartesian quadrant */
    return Math.PI / 2 - mouseAngle;
  } else if (yd > 0 && xd >= 0) {
    /* 2nd cartesian quadrant */
    return mouseAngle + Math.PI / 2;
  } else if (yd > 0 && xd < 0) {
    /* 3nd cartesian quadrant */
    return Math.PI - mouseAngle + Math.PI / 2;
  } else {
    return mouseAngle + Math.PI / 2 + Math.PI;
  }
};

/**
 * Restricts zoom value between 0 and the target value
 *
 * @internal
 */
export const bindValue = (
  value: { zoom: number; angle: number; radius: number },
  target: { zoom: number; angle: number; radius: number }
) => {
  value.zoom = Math.min(Math.max(value.zoom, 0), target.zoom);
  value.angle = Math.min(Math.max(value.angle, 0), target.angle);
  value.radius = Math.min(Math.max(value.radius, 0), target.radius);
};

/**
 * Will increment the circular camera zoom values
 *
 * @internal
 */
export const increase = (
  zoom: number,
  value: {
    zoom: number;
    angle: number;
    radius: number;
  },
  target: {
    zoom: number;
    angle: number;
    radius: number;
  }
) => {
  /* these two should be same otherwise the circle will bounce */
  const zoomSpeed = 7;
  const radiusSpeed = 7;

  const rotationSpeed = 25;
  if (zoom === 0) {
    return;
  }
  if (zoom > 0) {
    if (value.angle < target.angle || value.zoom < target.zoom) {
      value.angle += zoom * rotationSpeed;
      value.zoom += zoom * zoomSpeed;
    } else {
      value.radius += zoom * radiusSpeed;
    }
  } else {
    if (value.radius > 0) {
      value.radius += zoom * radiusSpeed;
    } else {
      value.zoom += zoom * zoomSpeed;
    }
  }
  bindValue(value, target);
};

const getFlatRadius = (len: number) => {
  return (32 * len) / (2 * Math.PI);
};

const viewRangeFlatRadius = (len: number, w: number, viewRange: SelectionRange) => {
  const { end, start } = viewRange;
  const flatRadius = getFlatRadius(len);
  return Math.min(w / (2 * Math.sin((Math.PI * Math.min(end - start + 2, len / 2)) / len)), flatRadius);
};

const getRadiusTransition1 = (w: number, h: number, zoom: number) => {
  const endRadius = (Math.min(w, h) / 2) * 0.5;

  const startRadius = Math.min(w, h) / 12;

  const radiusTransition1 = startRadius + (endRadius - startRadius) * zoom;

  return radiusTransition1;
};

/**
 * Gets the radius of the circule to fit a selection (start, end) within the width and height
 *
 * @internal
 */
export const getRadiusTargetForViewRange = (
  w: number,
  h: number,
  len: number,
  zoom: number,
  viewRange: SelectionRange
) => {
  const flatRadius1 = getFlatRadius(len);
  const flatRadius2 = viewRangeFlatRadius(len, w, viewRange);
  const radiusTransition1 = getRadiusTransition1(w, h, zoom);
  const r = (flatRadius2 - radiusTransition1) / (flatRadius1 - radiusTransition1);
  return r;
};

const getStartRadius = (w: number, h: number) => {
  const startRadius = Math.min(w, h) / 8;
  return startRadius;
};

const getYOffset = (radius: number, flatRadius: number) => {
  const nextOffset = Math.max(Math.min(radius * flatRadius, flatRadius), 0);
  return nextOffset;
};

/**
 * Calculates properties related to the circle based on the current RenderData
 *
 * @internal
 */
export const getCircleProperties = ({
  w,
  h,
  data,
  sequence,
  circularSelection
}: {
  sequence: string;
  w: number;
  h: number;
  data: RenderData;
  circularSelection: CircularSelection[];
}) => {
  const yStart = h / 2;
  const xStart = w / 2;

  const len = sequence.length;
  const iLen = len - 1;
  // const radius = getRadius(len);

  const flatRadius = getFlatRadius(len);
  const startRadius = getStartRadius(w, h);

  const radiusTransition1 = getRadiusTransition1(w, h, data.circularCamera.value.zoom);
  const radiusTransition2 =
    data.circularCamera.value.radius * (flatRadius - radiusTransition1) + radiusTransition1;

  const radius = Math.max(radiusTransition2, startRadius);

  const yOffset = getYOffset(data.circularCamera.value.radius, flatRadius);

  // const circleY =
  //   yStart +
  //   yOffset +
  //   data.circularCamera.value.zoom *
  //     data.levels.length *
  //     16 *
  //     (1 - data.circularCamera.value.radius);
  const circleY = yStart + yOffset;

  const angleDelta = (Math.PI * 2) / len;

  const { start, end, antiClockwise } = circularSelection[circularSelection.length - 1] || {
    state: 'selected',
    start: 0,
    end: 0,
    antiClockwise: undefined
  };
  const lastCaretMid = getIndexMid(start, end, len, antiClockwise);
  const a = addAngles(data.circularCamera.angleOffset, data.circularCamera.scrollOffsetZooming);
  const b = lastCaretMid * angleDelta;

  const p = data.circularCamera.value.angle;

  const u = addAngles(a, b);
  const v = addAngles(Math.PI * 2, -u);

  /* scroll to target from left, or from right */
  let angleOffset = 0;
  if (u <= Math.PI) {
    // right side, ie scroll anti-clockwise
    angleOffset = addAngles(a, -u * p);
  } else {
    // left side, ie scroll clockwise
    angleOffset = addAngles(a, v * p);
  }
  angleOffset = addAngles(angleOffset, data.circularCamera.scrollOffsetZoomed);
  // const angleOffset = addAngles(
  //   data.circularCamera.angleOffset,
  //   data.circularCamera.scrollOffsetZooming,
  //   data.circularCamera.scrollOffsetZoomed,
  //   b,
  // );

  const mouseDy = data.mouseY - circleY;
  const mouseDx = data.mouseX - xStart;

  const mouseRadius = Math.sqrt(mouseDx ** 2 + mouseDy ** 2);

  const nativeMouseAngle = Math.atan2(mouseDy, mouseDx);
  const mouseTangentX = xStart + radius * Math.cos(nativeMouseAngle);
  const mouseTangentY = circleY + radius * Math.sin(nativeMouseAngle);

  const mouseAngle = getMouseAngle(mouseTangentX, mouseTangentY, xStart, circleY);

  let hoveringCaretPosition = Math.floor((mouseAngle + angleDelta / 2 - angleOffset) / angleDelta);
  if (hoveringCaretPosition >= len) {
    hoveringCaretPosition = hoveringCaretPosition % len;
  } else if (hoveringCaretPosition < 0) {
    hoveringCaretPosition =
      (Math.ceil(Math.abs(hoveringCaretPosition) / len) * len + hoveringCaretPosition) % len;
  }

  const circProps: CircularProperties = {
    circleY,
    angleDelta,
    angleOffset,
    radius,
    len: sequence.length,
    iLen,
    mouseAngle,
    hoveringCaretPosition,
    mouseRadius
  };
  return circProps;
};

export type CircularProperties = {
  circleY: number;
  angleDelta: number;
  angleOffset: number;
  radius: number;
  len: number;
  iLen: number;
  mouseAngle: number;
  hoveringCaretPosition: number;
  mouseRadius: number;
};
