import {
  getAaColor,
  getNtComplement,
  isSelectionOverOrigin,
  shouldInvertColor,
  type CircularSelection
} from '@anocca/sequence-viewer-utils';
import React from 'react';
import { CircularText } from './circular-text';
import { minFontSize, renderAngleOffset } from './constants';
import { useAgk } from './context';
import { useBaseAngle } from './use-base-angle';
import { useFontSize } from './use-font-size';

export const Codons = React.memo(function Codons() {
  const components: JSX.Element[] = [];

  const { w, circularSelections: circularSelection, sequence, codons, circularProperties, circularCamera } = useAgk();

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY, iLen } = circularProperties;

  const [fontSize, constrainedFontSize] = useFontSize();

  const xStart = w / 2;

  const getBaseAngle = useBaseAngle();

  const renderCodon = (iMid: number, codonNt: string, isComplement: boolean) => {
    components.push(
      <Codon key={`codon-${iMid}`} iMid={iMid} codonNt={codonNt} isComplement={isComplement} />
    );
  };

  let triplet = '';
  const addToTriplet = (i: number, circularSelection: CircularSelection) => {
    triplet += circularSelection.antiClockwise ? getNtComplement(sequence[i]) : sequence[i];
    if (triplet.length === 3) {
      let midIndex = i + (circularSelection.antiClockwise ? 1 : -1);
      if (midIndex === -1) {
        midIndex = iLen;
      }
      renderCodon(midIndex, triplet, Boolean(circularSelection.antiClockwise));
      triplet = '';
    }
  };

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
    } else if (circularSelection.antiClockwise) {
      for (let i = circularSelection.start; i >= circularSelection.end; i -= 1) {
        addToTriplet(i, circularSelection);
      }
    } else {
      for (let i = circularSelection.start; i <= circularSelection.end; i += 1) {
        addToTriplet(i, circularSelection);
      }
    }
  });

  return <>{components}</>;
});

const Codon = React.memo(function Codon({
  iMid,
  codonNt,
  isComplement
}: {
  iMid: number;
  codonNt: string;
  isComplement: boolean;
}) {
  const { circularProperties, w, circularSelections: circularSelection, sequence, codons, circularCamera } = useAgk();
  const { zoom: zoomProgress, radius: radiusProgress } = circularCamera.value;

  const { radius, len, hoveringCaretPosition, angleDelta, angleOffset, circleY, iLen } = circularProperties;
  const [fontSize, constrainedFontSize] = useFontSize();

  const xStart = w / 2;

  const aa = codons[codonNt] || 'X';
  const color = getAaColor(aa);

  const getBaseAngle = useBaseAngle();

  const { a0 } = getBaseAngle(iMid - 1);
  const { a1 } = getBaseAngle(iMid + 1);

  let codonRadius = radius;
  if (isComplement) {
    codonRadius -= constrainedFontSize + Math.min(constrainedFontSize - (minFontSize - 2), 4);
  } else {
    codonRadius += constrainedFontSize * 2 + Math.min(constrainedFontSize - (minFontSize - 1), 4);
  }

  const { aMid } = getBaseAngle(iMid);

  return (
    <>
      <graphics
        draw={(g) => {
          g.clear();
          g.setStrokeStyle({
            width: 1,
            color: 'black'
          });
          g.beginPath();
          const o = renderAngleOffset;
          g.arc(xStart, circleY, codonRadius, a0 + o, a1 + o, false);
          g.arc(xStart, circleY, codonRadius - constrainedFontSize, a1 + o, a0 + o, true);
          g.closePath();
          g.fillStyle = color;
          g.fill();
          if (fontSize >= minFontSize) {
            g.stroke();
          }
        }}
      />
      {fontSize >= minFontSize && (
        <CircularText
          fontSize={fontSize}
          style={{
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            textBaseline: 'top',
            fill: shouldInvertColor(aa) ? '#c8d9fa' : '#282c34',
            align: 'center'
          }}
          text={aa}
          radius={codonRadius}
          angle={aMid}
        />
      )}
    </>
  );
});
