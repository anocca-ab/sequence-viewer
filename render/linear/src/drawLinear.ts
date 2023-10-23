import {
  SelectionRange,
  getFont,
  Annotation,
  dnaBaseWidth,
  shouldInvertColor,
  getTextColor,
  aas,
  RenderData,
  DrawFunction,
  SeqAnnotationDirectionsEnum,
  proteinBaseWidth,
  tuple,
  getNtComplement,
  getAaColor,
  isInSelection,
  getSelectionOver,
  getSelectionDelta,
  getIndexMid,
  getSelectionLabel,
  maybeRenderOligo,
  isSelectionOverOrigin,
  isRangeOverOrigin,
  annotationIsOverOrigin,
  isRangeInSelection,
  ChromatogramData
} from '@anocca/sequence-viewer-utils';
import {
  getBaseColor,
  getBaseName,
  getInverseMatrix,
  getSelectedSequence,
  scaleRectByMatrix,
  transformPoint
} from './helpers';
import { baseHeight, yBase } from './constants';

const topAreaHeight = 64;
const carretHeight = 16;
const carretFontSize = 16;

/**
 * Render a linear view of a sequence on a canvas.
 *
 * See: {@link @anocca/sequence-viewer-utils#DrawFunction | DrawFunction}
 *
 * @public
 */
export const drawLinear: DrawFunction = ({
  c,
  w,
  h,
  ratio,
  sequence,
  annotationLevels,
  data,
  renderStateRef,
  searchResults,
  filterChromOptions,
  isProtein,
  chromatogramData,
  circularSelection,
  codons
}) => {
  const len = sequence.length;
  const iLen = len - 1;

  const baseWidth = isProtein ? proteinBaseWidth : dnaBaseWidth;

  const selectionLineMarginTop = 3;
  const selectionLineWidth = 3;

  c.save();
  c.resetTransform();

  /* retina display scaling */
  c.scale(ratio, ratio);

  c.clearRect(0, 0, w, h);
  /* background */
  c.fillStyle = 'white';
  c.fillRect(0, 0, w, h);

  /* apply zooming and scrolling */
  const m = data.matrix;
  /* e horizontal translate */
  /* f vertical translate */
  /* a horizontal scale */

  // const preTransform = c.getTransform();
  // c.transform(m.a, m.b, m.c, m.d, m.e, m.f);
  // const postTransform = c.getTransform();

  /* some base calculations */
  const inverseMatrix = getInverseMatrix(data.matrix);
  const windowStart = Math.max(
    Math.min(Math.floor(transformPoint(0, 0, inverseMatrix).x / baseWidth), iLen),
    0
  );
  const windowLen = Math.max(Math.min(Math.floor(transformPoint(w, 0, inverseMatrix).x / baseWidth), len), 1);
  const baseX = 0;
  const midTransformed = transformPoint(w / 2, 0, inverseMatrix).x;
  const xStartTransformed = transformPoint(0, 0, inverseMatrix).x;
  const xEndTransformed = transformPoint(w, 0, inverseMatrix).x;
  const baseWidthTransformed = baseWidth;

  /* draw debug mouse cursor */
  const mouseMatrixPos = transformPoint(data.mouseX, data.mouseY, inverseMatrix);
  const transformedMouseX = mouseMatrixPos.x;
  const transformedMouseY = mouseMatrixPos.y;

  c.save();

  const transformX = (x: number) => x * m.a + m.e;
  const transformY = (y: number) => y + m.f;

  const measureNonScaledText = (text: string) => {
    // c.scale(1 / m.a, 1);
    const width = c.measureText(text).width;
    // c.setTransform(postTransform);
    return width;
  };

  const drawNonScaledText = (
    text: string,
    x: number,
    y: number,
    align: 'center' | 'start' | 'end',
    justify: 'center' | 'start' | 'end'
  ) => {
    // c.scale(1 / m.a, 1);
    const width = c.measureText(text).width;
    let xp = x;
    if (justify === 'center') {
      xp -= width / 2 / m.a;
    } else if (justify === 'end') {
      xp -= width / m.a;
    }
    const yp = y;
    if (align === 'center') {
      c.textBaseline = 'middle';
    } else if (align === 'start') {
      c.textBaseline = 'hanging';
    } else {
      c.textBaseline = 'bottom';
    }
    c.fillText(text, transformX(xp), transformY(yp));
    // c.setTransform(postTransform);
  };

  const getIndexBaseX = (i: number) => i * baseWidth + baseX;

  let level: 0 | 1 | 2 | 3 = 0;
  /* 0: full name */
  /* 1: 3 letter name */
  /* 2: 1 letter name */
  /* 3: rects */
  let dynamicFontSize = 24;
  if (isProtein) {
    const fontRange = tuple(4, 48, 200);
    const maxFontSize = tuple(24, 80, 200);

    for (let _i = 0; _i < 2; _i += 1) {
      if (maxFontSize[level] * m.a <= maxFontSize[level] - fontRange[level]) {
        level += 1;
      }
    }
    dynamicFontSize = maxFontSize[level] * m.a;
    if (level === 2 && dynamicFontSize < 20) {
      level += 1;
    }
    if (level === 3) {
      dynamicFontSize = Math.max(6, dynamicFontSize);
    }
  } else {
    dynamicFontSize = 24 * m.a;
    if (dynamicFontSize <= 6) {
      level = 3;
    }
    if (level === 3) {
      dynamicFontSize = 6;
    }
  }

  // Chromatogram functions
  const GRAPH_PADDING = 5;
  const NORMALIZATION_WINDOW = 4;
  const relativeHeight = (height: number, yInterval: number) => {
    const topWithPadding = topAreaHeight - baseHeight / 2;
    const y = topWithPadding * (1 - height / yInterval);
    return y - topWithPadding;
  };

  const interpolatedXAxis = (peakLocations: number[]) => {
    const newAxis = [];
    for (let i = 0; i <= peakLocations.length; i++) {
      const interval = i > 0 ? peakLocations[i] - peakLocations[i - 1] : peakLocations[i];
      for (let iInt = 0; iInt < interval; iInt++) {
        const increment = iInt / interval;
        const newX = i + increment;
        newAxis.push(newX);
      }
      if (i === peakLocations.length) newAxis.push(i);
    }
    return newAxis;
  };

  const mostRelevantMax = (chromatogramData: ChromatogramData) => {
    const maxPhred = Math.max(...chromatogramData.phred);
    const maxReference = maxPhred - Math.sqrt(maxPhred);
    const peaks = (traceData: number[]) =>
      chromatogramData.peakLocations
        .map((location) => traceData[location])
        .filter((_, idx) => {
          const phreds = chromatogramData.phred;
          if (idx > NORMALIZATION_WINDOW || idx < phreds.length - NORMALIZATION_WINDOW) {
            let sum = 0;
            for (let i = idx - NORMALIZATION_WINDOW; i < idx + NORMALIZATION_WINDOW; i++) {
              sum += phreds[i];
            }
            const average = sum / (2 * NORMALIZATION_WINDOW);
            return average > maxReference;
          }
          return false;
        });

    const positionalCleaning = (traceData: number[]) =>
      chromatogramData.peakLocations
        .map((location) => traceData[location])
        .filter((_, idx) => {
          const phreds = chromatogramData.phred;
          return idx > phreds.length / 3 && idx < (2 * phreds.length) / 3;
        });

    const cleanData = [
      ...peaks(chromatogramData.aTrace),
      ...peaks(chromatogramData.cTrace),
      ...peaks(chromatogramData.gTrace),
      ...peaks(chromatogramData.tTrace)
    ];

    /* Fallback for low overall phred (low quality) data */
    const lessCleanData = [
      ...positionalCleaning(chromatogramData.aTrace),
      ...positionalCleaning(chromatogramData.cTrace),
      ...positionalCleaning(chromatogramData.gTrace),
      ...positionalCleaning(chromatogramData.tTrace)
    ];

    return cleanData.length > 0 ? Math.max(...cleanData) : Math.max(...lessCleanData);
  };

  const drawPhreds = ({ i, phred, yMax }: { i: number; phred: number; yMax: number }) => {
    const xStart = getIndexBaseX(i);
    if (!filterChromOptions.includes('phred')) return;
    const top = topAreaHeight + dynamicFontSize - m.f;
    const y = relativeHeight(phred, yMax);
    c.lineWidth = 1;
    c.strokeStyle = 'rgba(0, 0, 0, 0.075)';
    c.strokeRect(transformX(xStart), transformY(top), baseWidth * m.a, y);
  };

  const drawChromatogram = ({
    base,
    iInterpol,
    iNext,
    value,
    nextValue,
    top,
    yMax
  }: {
    base: string;
    iInterpol: number;
    iNext: number;
    value: number;
    nextValue: number;
    top: number;
    yMax: number;
  }) => {
    const padding = dynamicFontSize + GRAPH_PADDING;
    const x = (ix: number) => getIndexBaseX(ix) - baseWidth / 2;
    const y = (value: number) => (top - padding) * (1 - value / yMax) - m.f;
    const color = getBaseColor(isProtein, base);
    c.lineWidth = 1;
    c.strokeStyle = color;
    c.beginPath();
    c.moveTo(transformX(x(iInterpol)), transformY(y(value)));
    c.lineTo(transformX(x(iNext)), transformY(y(nextValue)));
    c.stroke();
  };

  const drawBase = ({
    base,
    i,
    top,
    align = 'start'
  }: {
    base: string;
    i: number;
    top: number;
    align?: 'start' | 'end' | 'center';
  }) => {
    const xStart = getIndexBaseX(i);

    const color = getBaseColor(isProtein, base);

    c.fillStyle = color;
    c.textBaseline = 'bottom';
    if (level === 3) {
      c.lineWidth = 1;
      c.strokeStyle = `rgba(0, 0, 0, ${Math.min(1, Math.max(baseWidth * m.a - 2, 0))})`;
      c.fillRect(transformX(xStart), transformY(top), baseWidth * m.a, dynamicFontSize);
      c.strokeRect(transformX(xStart), transformY(top), baseWidth * m.a, dynamicFontSize);
    } else {
      const _base = getBaseName(level, isProtein, base);
      c.font = getFont(dynamicFontSize, 'bold');
      drawNonScaledText(_base, xStart + baseWidth / 2, top, align, 'center');
    }
  };

  const fixedComplements: [number, number][] = [];

  const featureYStart = topAreaHeight + dynamicFontSize * 4 + carretHeight;
  const margin = 4;
  annotationLevels.forEach((annotationLevel, index) => {
    let y = featureYStart + index * (baseHeight + margin) + selectionLineMarginTop + selectionLineWidth;
    if (isProtein) {
      y =
        topAreaHeight +
        dynamicFontSize +
        selectionLineMarginTop +
        selectionLineWidth +
        index * (baseHeight + margin) +
        carretHeight +
        carretFontSize;
    }

    annotationLevel.forEach((feature, innerIndex) => {
      /* define color variables */
      let state: 'normal' | 'hovering' | 'clicked' = 'normal';

      const renderAsSequence = feature.displayAsSequence && level < 3;
      const rectHeight = renderAsSequence ? dynamicFontSize : baseHeight;

      if (feature.locations.length > 1) {
        const min = Math.min(...feature.locations.map((location) => location[0]));
        const max = Math.max(...feature.locations.map((location) => location[1]));
        const overOrigin = isSelectionOverOrigin({
          start: feature.locations[0][0],
          end: feature.locations[feature.locations.length - 1][1],
          antiClockwise: feature.direction === SeqAnnotationDirectionsEnum.REVERSE,
          state: 'selected'
        });
        if (overOrigin) {
          c.lineWidth = 1;
          c.strokeStyle = 'black';

          const drawLine = (x: number, i: number) => {
            c.lineTo(
              transformX(x + -15 / m.a + (i * 2) / m.a),
              transformY(y + rectHeight / 2 + (i % 2 === 0 ? -1 : 1) * 2)
            );
          };

          const squiggly = (x: number, direction: 'forward' | 'reverse') => {
            const iStart = direction === 'forward' ? 0 : 7;
            c.moveTo(
              transformX(x + -15 / m.a + (iStart * 2) / m.a),
              transformY(y + rectHeight / 2 + (iStart % 2 === 0 ? -1 : 1) * 2)
            );
            if (direction === 'forward') {
              for (let i = 1; i <= 7; i += 1) {
                drawLine(x, i);
              }
            } else {
              for (let i = 6; i >= 0; i -= 1) {
                drawLine(x, i);
              }
            }
          };

          c.beginPath();
          squiggly(0, 'forward');
          c.lineTo(transformX(0), transformY(y + rectHeight / 2));
          c.lineTo(transformX(min * baseWidth), transformY(y + rectHeight / 2));
          c.stroke();
          c.closePath();

          c.beginPath();
          squiggly(len * baseWidth + 17, 'reverse');
          c.lineTo(transformX(len * baseWidth), transformY(y + rectHeight / 2));
          c.lineTo(transformX(max * baseWidth), transformY(y + rectHeight / 2));
          c.stroke();
          c.closePath();
        } else {
          c.beginPath();
          c.moveTo(transformX(min * baseWidth), transformY(y + rectHeight / 2));
          c.lineTo(transformX(max * baseWidth), transformY(y + rectHeight / 2));
          c.lineWidth = 1;
          c.strokeStyle = 'black';
          c.stroke();
          c.closePath();
        }
      }

      feature.locations.forEach((outerLoc) => {
        let innerLocs: { loc: [number, number]; type?: 'head' | 'tail' }[] = [{ loc: outerLoc }];
        if (annotationIsOverOrigin(outerLoc, feature.direction)) {
          innerLocs = [
            {
              loc: tuple(outerLoc[0], len),
              type: feature.direction === SeqAnnotationDirectionsEnum.FORWARD ? 'tail' : 'head'
            },
            {
              loc: tuple(1, outerLoc[1]),
              type: feature.direction === SeqAnnotationDirectionsEnum.REVERSE ? 'tail' : 'head'
            }
          ];
        }

        innerLocs.forEach(({ loc, type }) => {
          const xStart = (loc[0] - 1) * baseWidth + baseX;
          const width = (Math.abs(loc[1] - loc[0]) + 1) * baseWidth;

          const x1 = xStart;
          const x2 = xStart + width;
          const y1 = y;
          const y2 = y + rectHeight;

          if (
            transformedMouseX >= xStart &&
            transformedMouseX <= xStart + width &&
            transformedMouseY >= y &&
            transformedMouseY <= y + rectHeight
          ) {
            renderStateRef.hoveringFeature = feature.id;
            state = 'hovering';
          } else {
            if (renderStateRef.hoveringFeature === feature.id) {
              renderStateRef.hoveringFeature = undefined;
            }
          }
          if (renderStateRef.clickedFeatures.includes(feature.id)) {
            state = 'clicked';
          }

          const arrowLen = 8 / m.a >= width ? 0 : 8 / m.a;
          const wiggly = (side: 'right' | 'left') => {
            for (let i = 1; i <= 6; i += 1) {
              c.lineTo(
                transformX(
                  (side === 'right' ? x2 : x1) + (side === 'right' ? -1 : 1) * (i % 2 === 1 ? 4 / m.a : 0)
                ),
                transformY(y2 - (i * rectHeight) / 6)
              );
            }
          };
          const arrow = (side: 'left' | 'right', direction: 'left' | 'right') => {
            c.strokeStyle = 'rgba(100, 100, 100, 1)';
            let x = side === 'left' ? x1 : x2;
            const op = direction === 'left' ? -1 : 1;
            if (side + direction === 'leftright') {
              x -= 36 / m.a;
            } else if (side + direction === 'rightleft') {
              x += 36 / m.a;
            }

            c.lineWidth = 1;

            c.beginPath();
            c.moveTo(transformX(x + op * (8 / m.a)), transformY(y1 + (rectHeight * 1) / 4));
            c.lineTo(transformX(x + op * (8 / m.a)), transformY(y2 - (rectHeight * 1) / 4));

            c.stroke();
            c.closePath();

            c.beginPath();
            c.moveTo(transformX(x + op * (8 / m.a)), transformY(y2 - (rectHeight * 1) / 4));
            c.lineTo(transformX(x + op * (24 / m.a)), transformY(y2 - (rectHeight * 1) / 4));
            c.lineWidth = 1;
            c.stroke();
            c.closePath();

            c.beginPath();
            c.moveTo(transformX(x + op * (24 / m.a)), transformY(y2 - (rectHeight * 1) / 4));
            c.lineTo(
              transformX(x + op * (24 / m.a)),
              transformY(y2 - (rectHeight * 1) / 4 + (rectHeight * 1) / 6)
            );

            c.stroke();
            c.closePath();

            c.beginPath();
            c.moveTo(
              transformX(x + op * (24 / m.a)),
              transformY(y2 - (rectHeight * 1) / 4 + (rectHeight * 1) / 6)
            );
            c.lineTo(transformX(x + op * (32 / m.a)), transformY(y2 - rectHeight / 2));
            c.lineTo(
              transformX(x + op * (24 / m.a)),
              transformY(y1 + (rectHeight * 1) / 4 - (rectHeight * 1) / 6)
            );
            c.lineWidth = 1;
            c.stroke();
            c.closePath();

            c.beginPath();
            c.moveTo(
              transformX(x + op * (24 / m.a)),
              transformY(y1 + (rectHeight * 1) / 4 - (rectHeight * 1) / 6)
            );
            c.lineTo(transformX(x + op * (24 / m.a)), transformY(y1 + (rectHeight * 1) / 4));

            c.stroke();
            c.closePath();

            c.beginPath();
            c.moveTo(transformX(x + op * (24 / m.a)), transformY(y1 + (rectHeight * 1) / 4));
            c.lineTo(transformX(x + op * (8 / m.a)), transformY(y1 + (rectHeight * 1) / 4));
            c.lineWidth = 1;
            c.stroke();
            c.closePath();
          };
          if (type === 'tail') {
            if (feature.direction === SeqAnnotationDirectionsEnum.REVERSE) {
              /* arrow */
              arrow('left', 'left');
              c.beginPath();
              c.moveTo(transformX(x2), transformY(y1));
              c.lineTo(transformX(x2), transformY(y2));
              c.lineTo(transformX(x1), transformY(y2));
              wiggly('left');
              c.closePath();
            } else {
              arrow('right', 'right');
              c.beginPath();
              c.moveTo(transformX(x1), transformY(y1));
              c.lineTo(transformX(x1), transformY(y2));
              c.lineTo(transformX(x2), transformY(y2));
              wiggly('right');
              c.lineTo(transformX(x2), transformY(y1));
              c.closePath();
            }
          } else if (type === 'head') {
            if (feature.direction === SeqAnnotationDirectionsEnum.FORWARD) {
              arrow('left', 'right');
              c.beginPath();
              c.moveTo(transformX(x1), transformY(y1));
              c.lineTo(transformX(x2 - arrowLen), transformY(y1));
              c.lineTo(transformX(x2), transformY(y1 + rectHeight / 2));
              c.lineTo(transformX(x2 - arrowLen), transformY(y2));
              c.lineTo(transformX(x1), transformY(y2));
              wiggly('left');
              c.closePath();
            } else if (feature.direction === SeqAnnotationDirectionsEnum.REVERSE) {
              arrow('right', 'left');
              c.beginPath();
              c.moveTo(transformX(x1 + arrowLen), transformY(y1));
              c.lineTo(transformX(x1), transformY(y1 + rectHeight / 2));
              c.lineTo(transformX(x1 + arrowLen), transformY(y2));
              c.lineTo(transformX(x2), transformY(y2));
              wiggly('right');
              c.closePath();
            }
          } else if (
            feature.direction === undefined ||
            feature.direction === SeqAnnotationDirectionsEnum.NOT_DEFINED
          ) {
            c.beginPath();
            c.moveTo(transformX(x1), transformY(y1));
            c.lineTo(transformX(x1), transformY(y2));
            c.lineTo(transformX(x2), transformY(y2));
            c.lineTo(transformX(x2), transformY(y1));
            c.closePath();
          } else if (feature.direction === SeqAnnotationDirectionsEnum.FORWARD) {
            c.beginPath();
            c.moveTo(transformX(x1), transformY(y1));
            c.lineTo(transformX(x2 - arrowLen), transformY(y1));
            c.lineTo(transformX(x2), transformY(y1 + rectHeight / 2));
            c.lineTo(transformX(x2 - arrowLen), transformY(y2));
            c.lineTo(transformX(x1), transformY(y2));
            c.closePath();
          } else if (feature.direction === SeqAnnotationDirectionsEnum.REVERSE) {
            c.beginPath();
            c.moveTo(transformX(x1 + arrowLen), transformY(y1));
            c.lineTo(transformX(x1), transformY(y1 + rectHeight / 2));
            c.lineTo(transformX(x1 + arrowLen), transformY(y2));
            c.lineTo(transformX(x2), transformY(y2));
            c.lineTo(transformX(x2), transformY(y1));
            c.closePath();
          }
          if (!renderAsSequence) {
            c.fillStyle = feature.color;
            c.fill();
          } else {
            c.fillStyle = 'white';
            c.fill();
          }
          c.lineWidth = 1;
          c.strokeStyle = 'rgba(100, 100, 100, 1)';
          c.stroke();

          /* must be before clip */
          c.save();
          c.clip();
          //#region clip
          // text
          if (state === 'hovering' || state === 'clicked') {
            c.strokeStyle = 'black';
            c.stroke();
          }

          if (!renderAsSequence) {
            const text = String(feature.displayLabel || feature.label);
            c.font = getFont(12, 'bold');
            const twidth = measureNonScaledText(text);
            const textColor = getTextColor(feature.color);
            c.fillStyle = textColor;
            if (twidth / m.a > width - 4 / m.a) {
              drawNonScaledText(text, xStart + 2, y + rectHeight / 2, 'center', 'start');
            } else {
              drawNonScaledText(
                text,
                Math.min(
                  Math.max(xStart + width / 2, xStartTransformed + 8 / m.a + twidth / m.a / 2),
                  xEndTransformed - 8 / m.a - twidth / m.a / 2
                ),
                y + rectHeight / 2,
                'center',
                'center'
              );
            }
          } else {
            for (let i = loc[0] - 1; i < loc[1]; i += 1) {
              drawBase({ base: sequence[i], i, top: y });
            }
          }
          c.restore();
          //#endregion
          const tag = feature.rightTag;
          if (tag) {
            c.fillStyle = 'black';
            drawNonScaledText(String(tag), xStart + width + 4 / m.a, y + rectHeight / 2, 'center', 'start');
          }

          maybeRenderOligo(feature, loc, len, (i: number, base: string) => {
            drawBase({ base, i, top: y + (rectHeight - dynamicFontSize) / 2, align: 'start' });
          });

          if (feature.type === 'DNA_RE_NUC') {
            const reverse = feature.direction === SeqAnnotationDirectionsEnum.REVERSE;
            const startBase = loc[0];
            const endBase = loc[1];
            const start = startBase - 1;
            const end = endBase;
            const sites = feature.cleavageSites;
            const startCutSite = sites[0];
            const endCutSite = sites[sites.length - 1];
            let startComplement = startCutSite[1];
            let endComplenent = endCutSite[1];
            if (sites.length === 1) {
              startComplement = startCutSite[0];
              endComplenent = startCutSite[1];
            }
            const _start = reverse ? end - startComplement : start + startComplement;
            const _end = reverse ? end - endComplenent : start + endComplenent;

            const fixedComplement: [number, number] = reverse ? [_end, _start] : [_start, _end];
            fixedComplements.push(fixedComplement);
            for (let i = fixedComplement[0]; i < fixedComplement[1]; i += 1) {
              let index = i;
              if (index < 0) {
                index = len + i;
              }
              drawBase({
                base: getNtComplement(sequence[index]),
                i: index,
                top: topAreaHeight + dynamicFontSize * 2 + selectionLineMarginTop
              });
            }
            sites.forEach((site) => {
              const [forwardCut, reverseCut] = site;
              const la0 = reverse ? end - reverseCut : start + forwardCut;
              const [lx1, ly1] = [la0 * baseWidth, topAreaHeight + dynamicFontSize * 1];
              const [lx2, ly2] = [la0 * baseWidth, topAreaHeight + dynamicFontSize * 2];

              c.strokeStyle = state === 'hovering' || state === 'clicked' ? 'red' : 'black';
              c.lineWidth = 3;
              c.beginPath();
              c.lineTo(transformX(lx1), transformY(ly1));
              c.lineTo(transformX(lx2), transformY(ly2));

              const ra0 = reverse ? end - forwardCut : start + reverseCut;

              c.lineTo(transformX(ra0 * baseWidth), transformY(topAreaHeight + dynamicFontSize * 2));
              {
                const [x3, y3] = [ra0 * baseWidth, topAreaHeight + dynamicFontSize * 3];
                c.strokeStyle = state === 'hovering' || state === 'clicked' ? 'red' : 'black';
                c.lineTo(transformX(x3), transformY(y3));
                c.stroke();
                c.closePath();
              }
            });
          }
        });
      });
    });
  });

  for (let i = windowStart; i < Math.min(windowLen + 1, sequence.length); i += 1) {
    const xStart = getIndexBaseX(i);
    if (xStart + baseWidth < xStartTransformed || xStart > xEndTransformed) {
      continue;
    }

    drawBase({ base: sequence[i], i, top: topAreaHeight - m.f + (isProtein ? 0 : dynamicFontSize) });
    const gap = 48 / (baseWidth * m.a);

    const numberOfIndicators = Math.floor(iLen / gap);

    const mod = Math.max(Math.floor(iLen / numberOfIndicators), 1);

    const drawIndicator = () => {
      c.fillStyle = 'black';
      c.font = getFont(12, 'normal');
      drawNonScaledText(String(i + 1), xStart + baseWidth / 2, topAreaHeight - m.f, 'end', 'center');
    };
    if (i === 0 || i === iLen) {
      drawIndicator();
    } else if (i % mod === 0 && i > mod * 0.7 && i < len - mod * 0.7) {
      drawIndicator();
    }
  }
  c.restore(); // restore clip area

  if (searchResults.length > 0) {
    searchResults.forEach((searchResult) => {
      const { start, end } = searchResult;
      let a0 = start * baseWidth;
      let a1 = end * baseWidth;
      let y = topAreaHeight;

      if (!isProtein) {
        y += dynamicFontSize;
      }

      if (searchResult.complement && !isProtein) {
        y += dynamicFontSize + selectionLineWidth;
        for (let index = start; index < end; index += 1) {
          drawBase({
            base: getNtComplement(sequence[index]),
            i: index,
            top: y
          });
        }
      }
      const opacity = Math.min(Math.max(1 - m.a, 0.4), 0.8);
      c.fillStyle = `rgba(255,151,0, ${opacity})`;
      if (searchResult.active) {
        c.fillStyle = `rgba(0, 0, 255, ${opacity})`;
      }
      c.beginPath();
      c.moveTo(transformX(a0), transformY(y));
      c.lineTo(transformX(a1), transformY(y));
      c.lineTo(transformX(a1), transformY(y + dynamicFontSize));
      c.lineTo(transformX(a0), transformY(y + dynamicFontSize));
      c.closePath();
      c.fill();
    });
  }

  const arrowSize = Math.max(Math.min(dynamicFontSize / 3, 8), 4);
  const top = topAreaHeight + dynamicFontSize * (isProtein ? 1 : 2) + selectionLineMarginTop;

  circularSelection.forEach((circularSelection) => {
    let lineLeft = circularSelection.start;
    let lineRight = circularSelection.end + 1;
    if (circularSelection.antiClockwise === true) {
      lineLeft = circularSelection.end;
      lineRight = circularSelection.start + 1;
    }
    let lineLeftPx = lineLeft * baseWidth;
    let lineRightPx = lineRight * baseWidth;
    if (circularSelection.antiClockwise === false) {
      lineRightPx -= arrowSize / m.a;
    }
    if (circularSelection.antiClockwise === true) {
      lineLeftPx += arrowSize / m.a;
    }
    let _top = top - m.f;
    if (circularSelection.antiClockwise === true && !isProtein) {
      _top += dynamicFontSize;
    }
    c.beginPath();
    c.moveTo(transformX(lineLeftPx), transformY(_top));
    c.lineTo(transformX(lineRightPx), transformY(_top));
    c.lineWidth = selectionLineWidth;
    c.strokeStyle = 'black';
    c.fillStyle = 'black';
    c.stroke();
    c.closePath();
    c.beginPath();
    if (circularSelection.antiClockwise === true) {
      c.moveTo(transformX(lineLeftPx), transformY(_top - arrowSize));
      c.lineTo(transformX(lineLeftPx - arrowSize / m.a), transformY(_top));
      c.lineTo(transformX(lineLeftPx), transformY(_top + arrowSize));
    }
    if (circularSelection.antiClockwise === false) {
      c.moveTo(transformX(lineRightPx), transformY(_top - arrowSize));
      c.lineTo(transformX(lineRightPx + arrowSize / m.a), transformY(_top));
      c.lineTo(transformX(lineRightPx), transformY(_top + arrowSize));
    }
    c.closePath();
    c.fill();

    const renderCodon = (tripplet: string, left: number, topOffset: number) => {
      const aa = codons[tripplet] || 'X';
      const color = getAaColor(aa);
      c.fillStyle = color;
      c.strokeStyle = `rgba(0, 0, 0, ${Math.min(1, Math.max(baseWidth * m.a - 2, 0))})`;
      c.beginPath();
      c.lineWidth = 1;
      c.rect(transformX(left * baseWidth), transformY(top + topOffset), 3 * baseWidth * m.a, dynamicFontSize);
      c.fill();
      c.stroke();
      c.closePath();
      c.font = getFont(dynamicFontSize, 'bold');
      c.fillStyle = shouldInvertColor(aa) ? '#c8d9fa' : '#282c34';
      c.textBaseline = 'top';
      if (level <= 2) {
        drawNonScaledText(aa, (left + 1.5) * baseWidth, top + topOffset, 'start', 'center');
      }
    };

    let tripplet = '';
    if (!isProtein) {
      if (circularSelection.antiClockwise === true) {
        for (let i = circularSelection.start; i >= circularSelection.end; i -= 1) {
          const complementBase = getNtComplement(sequence[i]);
          drawBase({ base: complementBase, i, top: top - m.f });
          tripplet += complementBase;
          if (tripplet.length === 3) {
            renderCodon(tripplet, i, dynamicFontSize - m.f);
            tripplet = '';
          }
        }
      } else if (circularSelection.antiClockwise === false) {
        for (let i = circularSelection.start; i <= circularSelection.end; i += 1) {
          tripplet += sequence[i];
          if (tripplet.length === 3) {
            renderCodon(tripplet, i - 2, dynamicFontSize - m.f);
            tripplet = '';
          }
        }
      }
    }

    const { end, start, antiClockwise } = circularSelection;

    const label = getSelectionLabel(circularSelection);

    c.font = getFont(16, 'bold');
    c.fillStyle = 'black';
    c.textBaseline = 'top';

    const caretMid = getIndexMid(start, end, len, antiClockwise);
    let _yOffset = dynamicFontSize * 2;
    if (antiClockwise) {
      _yOffset = dynamicFontSize * 4;
    }
    if (isProtein) {
      _yOffset = dynamicFontSize;
    }
    drawNonScaledText(
      label,
      caretMid * baseWidth + baseWidth / 2,
      topAreaHeight + _yOffset + selectionLineWidth + selectionLineMarginTop - m.f,
      'start',
      'center'
    );
  });

  //#region caret
  const caretx = Math.min(Math.max(transformedMouseX, 0), len * baseWidth);
  const i = Math.max(Math.min(Math.floor(caretx / baseWidth), iLen), 0);
  const selectionOver = getSelectionOver(i, circularSelection);
  let complement = false;
  if (selectionOver && selectionOver.antiClockwise === true) {
    complement = true;
  }
  const base = topAreaHeight + selectionLineMarginTop + selectionLineWidth;
  let ca = base + dynamicFontSize + (complement ? dynamicFontSize : 0);
  let cb = base + dynamicFontSize * 2 + (complement ? dynamicFontSize : 0);
  let cc =
    base +
    dynamicFontSize * 2 +
    (complement
      ? (getSelectionDelta(len, true, selectionOver!.start, selectionOver!.end) >= 3 ? 2 : 1) *
        dynamicFontSize
      : 0);
  if (isProtein) {
    ca = base + dynamicFontSize;
    cb = base + dynamicFontSize + carretHeight;
    cc = base + dynamicFontSize + carretHeight;
  }
  c.beginPath();
  c.moveTo(transformX(caretx), transformY(ca) - m.f);
  c.lineTo(transformX(caretx), transformY(cb) - m.f);
  c.lineWidth = 3;
  c.strokeStyle = 'rgba(0, 0, 0, 0.5)';
  c.stroke();
  c.closePath();
  c.font = getFont(carretFontSize, 'bold');
  c.fillStyle = 'black';

  drawNonScaledText(String(i + 1), caretx, cc - m.f, 'start', 'center');

  if (chromatogramData) {
    const peakLocations = chromatogramData.peakLocations;
    const phreds = chromatogramData.phred;

    for (let i = 0; i < phreds.length; i++) {
      const yMax = Math.max(...phreds);
      drawPhreds({ i, phred: phreds[i], yMax });
    }

    Object.entries(chromatogramData)
      .filter(([key, _]) => key.includes('Trace') && filterChromOptions.includes(key.charAt(0).toUpperCase()))
      .forEach(([key, data]) => {
        if (typeof data === 'string' || !key.includes('Trace')) return;
        const traceData = data;
        const baseForPlot = key.charAt(0).toUpperCase();
        const interpolAxis = interpolatedXAxis(peakLocations);
        const yMax = mostRelevantMax(chromatogramData);
        for (let i = 0; i < interpolAxis.length; i++) {
          drawChromatogram({
            base: baseForPlot,
            iInterpol: interpolAxis[i],
            iNext: interpolAxis[i + 1],
            value: traceData[i],
            nextValue: traceData[i + 1],
            top,
            yMax
          });
        }
      });
  }

  //#endregion

  c.restore();
  return renderStateRef;
};
