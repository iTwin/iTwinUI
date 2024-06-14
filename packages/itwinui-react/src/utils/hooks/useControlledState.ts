/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';

/**
 * Wrapper over `useState` that always gives preference to the
 * controlled state (which often comes from a prop).
 *
 * This is helpful when a component needs to support both uncontrolled
 * and controlled states. If controlled value/setter is not passed,
 * then it will work just like a regular `useState`.
 *
 * @example
 * const [state, setState] = useControlledState(null, props.value, props.onChange);
 */
export const useControlledState = <T>(
  initialValue: T,
  controlledState: T | undefined,
  setControlledState?: React.Dispatch<React.SetStateAction<T>>,
) => {
  const [uncontrolledState, setUncontrolledState] =
    React.useState<T>(initialValue);

  const state = React.useMemo(
    () => (controlledState !== undefined ? controlledState : uncontrolledState),
    [controlledState, uncontrolledState],
  );

  const setState = React.useCallback(
    (value) => {
      setUncontrolledState(value);
      setControlledState?.(value);
    },
    [setControlledState, setUncontrolledState],
  ) as React.Dispatch<React.SetStateAction<T>>;

  return [state, setState] as const;
};
