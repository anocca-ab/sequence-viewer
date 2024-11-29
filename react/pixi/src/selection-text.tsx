import { getIndexMid, getSelectionLabel } from '@anocca/sequence-viewer-utils';
import React from 'react';
import type { TextStyleOptions } from 'pixi.js';
import { CanvasTextMetrics, TextStyle } from 'pixi.js';
import { CircularText } from './circular-text';
import { minFontSize } from './constants';
import { useRenderData } from './context';
import { useArrowHeight } from './sequence';
import { useBaseAngle } from './use-base-angle';
import { useFontSize } from './use-font-size';
import { useGetCoordinates } from './use-get-coordinates';

/**
 * Draw selection label, e.g. "134-156 selected"
 */
export const SelectionText = React.memo(function SelectionText() {
  const components: JSX.Element[] = [];

  const { updateProps, circularProps } = useRenderData();

  const { w, circularSelection, sequence } = updateProps;

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY } = circularProps;

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

      const style: TextStyleOptions = { fontWeight: 'bold', textBaseline: 'bottom' };

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
