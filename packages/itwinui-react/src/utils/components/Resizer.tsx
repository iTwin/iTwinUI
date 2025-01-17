/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  getBoundedValue,
  getTranslateValuesFromElement,
} from '../functions/index.js';

export type ResizerProps = {
  /**
   * Ref of the element that is being resized.
   */
  elementRef: React.RefObject<HTMLElement | null>;
  /**
   * Ref of the container element in order to avoid resizing past container boundaries.
   * If not passed, viewport will be used.
   */
  containerRef?: React.RefObject<HTMLElement | null>;
  /**
   * Callback that is being called on resize start.
   * Useful to set state, style, or other properties when resizing is started.
   */
  onResizeStart?: () => void;
  /**
   * Callback that is being called on resize end.
   * Useful to preserve state if element is being closed.
   */
  onResizeEnd?: (style: React.CSSProperties) => void;
};

/**
 * Component that allows to resize parent element.
 * Parent must have `position: relative`.
 *
 * Ideally should be used within a shadow root.
 * @private
 * @example
 * const ref = React.useRef<HTMLDivElement>(null);
 * return (
 *   <div ref={ref} style={{ position: 'relative' }}>
 *     <Resizer elementRef={ref} />
 *   </div>
 * );
 */
export const Resizer = (props: ResizerProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: -6,
        display: 'grid',
        pointerEvents: 'none',
      }}
    >
      <ResizerStyles />
      <Resizers {...props} />
    </div>
  );
};

const Resizers = (props: ResizerProps) => {
  const { elementRef, containerRef, onResizeStart, onResizeEnd } = props;

  const isResizing = React.useRef(false);

  const onResizePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (!elementRef.current || event.button !== 0) {
      return;
    }

    const initialPointerX = event.clientX;
    const initialPointerY = event.clientY;

    const [initialTranslateX, initialTranslateY] =
      getTranslateValuesFromElement(elementRef.current);
    const { width: initialWidth, height: initialHeight } =
      elementRef.current.getBoundingClientRect();

    let width = `${initialWidth}px`;
    let height = `${initialHeight}px`;
    let translateX = initialTranslateX;
    let translateY = initialTranslateY;

    let minWidth = parseFloat(getComputedStyle(elementRef.current).minWidth);

    if (Number.isNaN(minWidth)) {
      minWidth = 380;
    }

    const minHeight = parseFloat(
      getComputedStyle(elementRef.current).minHeight,
    );

    const resizer = event.currentTarget.dataset.iuiResizer;
    const ownerDocument = elementRef.current.ownerDocument || document;

    const originalUserSelect = ownerDocument.body.style.userSelect;
    ownerDocument.body.style.userSelect = 'none';

    const onResizePointerMove = (event: PointerEvent) => {
      if (!elementRef.current) {
        return;
      }

      if (!isResizing.current) {
        isResizing.current = true;
        onResizeStart?.();
      }

      const containerRect = containerRef?.current?.getBoundingClientRect();
      const clientX = getBoundedValue(
        event.clientX,
        containerRect?.left ?? 0,
        containerRect?.right ?? ownerDocument.documentElement.clientWidth ?? 0,
      );
      const clientY = getBoundedValue(
        event.clientY,
        containerRect?.top ?? 0,
        containerRect?.bottom ??
          ownerDocument.documentElement.clientHeight ??
          0,
      );

      const diffX = initialPointerX - clientX;
      const diffY = initialPointerY - clientY;

      switch (resizer) {
        case 'top-left': {
          const newHeight = initialHeight + diffY;
          if (newHeight >= minHeight) {
            height = elementRef.current.style.height = `${newHeight}px`;
            translateY = initialTranslateY - diffY;
          }
          const newWidth = initialWidth + diffX;
          if (newWidth >= minWidth) {
            width = elementRef.current.style.width = `${newWidth}px`;
            translateX = initialTranslateX - diffX;
          }
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
        case 'top': {
          const newHeight = initialHeight + diffY;
          if (newHeight < minHeight) {
            break;
          }
          height = elementRef.current.style.height = `${newHeight}px`;
          translateY = initialTranslateY - diffY;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
        case 'top-right': {
          const newHeight = initialHeight + diffY;
          if (newHeight >= minHeight) {
            height = elementRef.current.style.height = `${newHeight}px`;
            translateY = initialTranslateY - diffY;
          }
          width = elementRef.current.style.width = `${initialWidth - diffX}px`;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
        case 'right': {
          width = elementRef.current.style.width = `${initialWidth - diffX}px`;
          height = elementRef.current.style.height = `${initialHeight}px`;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
        case 'bottom-right': {
          width = elementRef.current.style.width = `${initialWidth - diffX}px`;
          height = elementRef.current.style.height = `${
            initialHeight - diffY
          }px`;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
        case 'bottom': {
          height = elementRef.current.style.height = `${
            initialHeight - diffY
          }px`;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
        case 'bottom-left': {
          const newWidth = initialWidth + diffX;
          if (newWidth >= minWidth) {
            width = elementRef.current.style.width = `${newWidth}px`;
            translateX = initialTranslateX - diffX;
          }
          height = elementRef.current.style.height = `${
            initialHeight - diffY
          }px`;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
        case 'left': {
          const newWidth = initialWidth + diffX;
          if (newWidth < minWidth) {
            break;
          }
          width = elementRef.current.style.width = `${newWidth}px`;
          height = elementRef.current.style.height = `${initialHeight}px`;
          translateX = initialTranslateX - diffX;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
        default:
          break;
      }
    };

    ownerDocument.addEventListener('pointermove', onResizePointerMove);
    ownerDocument.addEventListener(
      'pointerup',
      () => {
        ownerDocument.removeEventListener('pointermove', onResizePointerMove);
        if (elementRef.current) {
          ownerDocument.body.style.userSelect = originalUserSelect;
          isResizing.current = false;
          onResizeEnd?.({
            width,
            height,
            transform: `translate(${translateX}px, ${translateY}px)`,
          });
        }
      },
      { once: true },
    );
  };

  return (
    <>
      <div
        data-iui-resizer='top-left'
        onPointerDown={onResizePointerDown}
        style={{ cursor: 'nw-resize' }}
      />
      <div
        data-iui-resizer='top'
        onPointerDown={onResizePointerDown}
        style={{ cursor: 'n-resize' }}
      />
      <div
        data-iui-resizer='top-right'
        onPointerDown={onResizePointerDown}
        style={{ cursor: 'ne-resize' }}
      />
      <div
        data-iui-resizer='right'
        onPointerDown={onResizePointerDown}
        style={{ cursor: 'e-resize' }}
      />
      <div
        data-iui-resizer='bottom-right'
        onPointerDown={onResizePointerDown}
        style={{ cursor: 'se-resize' }}
      />
      <div
        data-iui-resizer='bottom'
        onPointerDown={onResizePointerDown}
        style={{ cursor: 's-resize' }}
      />
      <div
        data-iui-resizer='bottom-left'
        onPointerDown={onResizePointerDown}
        style={{ cursor: 'sw-resize' }}
      />
      <div
        data-iui-resizer='left'
        onPointerDown={onResizePointerDown}
        style={{ cursor: 'w-resize' }}
      />
    </>
  );
};

// ----------------------------------------------------------------------------

const ResizerStyles = React.memo(() => <style>{resizerStyles}</style>);

const resizerStyles = /* css */ `
[data-iui-resizer] {
  pointer-events: auto;
  grid-area: 1 / 1 / -1 / -1;
  width: 12px;
  height: 12px;
  z-index: 1;
}
[data-iui-resizer='top'],
[data-iui-resizer='bottom'] {
  height: 8px;
  width: auto;
  z-index: 0;
}
[data-iui-resizer='left'],
[data-iui-resizer='right'] {
  height: auto;
  width: 8px;
  z-index: 0;
}
[data-iui-resizer^='top'] {
  align-self: start;
}
[data-iui-resizer^='bottom'] {
  align-self: end;
}
[data-iui-resizer$='left'] {
  justify-self: start;
}
[data-iui-resizer$='right'] {
  justify-self: end;
}`;
