import type { BridgeType } from './types';

export function LinearCanvas({
  props,
  clickedAnnotation,
  setClickedAnnotation,
  circularSelections,
  setCircularSelections,
  selectedAnnotations,
  wrapper,
  setSearchResults,
  searchResults
}: BridgeType & { wrapper: HTMLDivElement }) {
  const components: JSX.Element[] = [<pixiText text="linear" key="test" />];

  return <>{components}</>;
}
