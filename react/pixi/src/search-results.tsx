import { getSelectionDeltaAngle } from '@anocca/sequence-viewer-utils';
import React from 'react';
import { minFontSize, renderAngleOffset } from './constants';
import { useAgk } from './context';
import { Arc } from './sequence';
import { useFontSize } from './use-font-size';

export const SearchResults = React.memo(function SearchResults() {
  const {
    searchResults,
    circularProperties: { angleDelta, angleOffset, radius, len, circleY },
    w,
    circularCamera: {
      value: { zoom: zoomProgress }
    }
  } = useAgk();
  const components: JSX.Element[] = [];

  const [fontSize, constrainedFontSize] = useFontSize();

  const xStart = w / 2;

  searchResults.forEach((searchResult, index) => {
    const { start, end } = searchResult;
    components.push(
      <graphics
        key={`search-result-${index}-[${start}-${end}]`}
        draw={(c) => {
          c.clear();

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
              components.push(<Arc i={index} complement key={`complement-base-${index}`} />);
            }
            yOffset = -constrainedFontSize;
          }
          c.beginPath();
          c.arc(xStart, circleY, radius + yOffset, a0, a1, false);
          c.arc(
            xStart,
            circleY,
            radius + (fontSize < minFontSize ? minFontSize * 2 : fontSize) + yOffset,
            a1,
            a0,
            true
          );
          c.closePath();
          const opacity = Math.min(Math.max(1 - zoomProgress, 0.4), 0.8);
          c.fillStyle = `rgba(255,151,0, ${opacity})`;
          if (searchResult.active) {
            c.fillStyle = `rgba(0, 0, 255, ${opacity})`;
          }
          c.fill();
        }}
      />
    );
  });

  return <>{components}</>;
});
