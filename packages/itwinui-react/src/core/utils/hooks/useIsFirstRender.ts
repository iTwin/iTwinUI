/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';

/**
 * Returns `true` only on the first render.
 */
export function useIsFirstRender() {
  const [isFirstRender, setIsFirstRender] = React.useState(true);
  React.useEffect(() => {
    queueMicrotask(() => {
      setIsFirstRender(false);
    });
  }, []);
  return isFirstRender;
}
