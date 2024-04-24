/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';

/**
 * Hook that calls a callback whenever a prop changes.
 *
 * @example
 * usePropChanged(props.value, (newValue) => {
 *   console.log('Value changed to', newValue);
 * });
 *
 * @see https://react.dev/reference/react/useState#storing-information-from-previous-renders
 */
export const usePropChanged = <T>(prop: T, callback: (newValue: T) => void) => {
  const [prevProp, setPrevProp] = React.useState(prop);
  if (prevProp !== prop) {
    setPrevProp(prop);
    callback(prop);
  }
};
