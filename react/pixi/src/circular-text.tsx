import type { TextStyleOptions } from 'pixi.js';
import { CanvasTextMetrics, TextStyle } from 'pixi.js';
import React from 'react';
import { useGetCoordinates } from './use-get-coordinates';

export const CircularText = ({
  text,
  radius,
  angle,
  style,
  fontSize
}: {
  text: string;
  radius: number;
  angle: number;
  style: TextStyleOptions;
  fontSize: number;
}) => {
  if (text.length < 3) {
    return <TextBase radius={radius} angle={angle} text={text} style={style} fontSize={fontSize} />;
  }

  return <BentText text={text} radius={radius} angle={angle} style={style} fontSize={fontSize} />;
};

const useTextRadius = (radius: number, fontSize: number, textBaseline?: TextStyle['textBaseline']) => {
  let _radius = radius;
  if (textBaseline === 'top' || textBaseline === 'hanging') {
    // _radius -= CanvasTextMetrics.measureText(text, new TextStyle(style)).height / 2;
    _radius -= fontSize / 2;
  } else if (textBaseline === 'bottom' || textBaseline === 'alphabetic' || textBaseline === 'ideographic') {
    // _radius += CanvasTextMetrics.measureText(text, new TextStyle(style)).height / 2;
    _radius += fontSize / 2;
  }
  return _radius;
};

const TextBase = React.memo(function TextBase({
  text,
  angle,
  radius,
  style,
  fontSize
}: {
  text: string;
  angle: number;
  radius: number;
  style: TextStyleOptions;
  fontSize: number;
}) {
  const _radius = useTextRadius(radius, fontSize, style.textBaseline);
  const getCoordinates = useGetCoordinates();
  const [x, y] = getCoordinates(_radius, angle);
  return <pixiText x={x} y={y} text={text} rotation={angle} style={{ ...style, fontSize }} anchor={0.5} />;
});

const BentText = React.memo(function BentText({
  text,
  style,
  radius,
  angle,
  fontSize
}: {
  text: string;
  style: TextStyleOptions;
  radius: number;
  angle: number;
  fontSize: number;
}) {
  const align = style.align ?? 'left';
  const _radius = useTextRadius(radius, fontSize, style.textBaseline);

  // because it is just rendering one letter at a time we have align center
  const textStyle = new TextStyle({ ...style, fontSize, align: 'center' });

  const getCoordinates = useGetCoordinates();

  if (text.length === 0) {
    return null;
  }

  const widths = text.split('').map((letter) => CanvasTextMetrics.measureText(letter, textStyle).width);

  const totalWidth = widths.reduce((acc, width) => acc + width, 0);
  const totalAngle = totalWidth / _radius;

  // [x, y, rotation]
  const positions: [number, number, number, string][] = [];

  // align center
  let a = angle - totalAngle / 2;
  if (align === 'left') {
    a += totalAngle / 2;
  } else if (align === 'right') {
    a -= totalAngle / 2;
  }

  // because we have anchor 0.5 we need to move the letters 50% to the right
  a += widths[0] / _radius / 2;

  positions.push([...getCoordinates(_radius, a), a, text[0]]);

  for (let i = 1; i < text.length; i++) {
    a += widths[i - 1] / _radius / 2;
    a += widths[i] / _radius / 2;
    positions.push([...getCoordinates(_radius, a), a, text[i]]);
  }

  return (
    <>
      {positions.map(([x, y, angle, letter], i) => {
        return <pixiText key={i} text={letter} x={x} y={y} rotation={angle} style={textStyle} anchor={0.5} />;
      })}
    </>
  );
});
