import React from 'react';

/**
 * Div with flexbox layout
 *
 * @internal
 */
export const Flex = ({
  children,
  style,
  alignItems,
  justifyContent
}: {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
}) => {
  return <div style={{ display: 'flex', alignItems, justifyContent, ...style }}>{children}</div>;
};
