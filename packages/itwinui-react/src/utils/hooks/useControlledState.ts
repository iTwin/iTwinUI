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
 * **NOTE**: `setControlledState` is called only when the value **changes**.
 * So, if `setState` is called with the same value as the current `state`, `setControlledState` is not called.
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
  // const [oldState, setOldState] = React.useState<T>(state);
  const oldState = React.useRef<T>(state);

  const setState = React.useCallback(
    (value) => {
      const newValue = (() => {
        if (typeof value === 'function') {
          return (value as (prevState: T) => T)(state);
        }
        return value;
      })();

      // Called only when the value *changes*.
      if (newValue === oldState.current) {
        return;
      }
      // setOldState(value);
      oldState.current = newValue;

      setUncontrolledState(value);
      setControlledState?.(value);
    },
    [setControlledState, state],
  ) as React.Dispatch<React.SetStateAction<T>>;

  return [state, setState] as const;
};
