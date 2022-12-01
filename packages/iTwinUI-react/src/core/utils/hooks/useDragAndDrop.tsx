/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { getTranslateValues, getWindow } from '../functions';
import { useEventListener } from './useEventListener';
import { useResizeObserver } from './useResizeObserver';

const getContainerRect = (
  containerRef: React.RefObject<HTMLElement> | undefined,
) => {
  const containerRect = containerRef?.current?.getBoundingClientRect();
  return {
    top: containerRect?.top ?? 0,
    right: containerRect?.right ?? getWindow()?.innerWidth ?? 0,
    bottom: containerRect?.bottom ?? getWindow()?.innerHeight ?? 0,
    left: containerRect?.left ?? 0,
  };
};

/**
 * Helper hook that handles elements drag logic.
 * @param elementRef Element ref that is draggable.
 * @param containerRect Bounding rectangle of container element that element can't go outside. If not passed window is used as a container.
 * @returns
 * `onPointerDown` - handler that is called when pointer is down and handles all the dragging logic.
 * `transform` - current transform of the element, it is used to preserve drag position when element visibility is being toggled.
 */
export const useDragAndDrop = (
  elementRef: React.RefObject<HTMLElement>,
  containerRef?: React.RefObject<HTMLElement>,
  enabled = true,
) => {
  const grabOffsetX = React.useRef(0);
  const grabOffsetY = React.useRef(0);
  const translateX = React.useRef<number>();
  const translateY = React.useRef<number>();

  const containerRectRef = React.useRef(getContainerRect(containerRef));

  const adjustTransform = React.useCallback(() => {
    if (!elementRef.current || !enabled) {
      return;
    }

    const { top, right, bottom, left } =
      elementRef.current?.getBoundingClientRect();

    let [newTranslateX, newTranslateY] = getTranslateValues(elementRef.current);

    containerRectRef.current = getContainerRect(containerRef);
    if (bottom > containerRectRef.current.bottom) {
      newTranslateY -= bottom - containerRectRef.current.bottom;
    }
    if (top < containerRectRef.current.top) {
      newTranslateY += containerRectRef.current.top - top;
    }
    if (right > containerRectRef.current.right) {
      newTranslateX -= right - containerRectRef.current.right;
    }
    if (left < containerRectRef.current.left) {
      newTranslateX += containerRectRef.current.left - left;
    }

    translateX.current = newTranslateX;
    translateY.current = newTranslateY;

    elementRef.current.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;
  }, [containerRef, elementRef, enabled]);

  const [resizeRef, resizeObserver] = useResizeObserver(adjustTransform);
  resizeRef(containerRef?.current);
  React.useEffect(() => {
    return () => {
      resizeObserver?.disconnect();
    };
  }, [resizeObserver]);

  useEventListener(
    'resize',
    () => {
      adjustTransform();
      if (translateX.current != null && translateY.current != null) {
        setTransform(
          `translate(${translateX.current}px, ${translateY.current}px)`,
        );
      }
    },
    getWindow(),
  );

  const [transform, setTransform] = React.useState('');

  const onPointerMove = React.useRef((event: PointerEvent) => {
    if (!elementRef.current) {
      return;
    }

    const newTranslateX = event.clientX - grabOffsetX.current;
    const newTranslateY = event.clientY - grabOffsetY.current;

    elementRef.current.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;
    adjustTransform();
  });

  const originalUserSelect = React.useRef('');

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!elementRef.current || e.button !== 0 || !enabled) {
        return;
      }

      const [x, y] = getTranslateValues(elementRef.current);
      grabOffsetX.current = e.clientX - x;
      grabOffsetY.current = e.clientY - y;

      originalUserSelect.current = elementRef.current.style.userSelect;
      // Prevents from selecting inner content when dragging.
      elementRef.current.style.userSelect = 'none';

      elementRef.current.ownerDocument.addEventListener(
        'pointermove',
        onPointerMove.current,
      );
      elementRef.current.ownerDocument.addEventListener(
        'pointerup',
        () => {
          setTransform(
            `translate(${translateX.current}px, ${translateY.current}px)`,
          );
          document.removeEventListener('pointermove', onPointerMove.current);
          if (elementRef.current) {
            elementRef.current.style.userSelect = originalUserSelect.current;
          }
        },
        { once: true },
      );
    },
    [elementRef, enabled],
  );

  return { onPointerDown, transform };
};

export default useDragAndDrop;
