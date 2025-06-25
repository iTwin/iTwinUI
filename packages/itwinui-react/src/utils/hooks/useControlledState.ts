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
 * The only exception is that the set function only accepts the new state. It does not accept a function.
 *
 * **NOTE**: `setControlledState` is called only when the value *changes* (uncontrolled mode) or should *change*
 * (controlled mode).
 *
 * @example
 * const [state, setState] = useControlledState(null, props.value, props.onChange);
 */
export const useControlledState = <T>(
  initialValue: T,
  controlledState: T | undefined,
  setControlledState?: (value: T) => void,
) => {
  const [uncontrolledState, setUncontrolledState] =
    React.useState<T>(initialValue);

  const state = React.useMemo(
    () => (controlledState !== undefined ? controlledState : uncontrolledState),
    [controlledState, uncontrolledState],
  );
  const oldState = React.useRef(state);

  const setState = React.useCallback(
    (value: T) => {
      // Called only when the value *changes* (uncontrolled mode) or should *change* (controlled mode).
      if (value === oldState.current) {
        return;
      }

      // If in controlled mode, calling `setState` does *not* guarantee that the `controlledState` will change.
      // i.e. the consumer may just ignore the `value` they receive in `setControlledState`.
      // Thus, when in controlled state, do *not* update `oldState` when `setState` is called.
      // Instead, only do so when the controlled value is changed (the effect for syncing oldState with controlledState).
      if (controlledState == null) {
        oldState.current = value;
      }

      setUncontrolledState(value);
      setControlledState?.(value);
    },
    [controlledState, setControlledState],
  );

  // If in controlled mode, sync oldState with controlledState
  React.useEffect(() => {
    if (controlledState != null) {
      oldState.current = controlledState;
    }
  }, [controlledState]);

  return [state, setState] as const;
};
