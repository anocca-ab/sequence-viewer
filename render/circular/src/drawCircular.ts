import {
  RenderData,
  CircularSelection,
  Annotations,
  SeqAnnotationDirectionsEnum,
  getTextColor,
  DrawFunction,
  isInSelection,
  isSelectionOverOrigin,
  getSelectionOver,
  getSelectionDeltaAngle,
  getIndexMid,
  maybeRenderOligo,
  Annotation,
  tuple,
  getNtComplement,
  shouldInvertColor,
  getFont,
  getNtColor,
  getAaColor,
  getSelectionLabel,
  renderSequenceInSelectionRange
} from '@anocca/sequence-viewer-utils';
import { getCircleProperties } from './circularHelpers';

/* inclusive to left, inclusive to right */
const isAngleInRange = (angle: number, start: number, end: number, antiClockwise?: boolean) => {
  if (end > start && antiClockwise === false) {
    return angle >= start && angle <= end;
  } else if (end < start && antiClockwise === false) {
    return angle >= start || angle <= end;
  } else if (end < start && antiClockwise === true) {
    return angle >= end && angle <= start;
  } else if (end > start && antiClockwise === true) {
    return angle >= end || angle <= start;
  }
  return angle >= start && angle <= end;
};

/**
 * Will render the circular sequence with annotations and caret.
 *
 * See: {@link @anocca/sequence-viewer-utils#DrawFunction | DrawFunction}
 *
 * @public
 */
export const drawCircular: DrawFunction = ({
  c,
  w,
  h,
  ratio,
  data,
  sequence,
  circularSelection,
  searchResults,
  annotationLevels,
  renderStateRef,
  codons
}) => {
  c.save();
  c.resetTransform();

  /* retina display scaling */
  c.scale(ratio, ratio);

  c.clearRect(0, 0, w, h);

  /* create functions */

  const xStart = w / 2;

  const { zoom: zoomProgress, radius: radiusProgress } = data.circluarCamera.value;

  const renderAngleOffset = -Math.PI / 2;

  const {
    circleY,
    angleDelta,
    angleOffset,
    radius,
    len,
    iLen,
    mouseAngle,
    hoveringCaretPosition,
    mouseRadius
  } = getCircleProperties({
    data,
    sequence,
    w,
    h,
    circularSelection
  });

  const getCoordinates = (radius: number, angle: number) => {
    const x = xStart + radius * Math.cos(angle + renderAngleOffset);
    const y = circleY + radius * Math.sin(angle + renderAngleOffset);
    return tuple(x, y);
  };

  const getVerticalLine = (radius1: number, radius2: number, angle: number) => {
    const [x1, y1] = getCoordinates(radius1, angle);
    const [x2, y2] = getCoordinates(radius2, angle);
    return tuple(x1, y1, x2, y2);
  };

  const drawText = (
    text: string,
    radius: number,
    angle: number,
    align: 'left' | 'center' | 'right' = 'center'
  ) => {
    const textWidth = c.measureText(text).width;
    if (text.length < 3 || text.length > 100) {
      const t = c.getTransform();
      const [x, y] = getCoordinates(radius, angle);
      let offset = -textWidth / 2;
      if (align === 'left') {
        offset = 0;
      } else if (align === 'right') {
        offset = textWidth;
      }
      c.translate(x, y);
      c.rotate(angle);
      c.fillText(text, offset, 0);
      c.setTransform(t);
    } else {
      const spanningAngle = textWidth / radius;
      let startAngle = angle - spanningAngle / 2;
      if (align === 'left') {
        startAngle = angle - spanningAngle;
      } else if (align === 'right') {
        startAngle = angle;
      }
      for (let i = 0; i < text.length; i += 1) {
        const progress = i === 0 ? 0 : c.measureText(text.slice(0, i)).width / textWidth;
        const letterAngle = startAngle + progress * spanningAngle;
        const [x, y] = getCoordinates(radius, letterAngle);
        const t = c.getTransform();
        c.translate(x, y);
        c.rotate(letterAngle);
        c.fillText(text[i], 0, 0);
        c.setTransform(t);
      }
    }
  };

  const fontSize = Math.max(Math.min((2 * radius * Math.PI) / len, 16), 0);

  const minFontSize = 4;
  const dynamicCircleHeight = fontSize > minFontSize ? fontSize : minFontSize;

  const getBaseAngle = (i: number) => {
    const a0 = i * angleDelta + angleOffset - angleDelta / 2;
    const aMid = i * angleDelta + angleOffset;
    const a1 = i * angleDelta + angleOffset + angleDelta / 2;

    return { a0, a1, aMid };
  };

  const drawBase = ({
    i,
    radius,
    complement,
    base: _base
  }: {
    i: number;
    radius: number;
    complement?: boolean;
    base?: string;
  }) => {
    const nt = _base || sequence[i];
    const { aMid } = getBaseAngle(i);
    const base = !complement ? nt : getNtComplement(nt);
    c.font = getFont(fontSize, 'bold');
    const color = getNtColor(base);

    c.fillStyle = color;
    c.textBaseline = 'top';
    drawText(base, radius, aMid);
  };

  //#region functions
  const drawArc = (i: number, complement: boolean) => {
    const { a0, a1, aMid } = getBaseAngle(i);

    {
      /* black line of selection under the letter in the circle */
      const drawSelection = (circularSelection: CircularSelection) => {
        let _yOffset = dynamicCircleHeight * 1.4;
        if (complement) {
          _yOffset = dynamicCircleHeight * 2.5;
        }

        c.lineWidth = 3;
        c.strokeStyle = 'black';
        c.beginPath();
        c.arc(xStart, circleY, radius - _yOffset, a0 + renderAngleOffset, a1 + renderAngleOffset, false);
        c.stroke();
        c.closePath();
        if (i === circularSelection.end && circularSelection.antiClockwise !== undefined) {
          // Draw the triangle at the end of the arrow
          c.beginPath();
          if (circularSelection.antiClockwise === true) {
            const [x1, y1] = getCoordinates(radius - _yOffset - dynamicCircleHeight / 2, a0);
            const [x2, y2] = getCoordinates(radius - _yOffset, a0 - dynamicCircleHeight / (2 * radius));
            const [x3, y3] = getCoordinates(radius - _yOffset + dynamicCircleHeight / 2, a0);

            c.moveTo(x1, y1); /* top */
            c.lineTo(x2, y2); /* point */
            c.lineTo(x3, y3); /* bottom */
          }
          if (circularSelection.antiClockwise === false) {
            const [x1, y1] = getCoordinates(radius - _yOffset - dynamicCircleHeight / 2, a1);
            const [x2, y2] = getCoordinates(radius - _yOffset, a1 + dynamicCircleHeight / (2 * radius));
            const [x3, y3] = getCoordinates(radius - _yOffset + dynamicCircleHeight / 2, a1);

            c.moveTo(x1, y1); /* top */
            c.lineTo(x2, y2); /* point */
            c.lineTo(x3, y3); /* bottom */
          }
          c.closePath();
          c.fillStyle = 'black';
          c.fill();
        }
      };
      const selection = getSelectionOver(i, circularSelection);
      if (selection) {
        drawSelection(selection);
      }
    }

    /* draw base pair indicator, like 1, 1500, 3000, 4500 in a 6000 bp sequence */
    const drawMarker = () => {
      const topCaret = getVerticalLine(radius + 2, radius + 8, aMid);
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(topCaret[0], topCaret[1]);
      c.lineTo(topCaret[2], topCaret[3]);
      c.closePath();
      c.strokeStyle = 'black';
      c.stroke();

      c.font = getFont(16, 'normal');
      c.fillStyle = 'black';
      c.textBaseline = 'bottom';
      drawText(String(i + 1), radius + 8, aMid);
    };

    let interval = Math.floor(len / 4);
    if (zoomProgress > 0.25) {
      interval = Math.floor(len / 8);
    }
    if (radiusProgress > 0) {
      interval = Math.floor(len / 16);
    }
    const mod = i % interval;
    if (mod === 0 && (i + interval / 2) % len >= interval / 2) {
      drawMarker();
    }

    /* draw the letter, the base */
    const drawScaledBase = (complement: boolean) => {
      let _yOffset = 0;
      if (complement) {
        _yOffset = dynamicCircleHeight * 1.25;
      }
      if (fontSize > minFontSize) {
        drawBase({
          i,
          radius: radius - minFontSize / 2 - _yOffset,
          complement
        });
      } else {
        const [x1, y1] = getCoordinates(radius - _yOffset, a0);
        const [x2, y2] = getCoordinates(radius - _yOffset, a1);
        const [x3, y3] = getCoordinates(radius - _yOffset - minFontSize, a1);
        const [x4, y4] = getCoordinates(radius - _yOffset - minFontSize, a0);

        c.strokeStyle = 'black';
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x2, y2);
        c.lineTo(x3, y3);
        c.lineTo(x4, y4);
        c.closePath();
        const color = getNtColor(complement ? getNtComplement(sequence[i] as any) : sequence[i]);
        c.fillStyle = color;
        c.fill();
      }
    };
    drawScaledBase(false);
    if (complement) {
      drawScaledBase(true);
    }
  };
  //#endregion

  /* selection */
  if (fontSize > minFontSize) {
    circularSelection.forEach((circularSelection) => {
      /* draw selection, e.g. 134-156 selected */
      /* START @selection */
      const { end, start, antiClockwise } = circularSelection;

      const caretMid = getIndexMid(start, end, len, antiClockwise);

      const angle = caretMid * angleDelta + angleOffset;

      const label = getSelectionLabel(circularSelection, false);

      c.font = getFont(fontSize, 'bold');
      c.fillStyle = 'black';
      c.textBaseline = 'top';
      let _yOffset = dynamicCircleHeight * 2;
      if (antiClockwise) {
        _yOffset = dynamicCircleHeight * 3;
      }

      drawText(label, radius - _yOffset - 16, angle);
      /* END @selection */
    });
  }

  const fixedComplements: [number, number][] = [];

  {
    /* START @features */
    const renderAsSequence = (feature: Annotation) => {
      return fontSize > 5 && feature.displayAsSequence;
    };
    let hoveringFeature: string | undefined;
    const seqToAngle = (n: number) => n + angleOffset - angleDelta / 2;
    const levels = annotationLevels;
    const sequenceMargin = 36;
    let levelRadius = radius + sequenceMargin;
    levels.forEach((level, index) => {
      let height = 0;
      level.forEach((feature) => {
        const featureHeight = renderAsSequence(feature) ? fontSize : 14;
        height = Math.max(height, featureHeight);
      });
      const margin = 4;
      const innerRadius = levelRadius;
      levelRadius += height + margin;
      level.forEach((feature) => {
        const locs = feature.locations;

        if (locs.length > 1) {
          const start = locs[0][0] - 1;
          const end = locs[locs.length - 1][1];
          const a0 = start * angleDelta + angleOffset + renderAngleOffset - angleDelta / 2;
          const a1 = end * angleDelta + angleOffset + renderAngleOffset - angleDelta / 2;

          c.beginPath();
          c.arc(
            xStart,
            circleY,
            innerRadius + height / 2,
            a0,
            a1,
            feature.direction === SeqAnnotationDirectionsEnum.REVERSE
          );
          c.lineWidth = 1;
          c.strokeStyle = 'black';
          c.stroke();
          c.closePath();
        }

        locs.forEach((location) => {
          const text = String(feature.displayLabel || feature.label);
          const startBase = location[0];
          const endBase = location[1];
          const start = startBase - 1;
          const end = endBase;
          const a0 = start * angleDelta + angleOffset;
          const a1 = end * angleDelta + angleOffset;
          let state: 'normal' | 'hovering' | 'clicked' = 'normal';
          const outerRadius = innerRadius + height;
          if (
            mouseRadius <= outerRadius &&
            mouseRadius >= innerRadius &&
            isAngleInRange(hoveringCaretPosition, Math.min(start, end), Math.max(start, end), end < start)
          ) {
            state = 'hovering';
            hoveringFeature = feature.id;
          }
          if (renderStateRef.clickedFeatures.includes(feature.id)) {
            state = 'clicked';
          }
          const backgroundColor = feature.color;
          let borderColor = 'rgb(0, 0, 0, 0.25)';
          if (state === 'hovering' || state === 'clicked') {
            borderColor = 'rgb(0, 0, 0)';
          }

          c.save();
          c.fillStyle = backgroundColor;
          c.strokeStyle = borderColor;
          c.lineWidth = 1;
          c.beginPath();
          const o = renderAngleOffset - angleDelta / 2;
          const radians = getSelectionDeltaAngle(len, false, start, end) * outerRadius * Math.PI * 2;
          if (
            feature.direction === SeqAnnotationDirectionsEnum.FORWARD ||
            feature.direction === SeqAnnotationDirectionsEnum.REVERSE
          ) {
            /* to make arrow, convert 8px into an angle */
            const maxAngle = 0.2 * Math.abs(end - start) * angleDelta;

            let arrowOffsetOuter = Math.min(Math.min(8 / outerRadius, maxAngle), 0.1 * radians);
            let arrowOffsetInner = Math.min(Math.min(8 / innerRadius, maxAngle), 0.1 * radians);
            if (radians < 16) {
              arrowOffsetOuter = 0;
              arrowOffsetInner = 0;
            }
            if (feature.direction === SeqAnnotationDirectionsEnum.FORWARD) {
              c.arc(xStart, circleY, outerRadius, a0 + o, a1 + o - arrowOffsetOuter, false);
              if (radians >= 16) {
                const [x, y] = getCoordinates(innerRadius + height / 2, a1 - angleDelta / 2);
                c.lineTo(x, y);
              }
              c.arc(xStart, circleY, innerRadius, a1 + o - arrowOffsetInner, a0 + o, true);
            } else {
              const [x, y] = getCoordinates(innerRadius + height / 2, a0 - angleDelta / 2);
              c.moveTo(x, y);
              c.arc(xStart, circleY, outerRadius, a0 + o + arrowOffsetOuter, a1 + o, false);

              c.arc(xStart, circleY, innerRadius, a1 + o, a0 + o + arrowOffsetInner, true);
            }
          } else {
            // No Arrow for direction of the annotation if NOT_UNDEFINED
            c.arc(xStart, circleY, outerRadius, a0 + o, a1 + o, false);
            c.arc(xStart, circleY, innerRadius, a1 + o, a0 + o, true);
          }
          c.closePath();
          if (renderAsSequence(feature)) {
            c.fillStyle = 'white';
            c.fill();
            c.fillStyle = backgroundColor;
          } else {
            c.fill();
          }
          c.stroke();
          c.clip();
          const textColor = getTextColor(backgroundColor);
          c.fillStyle = textColor;
          const mid = getIndexMid(Math.min(start, end), Math.max(start, end), len, end < start) * angleDelta;
          const visibleSequence =
            outerRadius * 2 < w
              ? Math.PI * 2
              : (Math.PI * 2 * Math.asin(Math.min(w / (2 * outerRadius), 1))) / Math.PI;
          const sequenceMid = (((Math.PI * 2 - angleOffset) % (Math.PI * 2)) / (Math.PI * 2)) * Math.PI * 2;
          const lastIndex = Math.PI * 2;
          const startSequence = (sequenceMid - visibleSequence / 2 + lastIndex + angleDelta) % lastIndex;
          const endSequence = (sequenceMid + visibleSequence / 2 + lastIndex) % lastIndex;
          const drawFeatureLabel = (zoomed = false) => {
            const textWidth = c.measureText(text).width;
            const spanningAngle = textWidth / (outerRadius - height / 2);
            let textMid = mid;
            if (zoomed) {
              let paddedMid = mid;
              let paddedStartSequence = startSequence;
              let paddedEndSequence = endSequence;
              if (startSequence > Math.PI && endSequence > Math.PI && mid < Math.PI) {
                /* mid to the right of origin, camera to left of origin */
                /* BEGIN */
                /* make everything big number */
                paddedMid = mid + Math.PI * 2;
                /* END */
                /*  */
              } else if (startSequence < Math.PI && endSequence < Math.PI && mid < Math.PI) {
                /* mid to the left of origin, camera to left of origin */
                /* BEGIN */
                /* we dont have to pad here */
                //
                /* END */
                /*  */
              } else if (startSequence < Math.PI && endSequence < Math.PI && mid > Math.PI) {
                /* mid to the left of origin, camera to right of origin */
                /* BEGIN */
                /* we use small numbers */
                paddedMid = mid - Math.PI * 2;
                /* END */
                /*  */
              } else if (startSequence > Math.PI && endSequence > Math.PI && mid > Math.PI) {
                /* mid to the right of origin, camera to right of origin */
                /* BEGIN */
                /* we dont have to pad here */
                /* --- */
                /* END */
                /*  */
              } else if (startSequence > Math.PI && endSequence < Math.PI && mid < Math.PI) {
                /* mid to the right of origin, camera over origin */
                /* BEGIN */
                /* make camera start small */
                paddedStartSequence = startSequence - Math.PI * 2;
                /* --- */
                /* END */
                /*  */
              } else if (startSequence > Math.PI && endSequence < Math.PI && mid > Math.PI) {
                /* mid to the left of origin, camera over origin */
                /* BEGIN */
                /* make camera end mid */
                paddedEndSequence = endSequence + Math.PI * 2;
                /* --- */
                /* END */
                /*  */
              }
              if (paddedMid - spanningAngle / 2 < paddedStartSequence) {
                textMid = startSequence + spanningAngle / 2;
              } else if (paddedMid + spanningAngle / 2 > paddedEndSequence) {
                textMid = endSequence - spanningAngle / 2;
              }
            }
            c.font = getFont(12, 'bold');
            c.textBaseline = 'middle';
            drawText(text, outerRadius - height / 2, seqToAngle(textMid));
          };
          if (!renderAsSequence(feature) && radians >= 16) {
            drawFeatureLabel(radius > w / 2);
          }
          c.restore(); // restore clip
          const featureOrbitSequenceRadius = (outerRadius + innerRadius) / 2 + dynamicCircleHeight / 2;
          const renderSequnceInFeatureOrbit = ({
            startIndex,
            endIndex,
            sequence
          }: {
            startIndex: number;
            endIndex: number;
            sequence?: string;
          }) => {
            const props = sequence
              ? {
                  sequence,
                  onRenderBase: (i: number, base: string) => {
                    drawBase({
                      i,
                      radius: featureOrbitSequenceRadius,
                      base
                    });
                  }
                }
              : {
                  onRenderBase: (i: number) => {
                    drawBase({
                      i,
                      radius: featureOrbitSequenceRadius
                    });
                  }
                };
            renderSequenceInSelectionRange({
              len,
              startIndex,
              endIndex,
              ...props
            });
          };
          if (renderAsSequence(feature)) {
            /* over the origin */
            const startIndex = location[0] - 1;
            const endIndex = location[1] - 1;
            renderSequnceInFeatureOrbit({ startIndex, endIndex });
          }
          const tag = feature.rightTag;
          if (tag) {
            c.fillStyle = 'black';
            c.font = getFont(12, 'bold');
            c.textBaseline = 'middle';
            drawText(String(tag), outerRadius - height / 2, a1 + o + Math.PI / 2, 'right');
          }
          maybeRenderOligo(feature, location, len, (i: number, base: string) => {
            drawBase({
              i,
              radius: featureOrbitSequenceRadius,
              base
            });
          });
          if (feature.type === 'DNA_RE_NUC') {
            const reverse = feature.direction === SeqAnnotationDirectionsEnum.REVERSE;
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

            const fixedComplement = [_start, _end].sort((a, b) => a - b) as [number, number];
            fixedComplements.push(fixedComplement);
            for (let i = fixedComplement[0]; i < fixedComplement[1]; i += 1) {
              let index = i;
              if (index < 0) {
                index = len + i;
              }
              drawArc(index, true);
            }
            sites.forEach((site) => {
              let [forwardCut, reverseCut] = site;
              let lStart = reverse ? end - reverseCut : start + forwardCut;
              const { a0: la0, a1 } = getBaseAngle(lStart);
              c.strokeStyle = state === 'hovering' || state === 'clicked' ? 'red' : 'black';
              c.lineWidth = 3;
              c.beginPath();
              if (forwardCut > reverseCut) {
                const [lx1, ly1] = getCoordinates(radius, la0);
                c.lineTo(lx1, ly1);
                const [lx2, ly2] = getCoordinates(radius - dynamicCircleHeight, la0);
                c.lineTo(lx2, ly2);
              } else {
                const [lx1, ly1] = getCoordinates(radius, la0);
                c.lineTo(lx1, ly1);
                const [lx2, ly2] = getCoordinates(radius - dynamicCircleHeight, la0);
                c.lineTo(lx2, ly2);
              }

              let rStart = reverse ? end - forwardCut : start + reverseCut;
              const { a0: ra0 } = getBaseAngle(rStart);
              c.arc(
                xStart,
                circleY,
                radius - dynamicCircleHeight * 1.125 - 1.5,
                la0 + renderAngleOffset,
                ra0 + renderAngleOffset,
                forwardCut > reverseCut
              );
              {
                if (forwardCut > reverseCut) {
                  const [x3, y3] = getCoordinates(radius - dynamicCircleHeight * 2.5, ra0);
                  c.lineTo(x3, y3);
                } else {
                  const [x3, y3] = getCoordinates(radius - dynamicCircleHeight * 2.5, ra0);
                  c.lineTo(x3, y3);
                }
                c.strokeStyle = state === 'hovering' || state === 'clicked' ? 'red' : 'black';
                c.stroke();
                c.closePath();
              }
            });
          }
        });
      });
    });
    renderStateRef.hoveringFeature = hoveringFeature;
    /* END @features */
  }
  {
    /* START @search */
    if (searchResults.length > 0) {
      searchResults.forEach((searchResult) => {
        const { start, end } = searchResult;
        let a0 = start * angleDelta + angleOffset + renderAngleOffset - angleDelta / 2;
        let a1 = end * angleDelta + angleOffset + renderAngleOffset - angleDelta / 2;
        let yOffset = 0;

        const searchRadius = radius * getSelectionDeltaAngle(len, false, start, end) * Math.PI * 2;
        if (searchRadius < 8) {
          const buffer = (8 - searchRadius) / 2 / radius;
          a0 -= buffer;
          a1 += buffer;
        }

        if (searchResult.complement) {
          for (let index = start; index < end; index += 1) {
            drawArc(index, true);
          }
          yOffset = -dynamicCircleHeight * 1.2;
        }
        c.beginPath();
        c.arc(xStart, circleY, radius + yOffset, a0, a1, false);
        c.arc(xStart, circleY, radius - Math.max(8, dynamicCircleHeight * 1.2) + yOffset, a1, a0, true);
        c.closePath();
        const opacity = Math.min(Math.max(1 - zoomProgress, 0.4), 0.8);
        c.fillStyle = `rgba(255,151,0, ${opacity})`;
        if (searchResult.active) {
          c.fillStyle = `rgba(0, 0, 255, ${opacity})`;
        }
        // 'rgba(255,151,0,0.4)'
        c.fill();
      });
    }
    /* END @search */
  }

  {
    /* @CODONS */
    /* codon stuff 1 */

    const renderCodon = (iMid: number, codonNt: string, isComplement: boolean) => {
      if (fontSize <= minFontSize) {
        return;
      }
      c.lineWidth = 1;
      const aa = codons[codonNt] || 'X';
      const color = getAaColor(aa);
      const { a0: a0 } = getBaseAngle(iMid - 1);
      const { a1: a1 } = getBaseAngle(iMid + 1);
      const codonRadius = radius - (isComplement ? 2.6 : -1.5) * dynamicCircleHeight;

      c.beginPath();
      const o = renderAngleOffset;
      c.arc(xStart, circleY, codonRadius, a0 + o, a1 + o, false);
      c.arc(xStart, circleY, codonRadius - dynamicCircleHeight, a1 + o, a0 + o, true);
      c.closePath();
      c.fillStyle = color;
      c.strokeStyle = 'black';
      c.fill();
      c.stroke();

      c.font = getFont(fontSize, 'bold');
      c.fillStyle = shouldInvertColor(aa) ? '#c8d9fa' : '#282c34';
      c.textBaseline = 'top';
      const { aMid } = getBaseAngle(iMid);
      if (fontSize > minFontSize) {
        drawText(aa, codonRadius, aMid);
      }
    };

    /* codon stuff 2 */
    const inScreen = Math.floor(w / minFontSize);
    const factor = Math.ceil(inScreen / len);
    let triplet = '';
    const addToTriplet = (i: number, circularSelection: CircularSelection) => {
      triplet += circularSelection.antiClockwise ? getNtComplement(sequence[i] as any) : sequence[i];
      if (triplet.length === 3) {
        let midIndex = i + (circularSelection.antiClockwise ? 1 : -1);
        if (midIndex === -1) {
          midIndex = iLen;
        }
        renderCodon(midIndex, triplet, !!circularSelection.antiClockwise);
        triplet = '';
      }
    };

    /* loop throu the circle */
    if ((2 * radius * Math.PI) / len > minFontSize) {
      /* reduced when zoomed in */
      const start = hoveringCaretPosition - inScreen;
      const end = hoveringCaretPosition + inScreen;

      for (let i = start; i < end; i += 1) {
        const index = (i + len * factor) % len;
        const selection = getSelectionOver(index, circularSelection);
        drawArc(index, selection?.antiClockwise === true);
      }
    } else {
      for (let i = 0; i < len; i += 1) {
        const selection = getSelectionOver(i, circularSelection);
        drawArc(i, selection?.antiClockwise === true);
      }
    }

    circularSelection.forEach((circularSelection) => {
      triplet = '';
      if (isSelectionOverOrigin(circularSelection)) {
        if (circularSelection.antiClockwise) {
          for (let i = circularSelection.start; i >= 0; i -= 1) {
            addToTriplet(i, circularSelection);
          }
          for (let i = iLen; i >= circularSelection.end; i -= 1) {
            addToTriplet(i, circularSelection);
          }
        } else {
          for (let i = circularSelection.start; i < len; i += 1) {
            addToTriplet(i, circularSelection);
          }
          for (let i = 0; i <= circularSelection.end; i += 1) {
            addToTriplet(i, circularSelection);
          }
        }
      } else {
        if (circularSelection.antiClockwise) {
          for (let i = circularSelection.start; i >= circularSelection.end; i -= 1) {
            addToTriplet(i, circularSelection);
          }
        } else {
          for (let i = circularSelection.start; i <= circularSelection.end; i += 1) {
            addToTriplet(i, circularSelection);
          }
        }
      }
    });
    /* END @CODONS */
  }

  {
    /* @CARET */
    const drawCaret = (lineStart: number, lineEnd: number, textStart: number) => {
      const [lineX1, lineY1] = getCoordinates(lineStart, mouseAngle);
      const [lineX2, lineY2] = getCoordinates(lineEnd, mouseAngle);
      c.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      c.lineWidth = 3;
      c.beginPath();
      c.moveTo(lineX1 - 1.5, lineY1);
      c.lineTo(lineX2 - 1.5, lineY2);
      c.stroke();
      c.closePath();
      c.font = getFont(16, 'bold');
      c.fillStyle = 'black';
      c.textBaseline = 'top';
      drawText(String(hoveringCaretPosition + 1), textStart, mouseAngle - 1.5 / textStart, 'center');
    };

    let yOffset = 0;
    let hasComplement = false;
    let hasCodon = false;
    let hasComplementBecauseOfSelection = false;

    const isSelecting = circularSelection.find((cs) => cs.state === 'selecting');
    const selectionAtCaret = getSelectionOver(hoveringCaretPosition, circularSelection);
    if (isSelecting?.state === 'selecting') {
      if (isSelecting.antiClockwise) {
        hasComplement = true;
        hasComplementBecauseOfSelection = true;
      }
      if (Math.abs(isSelecting.start - isSelecting.end) >= 2) {
        hasCodon = true;
      }
    }
    if (selectionAtCaret) {
      if (Math.abs(selectionAtCaret.start - selectionAtCaret.end) >= 2) {
        hasCodon = true;
      }
      if (selectionAtCaret.antiClockwise) {
        hasComplement = true;
        hasComplementBecauseOfSelection = true;
      }
    }
    if (
      fixedComplements.some(([start, end]) => {
        return isInSelection(hoveringCaretPosition, {
          start,
          end,
          antiClockwise: false
        });
      })
    ) {
      // hasComplement = true;
    }
    const yOffsetFactor = 1.4;
    let textOffset = 1.2;
    if (hasCodon && hasComplementBecauseOfSelection) {
      textOffset = 2.7;
    }
    if (hasComplement) {
      yOffset += dynamicCircleHeight * yOffsetFactor;
    }
    drawCaret(
      radius - yOffset,
      radius - yOffset - dynamicCircleHeight * 1.125,
      radius - yOffset - dynamicCircleHeight * textOffset
    );
  }

  c.restore();
  return renderStateRef;
};
