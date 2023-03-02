/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { getRandomValue } from './numbers';

/**
 * Return custom useId function as a fallback for React.useId
 */
export const useId =
  React.useId ??
  (() => {
    const [id] = React.useState(() => `iui-${getRandomValue(10)}`);
    return id;
  });
