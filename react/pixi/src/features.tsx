import type { Annotation } from '@anocca/sequence-viewer-utils';
import {
  getIndexMid,
  getSelectionDeltaAngle,
  getTextColor,
  maybeRenderOligo,
  renderSequenceInSelectionRange,
  SeqAnnotationDirectionsEnum
} from '@anocca/sequence-viewer-utils';
import React, { useState } from 'react';
import type { Graphics } from 'pixi.js';
import { CircularText } from './circular-text';
import { minFontSize, renderAngleOffset } from './constants';
import { useRenderData } from './context';
import { Arc, Base, useBasePairMarkerRadius } from './sequence';
import { useBaseAngle } from './use-base-angle';
import { useFontSize } from './use-font-size';
import { useGetCoordinates } from './use-get-coordinates';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const c: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d')!;

function useRenderAsSequence() {
  const [fontSize, constrainedFontSize] = useFontSize();
  const renderAsSequence = (feature: Annotation) => {
    return fontSize > 5 && feature.displayAsSequence;
  };
  return renderAsSequence;
}

export const Features = React.memo(function Features() {
  const fixedComplements: [number, number][] = [];
  const components: JSX.Element[] = [];

  const { updateProps, circularProps } = useRenderData();
  // circularProps.clickedFeatures;

  const { w, circularSelection, sequence, annotationLevels, renderStateRef } = updateProps;
  const data = updateProps.data;

  const { zoom: zoomProgress, radius: radiusProgress } = data.circluarCamera.value;

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY, mouseRadius } = circularProps;

  const inScreen = Math.floor(w / minFontSize);

  const factor = Math.ceil(inScreen / len);

  const xStart = w / 2;

  const getCoordinates = useGetCoordinates();

  const getBaseAngle = useBaseAngle();

  const [fontSize, constrainedFontSize] = useFontSize();

  /* START @features */

  let hoveringFeature: string | undefined;
  const levels = annotationLevels;
  const { lineInnerRadius, lineOuterRadius, outerRadius } = useBasePairMarkerRadius();

  let levelRadius = outerRadius;
  const renderAsSequence = useRenderAsSequence();

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
      components.push(
        <Feature
          key={feature.id}
          feature={feature}
          height={height}
          innerRadius={innerRadius}
          setHoveringFeature={(id) => {
            hoveringFeature = id;
          }}
        />
      );
    });
  });
  renderStateRef.hoveringFeature = hoveringFeature;
  /* END @features */

  return <>{components}</>;
});

const Feature = React.memo(function Feature({
  feature,
  height,
  innerRadius,
  setHoveringFeature
}: {
  feature: Annotation;
  innerRadius: number;
  height: number;
  setHoveringFeature: (featureId: string) => void;
}) {
  const fixedComplements: [number, number][] = [];
  const components: JSX.Element[] = [];

  const { updateProps, circularProps } = useRenderData();
  // circularProps.clickedFeatures;

  const { w, circularSelection, sequence, annotationLevels, renderStateRef } = updateProps;
  const data = updateProps.data;

  const { zoom: zoomProgress, radius: radiusProgress } = data.circluarCamera.value;

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY, mouseRadius } = circularProps;

  const inScreen = Math.floor(w / minFontSize);

  const factor = Math.ceil(inScreen / len);

  const xStart = w / 2;

  const getCoordinates = useGetCoordinates();

  const getBaseAngle = useBaseAngle();

  const renderAsSequence = useRenderAsSequence();

  const [fontSize, constrainedFontSize] = useFontSize();
  const locs = feature.locations;

  if (locs.length > 1) {
    const start = locs[0][0] - 1;
    const end = locs[locs.length - 1][1];
    const a0 = start * angleDelta + angleOffset + renderAngleOffset - angleDelta / 2;
    const a1 = end * angleDelta + angleOffset + renderAngleOffset - angleDelta / 2;

    components.push(
      <graphics
        key={`feature-${feature.id} - multi`}
        draw={(g) => {
          g.clear();
          g.beginPath();
          g.setStrokeStyle({
            width: 1,
            color: 'black'
          });
          g.arc(
            xStart,
            circleY,
            innerRadius + height / 2,
            a0,
            a1,
            feature.direction === SeqAnnotationDirectionsEnum.REVERSE
          );
          g.stroke();
          g.closePath();
        }}
      />
    );
  }

  const outerRadius = innerRadius + height;

  locs.forEach((location, index) => {
    let state: 'normal' | 'hovering' | 'clicked' = 'normal';

    components.push(
      <MainFeatureLabel
        key={`feature-${feature.id}-${index}`}
        location={location}
        innerRadius={innerRadius}
        height={height}
        feature={feature}
        setHoveringFeature={setHoveringFeature}
        setState={(newState) => {
          state = newState;
        }}
      />
    );
    const text = String(feature.displayLabel || feature.label);
    const startBase = location[0];
    const endBase = location[1];
    const start = startBase - 1;
    const end = endBase;
    const a0 = start * angleDelta + angleOffset;
    const a1 = end * angleDelta + angleOffset;

    const featureOrbitSequenceRadius = (outerRadius + innerRadius) / 2 + constrainedFontSize / 2;
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
              components.push(
                <Base i={i} radius={featureOrbitSequenceRadius} base={base} key={`feature-orbit-base-${i}`} />
              );
            }
          }
        : {
            onRenderBase: (i: number) => {
              components.push(
                <Base i={i} radius={featureOrbitSequenceRadius} key={`feature-orbit-base-${i}`} />
              );
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
    const o = renderAngleOffset - angleDelta / 2;
    if (tag) {
      components.push(
        <CircularText
          text={tag}
          radius={outerRadius - height / 2}
          angle={a1 + o + Math.PI / 2}
          style={{ textBaseline: 'middle', fontWeight: 'bold', fill: 'black' }}
          fontSize={12}
        />
      );
      // drawText(String(tag), outerRadius - height / 2, a1 + o + Math.PI / 2, 'right');
    }
    maybeRenderOligo(feature, location, len, (i: number, base: string) => {
      components.push(
        <Base i={i} radius={featureOrbitSequenceRadius} base={base} key={`feature-orbit-base-${i}`} />
      );
      // drawBase({
      //   i,
      //   radius: featureOrbitSequenceRadius,
      //   base
      // });
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
        components.push(<Arc key={`arc-${index}`} i={index} />);
        // drawArc(index, true);
      }
      sites.forEach((site) => {
        const [forwardCut, reverseCut] = site;
        const lStart = reverse ? end - reverseCut : start + forwardCut;
        const { a0: la0, a1 } = getBaseAngle(lStart);
        c.strokeStyle = state === 'hovering' || state === 'clicked' ? 'red' : 'black';
        c.lineWidth = 3;
        c.beginPath();
        if (forwardCut > reverseCut) {
          const [lx1, ly1] = getCoordinates(radius, la0);
          c.lineTo(lx1, ly1);
          const [lx2, ly2] = getCoordinates(radius - constrainedFontSize, la0);
          c.lineTo(lx2, ly2);
        } else {
          const [lx1, ly1] = getCoordinates(radius, la0);
          c.lineTo(lx1, ly1);
          const [lx2, ly2] = getCoordinates(radius - constrainedFontSize, la0);
          c.lineTo(lx2, ly2);
        }

        const rStart = reverse ? end - forwardCut : start + reverseCut;
        const { a0: ra0 } = getBaseAngle(rStart);
        c.arc(
          xStart,
          circleY,
          radius - constrainedFontSize * 1.125 - 1.5,
          la0 + renderAngleOffset,
          ra0 + renderAngleOffset,
          forwardCut > reverseCut
        );
        if (forwardCut > reverseCut) {
          const [x3, y3] = getCoordinates(radius - constrainedFontSize * 2.5, ra0);
          c.lineTo(x3, y3);
        } else {
          const [x3, y3] = getCoordinates(radius - constrainedFontSize * 2.5, ra0);
          c.lineTo(x3, y3);
        }
        c.strokeStyle = state === 'hovering' || state === 'clicked' ? 'red' : 'black';
        c.stroke();
        c.closePath();
      });
    }
  });

  return <>{components}</>;
});

function MainFeatureLabel({
  feature,
  location,
  innerRadius,
  height,
  setHoveringFeature,
  setState
}: {
  feature: Annotation;
  location: [number, number];
  innerRadius: number;
  height: number;
  setHoveringFeature: (featureId: string) => void;
  setState: (state: 'normal' | 'hovering' | 'clicked') => void;
}) {
  const components: JSX.Element[] = [];

  const { updateProps, circularProps } = useRenderData();
  // circularProps.clickedFeatures;

  const { w, circularSelection, sequence, annotationLevels, renderStateRef } = updateProps;
  const data = updateProps.data;

  const { zoom: zoomProgress, radius: radiusProgress } = data.circluarCamera.value;

  const xStart = w / 2;

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY, mouseRadius } = circularProps;

  const text = String(feature.displayLabel || feature.label);
  const startBase = location[0];
  const endBase = location[1];
  const start = startBase - 1;
  const end = endBase;
  const a0 = start * angleDelta + angleOffset;
  const a1 = end * angleDelta + angleOffset;

  const getCoordinates = useGetCoordinates();

  let state: 'normal' | 'hovering' | 'clicked' = 'normal';
  const outerRadius = innerRadius + height;
  if (
    mouseRadius <= outerRadius &&
    mouseRadius >= innerRadius &&
    isAngleInRange(hoveringCaretPosition, Math.min(start, end), Math.max(start, end), end < start)
  ) {
    state = 'hovering';
    setHoveringFeature(feature.id);
  }
  if (renderStateRef.clickedFeatures.includes(feature.id)) {
    state = 'clicked';
  }
  const backgroundColor = feature.color;
  let borderColor = 'rgb(0, 0, 0, 0.25)';
  if (state === 'hovering' || state === 'clicked') {
    borderColor = 'rgb(0, 0, 0)';
  }

  const renderAsSequence = useRenderAsSequence();

  const radians = getSelectionDeltaAngle(len, false, start, end) * outerRadius * Math.PI * 2;

  const [mask, setMask] = useState<Graphics | null>(null);

  const draw = (g: Graphics) => {
    g.clear();
    g.save();
    g.fillStyle = backgroundColor;
    g.setStrokeStyle({ color: borderColor, width: 1 });
    g.beginPath();
    const o = renderAngleOffset - angleDelta / 2;
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
        g.arc(xStart, circleY, outerRadius, a0 + o, a1 + o - arrowOffsetOuter, false);
        if (radians >= 16) {
          const [x, y] = getCoordinates(innerRadius + height / 2, a1 - angleDelta / 2);
          g.lineTo(x, y);
        }
        g.arc(xStart, circleY, innerRadius, a1 + o - arrowOffsetInner, a0 + o, true);
      } else {
        const [x, y] = getCoordinates(innerRadius + height / 2, a0 - angleDelta / 2);
        g.moveTo(x, y);
        g.arc(xStart, circleY, outerRadius, a0 + o + arrowOffsetOuter, a1 + o, false);

        g.arc(xStart, circleY, innerRadius, a1 + o, a0 + o + arrowOffsetInner, true);
      }
    } else {
      // No Arrow for direction of the annotation if NOT_UNDEFINED
      g.arc(xStart, circleY, outerRadius, a0 + o, a1 + o, false);
      g.arc(xStart, circleY, innerRadius, a1 + o, a0 + o, true);
    }
    g.closePath();
    if (renderAsSequence(feature)) {
      g.fillStyle = 'white';
      g.fill();
      g.fillStyle = backgroundColor;
    } else {
      g.fill();
    }
    g.stroke();
  };

  // components.push(<graphics key={`feature-${feature.id}-mask`} ref={setMask} draw={draw} />);
  components.push(<graphics key={`feature-${feature.id}`} draw={draw} />);

  const textColor = getTextColor(backgroundColor);
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

    const seqToAngle = (n: number) => n + angleOffset - angleDelta / 2;

    // c.font = getFont(12, 'bold');
    // c.textBaseline = 'middle';
    components.push(
      <container mask={mask} key={`feature-label-${feature.id}`}>
        <graphics key={`feature-${feature.id}-mask`} ref={setMask} draw={draw} />
        <CircularText
          key={`feature-label-${feature.id}`}
          text={text}
          radius={outerRadius - height / 2}
          angle={seqToAngle(textMid)}
          style={{
            fontWeight: 'bold',
            textBaseline: 'middle',
            fill: textColor
          }}
          fontSize={12}
        />
      </container>
    );
    // drawText(text, outerRadius - height / 2, seqToAngle(textMid));
  };
  if (!renderAsSequence(feature) && radians >= 16) {
    drawFeatureLabel(radius > w / 2);
  }
  return <>{components}</>;
}

/* inclusive to left, inclusive to right */
function isAngleInRange(angle: number, start: number, end: number, antiClockwise?: boolean) {
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
}
