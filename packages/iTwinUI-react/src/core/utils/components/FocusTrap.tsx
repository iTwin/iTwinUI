/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { getTabbableElements } from '../functions/focusable';
import { mergeRefs } from '../hooks/useMergedRefs';

export type FocusTrapProps = {
  /**
   * A single child element to trap focus in.
   */
  children: JSX.Element;
};

/**
 * Trap focus within child container.
 * Used for modals and dialogs.
 */
export const FocusTrap = (props: FocusTrapProps) => {
  const { children } = props;
  const childRef = React.useRef<HTMLElement>();

  const getFirstLastFocusables = () => {
    const elements = getTabbableElements(childRef.current);
    const firstElement = elements[0];
    const lastElement = elements[(elements.length || 1) - 1];
    return [firstElement, lastElement] as const;
  };

  const onFirstFocus = (event: React.FocusEvent) => {
    const [firstElement, lastElement] = getFirstLastFocusables();
    if (event.relatedTarget === firstElement) {
      (lastElement as HTMLElement)?.focus();
    } else {
      (firstElement as HTMLElement)?.focus();
    }
  };

  const onLastFocus = (event: React.FocusEvent) => {
    const [firstElement, lastElement] = getFirstLastFocusables();
    if (event.relatedTarget === lastElement) {
      (firstElement as HTMLElement)?.focus();
    } else {
      (lastElement as HTMLElement)?.focus();
    }
  };

  return (
    <>
      <div tabIndex={0} onFocus={onFirstFocus} aria-hidden />
      {React.cloneElement(children, {
        ref: mergeRefs(
          (children as React.FunctionComponentElement<HTMLElement>).ref,
          childRef,
        ),
      })}
      <div tabIndex={0} onFocus={onLastFocus} aria-hidden />
    </>
  );
};

export default FocusTrap;
