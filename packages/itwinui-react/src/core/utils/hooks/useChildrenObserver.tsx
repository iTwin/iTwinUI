/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { getWindow } from '../functions/dom';

/**
 * Hook that uses `ChildrenObserver` to access an element's children every time it updates.
 * @private
 * @param onChildrenUpdate callback fired with the element's children on every update.
 * @returns a callback ref that needs to be set on the element, and a ChildrenObserver instance.
 *
 * @example
 * const onChildrenUpdate = React.useCallback((size) => console.log(size), []);
 * const [ref] = useChildrenObserver(onChildrenUpdate);
 * ...
 * return <div ref={ref}>...</div>;
 */
export const useChildrenObserver = <T extends HTMLElement>(
  onChildrenUpdate: (mutationList: MutationRecord[]) => void,
) => {
  const childrenObserver = React.useRef<MutationObserver>();

  const elementRef = React.useCallback(
    (element: T | null | undefined) => {
      if (!getWindow()?.MutationObserver) {
        return;
      }

      childrenObserver.current?.disconnect();
      if (element) {
        childrenObserver.current = new MutationObserver((mutationList) =>
          onChildrenUpdate(mutationList),
        );
        const config = { attributes: true, childList: true, subtree: true };
        childrenObserver.current?.observe(element, config);
      }
    },
    [onChildrenUpdate],
  );

  return [elementRef, childrenObserver.current] as const;
};
