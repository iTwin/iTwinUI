/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Svg } from './Svg.js';

export const SvgMoreVertical = (
  props: React.ComponentPropsWithoutRef<'svg'>,
) => {
  return (
    <Svg {...props}>
      <path d='m8 4a2 2 0 1 1 2-2 2 2 0 0 1 -2 2zm2 4a2 2 0 1 0 -2 2 2 2 0 0 0 2-2zm0 6a2 2 0 1 0 -2 2 2 2 0 0 0 2-2z' />
    </Svg>
  );
};
