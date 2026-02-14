import React from 'react';
import { tuple } from '@anocca/sequence-viewer-utils';

/**
 * Will assign the canvas element ref to state
 *
 * @internal
 */
export const useCanvas = () => {
  const [buffer, setBuffer] = React.useState<null | HTMLCanvasElement>(null);

  const canvasRef = React.useCallback((buffer: HTMLCanvasElement | null) => {
    if (buffer) {
      setBuffer(buffer);
    }
  }, []);
  return tuple(buffer, canvasRef);
};

/**
 * Set up DOM listeners
 *
 * @internal
 */
export const useDOMListeners = (
  buffer: Pick<HTMLElement, 'addEventListener' | 'removeEventListener'> | null,
  onClick: (ev: any) => void,
  onStartDrag: (ev: MouseEvent) => void,
  onEndDrag: (ev: any) => void,
  onScroll: (ev: any) => void,
  onMouseMove: (ev: any) => void,
  onDblClick: (ev: any) => void
) => {
  const evsRef = React.useRef({
    onClick,
    onEndDrag,
    onMouseMove,
    onScroll,
    onStartDrag,
    onDblClick
  });
  evsRef.current = {
    onClick,
    onEndDrag,
    onMouseMove,
    onScroll,
    onStartDrag,
    onDblClick
  };
  React.useEffect(() => {
    const onMouseDown = (ev: MouseEvent) => {
      evsRef.current.onStartDrag(ev);
    };
    const onMouseUpOrLeave = (ev: any) => {
      evsRef.current.onEndDrag(ev);
    };
    if (buffer) {
      const onInnerClick = (ev: MouseEvent) => {
        evsRef.current.onClick(ev);
      };
      const onInnerMousedown = (ev: MouseEvent) => {
        ev.stopPropagation();
        onMouseDown(ev);
      };
      const onInnerMouseup = (ev: MouseEvent) => {
        ev.stopPropagation();
        onMouseUpOrLeave(ev);
      };
      const onInnerMouseleave = (ev: MouseEvent) => {
        onMouseUpOrLeave(ev);
      };
      const onInnerWheel = (ev: MouseEvent) => {
        evsRef.current.onScroll(ev);
        ev.preventDefault();
        ev.stopPropagation();
      };
      const onInnerMousemove = (ev: MouseEvent) => {
        evsRef.current.onMouseMove(ev);
      };
      const onDblClick = (ev: MouseEvent) => {
        evsRef.current.onDblClick(ev);
      };

      const opts = { passive: false };

      buffer.addEventListener('click', onInnerClick, opts);
      buffer.addEventListener('mousedown', onInnerMousedown, opts);
      window.addEventListener('mouseup', onInnerMouseup, opts);
      window.addEventListener('mouseleave', onInnerMouseleave, opts);
      buffer.addEventListener('mouseleave', onInnerMouseleave, opts);
      buffer.addEventListener('wheel', onInnerWheel, opts);
      buffer.addEventListener('mousemove', onInnerMousemove, opts);
      buffer.addEventListener('dblclick', onDblClick, opts);

      return () => {
        buffer.removeEventListener('click', onInnerClick);
        buffer.removeEventListener('mousedown', onInnerMousedown);
        window.removeEventListener('mouseup', onInnerMouseup);
        window.removeEventListener('mouseleave', onInnerMouseleave);
        buffer.removeEventListener('mouseleave', onInnerMouseleave);
        buffer.removeEventListener('wheel', onInnerWheel);
        buffer.removeEventListener('mousemove', onInnerMousemove);
        buffer.removeEventListener('dblclick', onDblClick);
      };
    }
  }, [buffer]);
};
