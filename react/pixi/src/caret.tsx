import { isInSelection } from '@anocca/sequence-viewer-utils';
import type { Graphics } from 'pixi.js';
import { CircularText } from './circular-text';
import { useCodonMargin } from './codons';
import { useAgk } from './context';
import { useArrowHeight } from './selection';
import { useBaseAngle } from './use-base-angle';
import { useFontSize } from './use-font-size';
import { useGetCoordinates } from './use-get-coordinates';

export const Caret = () => {
  const {
    w,
    circularSelections: circularSelection,
    sequence,
    annotationLevels,
    circularProperties,
    circularCamera,
    setCircluarCamera
  } = useAgk();

  const { mouseAngle, radius, len, hoveringCaretPosition } = circularProperties;

  const getCoordinates = useGetCoordinates();
  const getBaseAngle = useBaseAngle();
  const [fontSize, constrainedFontSize] = useFontSize();

  const lineStart: number = radius + fontSize;
  let lineEnd: number = radius;

  const arrowHeight = useArrowHeight();

  const codonMargin = useCodonMargin();

  circularSelection.forEach(({ antiClockwise, start, end }, index) => {
    const selection = {
      antiClockwise: Boolean(antiClockwise),
      start: antiClockwise ? start + 1 : start - 1,
      end: antiClockwise ? end - 1 : end + 1
    };

    if (selection.start < 0) {
      selection.start = len - 1;
    } else if (selection.start >= len) {
      selection.start = 0;
    }
    if (selection.end < 0) {
      selection.end = len - 1;
    } else if (selection.end >= len) {
      selection.end = 0;
    }

    const i = hoveringCaretPosition;

    if (isInSelection(hoveringCaretPosition, selection)) {
      // hovering over selection
      if (selection.antiClockwise) {
        lineEnd -= fontSize + codonMargin(true) + fontSize;
      } else {
        lineEnd -= arrowHeight + fontSize;
      }
    }
  });

  const step = (Math.PI * 2) / len;

  // const a = step * Math.round(mouseAngle / step);
  const a = getBaseAngle(hoveringCaretPosition).aMid;

  const drawCaret = (g: Graphics) => {
    const [lineX1, lineY1] = getCoordinates(lineStart, a);
    const [lineX2, lineY2] = getCoordinates(lineEnd, a);
    g.clear();
    g.setStrokeStyle({
      color: 'rgba(0, 0, 0, 0.5)',
      width: 1
    });
    g.beginPath();
    g.moveTo(lineX1, lineY1);
    g.lineTo(lineX2, lineY2);
    g.stroke();
    g.closePath();
  };

  // g.font = getFont(16, 'bold');
  // g.fillStyle = 'black';
  // g.textBaseline = 'top';
  // drawText(String(hoveringCaretPosition + 1), textStart, mouseAngle - 1.5 / textStart, 'center');

  return (
    <>
      <graphics draw={drawCaret} />
      <CircularText
        text={String(hoveringCaretPosition + 1)}
        radius={lineEnd}
        angle={a}
        fontSize={16}
        style={{ fill: 'black', textBaseline: 'top', align: 'center' }}
      />
    </>
  );
};
