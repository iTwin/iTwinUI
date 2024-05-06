/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import { getRandomValue } from '../functions/numbers.js';

/**
 * Wrapper around React's `useId` hook, which prefixes the id with `iui-` and uses
 * a random value as fallback for older React versions which don't include `useId`.
 */
export const useId = () => {
  const uniqueValue = useUniqueValue();
  return React.useMemo(() => `iui-${uniqueValue}`, [uniqueValue]);
};

// This is needed to avoid bundlers trying to import non-existing export.
// Read more: https://github.com/webpack/webpack/issues/14814
const _React = React;

const useUniqueValue =
  _React.useId ?? (() => React.useMemo(() => getRandomValue(10), []));
