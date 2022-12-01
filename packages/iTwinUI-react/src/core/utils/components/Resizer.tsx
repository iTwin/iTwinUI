/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { getBoundedValue, getTranslateValues } from '../functions';

export type ResizerProps = {
  /**
   * Ref of the element that is being resized.
   */
  elementRef: React.RefObject<HTMLElement>;
  /**
   * Ref of the container element in order to avoid resizing past container boundaries.
   * If not passed, viewport will be used.
   */
  containerRef?: React.RefObject<HTMLElement>;
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
  const { elementRef, containerRef, onResizeStart, onResizeEnd } = props;

  const isResizing = React.useRef(false);

  const onResizePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (!elementRef.current || event.button !== 0) {
      return;
    }

    const initialPointerX = event.clientX;
    const initialPointerY = event.clientY;

    const [initialTranslateX, initialTranslateY] = getTranslateValues(
      elementRef.current,
    );
    const { width: initialWidth, height: initialHeight } =
      elementRef.current.getBoundingClientRect();

    let width = `${initialWidth}px`;
    let height = `${initialHeight}px`;
    let translateX = initialTranslateX;
    let translateY = initialTranslateY;

    const minWidth = parseFloat(getComputedStyle(elementRef.current).minWidth);
    const minHeight = parseFloat(
      getComputedStyle(elementRef.current).minHeight,
    );

    const resizer = event.currentTarget.dataset.iuiResizer;

    const originalUserSelect =
      elementRef.current.ownerDocument.body.style.userSelect;
    elementRef.current.ownerDocument.body.style.userSelect = 'none';

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
        containerRect?.right ??
          elementRef.current.ownerDocument.documentElement.clientWidth ??
          0,
      );
      const clientY = getBoundedValue(
        event.clientY,
        containerRect?.top ?? 0,
        containerRect?.bottom ??
          elementRef.current.ownerDocument.documentElement.clientHeight ??
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
          break;
        }
        case 'bottom-right': {
          width = elementRef.current.style.width = `${initialWidth - diffX}px`;
          height = elementRef.current.style.height = `${
            initialHeight - diffY
          }px`;
          break;
        }
        case 'bottom': {
          height = elementRef.current.style.height = `${
            initialHeight - diffY
          }px`;
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
          translateX = initialTranslateX - diffX;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
        default:
          break;
      }
    };

    elementRef.current.ownerDocument.addEventListener(
      'pointermove',
      onResizePointerMove,
    );
    elementRef.current.ownerDocument.addEventListener(
      'pointerup',
      () => {
        document.removeEventListener('pointermove', onResizePointerMove);
        if (elementRef.current) {
          elementRef.current.ownerDocument.body.style.userSelect =
            originalUserSelect;
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
        style={{
          position: 'absolute',
          top: -4,
          left: -4,
          width: 12,
          height: 12,
          cursor: 'nw-resize',
        }}
      />
      <div
        data-iui-resizer='top'
        onPointerDown={onResizePointerDown}
        style={{
          position: 'absolute',
          top: -4,
          left: 8,
          right: 8,
          height: 8,
          cursor: 'n-resize',
        }}
      />
      <div
        data-iui-resizer='top-right'
        onPointerDown={onResizePointerDown}
        style={{
          position: 'absolute',
          top: -4,
          right: -4,
          width: 12,
          height: 12,
          cursor: 'ne-resize',
        }}
      />
      <div
        data-iui-resizer='right'
        onPointerDown={onResizePointerDown}
        style={{
          position: 'absolute',
          top: 8,
          right: -4,
          bottom: 8,
          width: 8,
          cursor: 'e-resize',
        }}
      />
      <div
        data-iui-resizer='bottom-right'
        onPointerDown={onResizePointerDown}
        style={{
          position: 'absolute',
          bottom: -4,
          right: -4,
          width: 12,
          height: 12,
          cursor: 'se-resize',
        }}
      />
      <div
        data-iui-resizer='bottom'
        onPointerDown={onResizePointerDown}
        style={{
          position: 'absolute',
          bottom: -4,
          left: 8,
          right: 8,
          height: 8,
          cursor: 's-resize',
        }}
      />
      <div
        data-iui-resizer='bottom-left'
        onPointerDown={onResizePointerDown}
        style={{
          position: 'absolute',
          bottom: -4,
          left: -4,
          width: 12,
          height: 12,
          cursor: 'sw-resize',
        }}
      />
      <div
        data-iui-resizer='left'
        onPointerDown={onResizePointerDown}
        style={{
          position: 'absolute',
          top: 8,
          left: -4,
          bottom: 8,
          width: 8,
          cursor: 'w-resize',
        }}
      />
    </>
  );
};

export default Resizer;
