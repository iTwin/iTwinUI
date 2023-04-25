/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { getRandomValue } from '../functions/numbers';

/**
 * Wrapper around React's `useId` hook, which prefixes the id with `iui-` and uses
 * a random value as fallback for older React versions which don't include `useId`.
 */
export const useId = () => {
  return React.useMemo(() => `iui-${uniqueValue()}`, []);
};

const uniqueValue = React.useId ?? (() => getRandomValue(10));
