/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';

/**
 * Wrapper hook around `useContext` that throws an error if the context is not provided.
 * @param context Context to use. Must have a `displayName` for useful errors.
 */
export const useSafeContext = <T>(context: React.Context<T>) => {
  const value = React.useContext(context);
  if (!value) {
    throw new Error(`${context.displayName} is undefined`);
  }
  return value!; // eslint-disable-line @typescript-eslint/no-non-null-assertion -- we already checked for undefined
};
