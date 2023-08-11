/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';

/**
 * Wrapper over `useState` that always gives preference to the
 * uncontrolled state (which often comes from a prop).
 */
export const useUncontrolledState = <T>(uncontrolledState: T) => {
  const [controlledState, setControlledState] =
    React.useState(uncontrolledState);

  return [uncontrolledState ?? controlledState, setControlledState] as const;
};
