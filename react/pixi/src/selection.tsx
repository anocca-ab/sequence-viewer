import { type CircularSelection } from '@anocca/sequence-viewer-utils';
import React from 'react';
// import { DrawCallback } from "@pixi/react/src/typedefs/DrawCallback";
import { getIndexMid, getSelectionLabel } from '@anocca/sequence-viewer-utils';
import type { TextStyleOptions } from 'pixi.js';
import { CircularText } from './circular-text';
import { minFontSize, renderAngleOffset } from './constants';
import { useAgk } from './context';
import { useBaseAngle } from './use-base-angle';
import { useFontSize } from './use-font-size';
import { useGetCoordinates } from './use-get-coordinates';
import { Arc } from './sequence';

export const useArrowHeight = () => {
  const [fontSize, constrainedFontSize] = useFontSize();

  /* black line of selection under the letter in the circle */
  const arrowHeight = Math.max(constrainedFontSize * 0.5, 8);
  return arrowHeight;
};

export const Selections = React.memo(function Selections() {
  const { w, circularSelections: circularSelection, sequence, circularProperties, circularCamera } = useAgk();
  const components: JSX.Element[] = [];
  const arrowHeight = useArrowHeight();
  const [fontSize, constrainedFontSize] = useFontSize();

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY } = circularProperties;

  /* black line of selection under the letter in the circle */

  const getCoordinates = useGetCoordinates();

  const xStart = w / 2;

  const getBaseAngle = useBaseAngle();

  circularSelection.forEach((selection, index) => {
    let arrowRadius = radius;
    if (selection.antiClockwise) {
      arrowRadius = radius + constrainedFontSize + arrowHeight / 2;
    } else {
      arrowRadius = radius - arrowHeight / 2;
    }
    const startAngle = getBaseAngle(selection.start);
    const endAngle = getBaseAngle(selection.end);

    let start = startAngle.a0;
    let end = endAngle.a1;
    let arrowStart = end;
    let arrowDirection = 1;

    if (selection.antiClockwise) {
      start = endAngle.a0;
      end = startAngle.a1;
      arrowStart = start;
      arrowDirection = -1;
    }

    components.push(
      <graphics
        key={`selection-line-[${selection.start}-${selection.end}]`}
        draw={(g) => {
          g.clear();
          g.setStrokeStyle({
            color: 'red',
            width: Math.max(arrowHeight * 0.1, 2)
          });
          g.beginPath();
          g.arc(xStart, circleY, arrowRadius, start + renderAngleOffset, end + renderAngleOffset, false);
          g.stroke();
          g.closePath();

          if (Math.abs(selection.start - selection.end) > 1) {
            // Draw the triangle at the end of the arrow
            g.beginPath();
            const [x1, y1] = getCoordinates(arrowRadius - arrowHeight / 2, arrowStart);
            const [x2, y2] = getCoordinates(
              arrowRadius,
              arrowStart + (arrowHeight / (2 * radius)) * arrowDirection
            );
            const [x3, y3] = getCoordinates(arrowRadius + arrowHeight / 2, arrowStart);

            g.moveTo(x1, y1); /* top */
            g.lineTo(x2, y2); /* point */
            g.lineTo(x3, y3); /* bottom */
            g.closePath();
            g.fillStyle = 'black';
            g.fill();
          }
        }}
      />
    );

    if (selection.antiClockwise) {
      if (selection.start < selection.end) {
        for (let i = len - 1; i >= selection.end; i -= 1) {
          const index = (i + len) % len;
          components.push(<Arc key={`selection-arc-${index}`} i={index} complement />);
        }
        for (let i = selection.start; i >= 0; i -= 1) {
          const index = (i + len) % len;
          components.push(<Arc key={`selection-arc-${index}`} i={index} complement />);
        }
      } else {
        for (let i = selection.start; i >= selection.end; i -= 1) {
          const index = (i + len) % len;
          components.push(<Arc key={`selection-arc-${index}`} i={index} complement />);
        }
      }
    }
  });
  return (
    <>
      {components}
      <SelectionText />
    </>
  );
});

/**
 * Draw selection label, e.g. "134-156 selected"
 */
export const SelectionText = React.memo(function SelectionText() {
  const components: JSX.Element[] = [];

  const { w, circularSelections: circularSelection, sequence, circularProperties } = useAgk();

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY } = circularProperties;

  const [fontSize, constrainedFontSize] = useFontSize();

  const arrowHeight = useArrowHeight();

  if (fontSize > minFontSize) {
    circularSelection.forEach((circularSelection) => {
      const { end, start, antiClockwise } = circularSelection;

      const caretMid = getIndexMid(start, end, len, antiClockwise);

      const angle = caretMid * angleDelta + angleOffset;

      const label = getSelectionLabel(circularSelection, false, sequence.length);

      let _yOffset = constrainedFontSize * 2;
      if (antiClockwise) {
        _yOffset = constrainedFontSize * 3;
      }

      const style: TextStyleOptions = { fontWeight: 'bold', textBaseline: 'bottom', align: 'center' };

      let r = radius;
      if (antiClockwise) {
        r += constrainedFontSize + arrowHeight;
      } else {
        r -= constrainedFontSize + arrowHeight;
      }

      components.push(
        <React.Fragment key={`selection-text-${caretMid}`}>
          {/* <graphics ></graphics> */}
          <CircularText text={label} radius={r} angle={angle} fontSize={constrainedFontSize} style={style} />
        </React.Fragment>
      );
    });
  }

  return <>{components}</>;
});
