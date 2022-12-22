/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';

/**
 * Hook that keeps track of the latest value in a ref.
 * @private
 * @example
 * const { value } = props;
 * const valueRef = useLatestRef(value);
 */
export const useLatestRef = <T>(value: T) => {
  const valueRef = React.useRef<T>(value);

  React.useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
};
