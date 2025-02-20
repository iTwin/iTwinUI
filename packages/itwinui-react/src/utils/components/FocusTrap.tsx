/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { getTabbableElements } from '../functions/focusable.js';

export type FocusTrapProps = {
  /**
   * A single child element to trap focus in.
   */
  children: React.JSX.Element;
};

/**
 * Trap focus within child container.
 * Used for modals and dialogs.
 */
export const FocusTrap = (props: FocusTrapProps) => {
  const { children } = props;
  const firstFocusTrapRef = React.useRef<HTMLDivElement>(null);

  const getFirstLastFocusables = React.useCallback(() => {
    // Get childrenRef via firstFocusTrapRef instead of by passing ref to cloneElementWithRef(children) to avoid re-renders.
    // https://github.com/iTwin/iTwinUI/issues/2445
    const childrenElement = firstFocusTrapRef.current?.nextElementSibling as
      | HTMLElement
      | null
      | undefined;

    const elements = getTabbableElements(childrenElement);
    const firstElement = elements[0];
    const lastElement = elements[(elements.length || 1) - 1];
    return [firstElement, lastElement] as const;
  }, []);

  const onFirstFocus = React.useCallback(
    (event: React.FocusEvent) => {
      const [firstElement, lastElement] = getFirstLastFocusables();
      if (event.relatedTarget === firstElement) {
        (lastElement as HTMLElement)?.focus();
      } else {
        (firstElement as HTMLElement)?.focus();
      }
    },
    [getFirstLastFocusables],
  );

  const onLastFocus = React.useCallback(
    (event: React.FocusEvent) => {
      const [firstElement, lastElement] = getFirstLastFocusables();
      if (event.relatedTarget === lastElement) {
        (firstElement as HTMLElement)?.focus();
      } else {
        (lastElement as HTMLElement)?.focus();
      }
    },
    [getFirstLastFocusables],
  );

  return (
    <>
      <div
        ref={firstFocusTrapRef}
        tabIndex={0}
        onFocus={onFirstFocus}
        aria-hidden
      />
      {children}
      <div tabIndex={0} onFocus={onLastFocus} aria-hidden />
    </>
  );
};
