/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Svg } from './Svg.js';

export const SvgCheckmarkSmall = (
  props: React.ComponentPropsWithoutRef<'svg'>,
) => {
  return (
    <Svg {...props}>
      <path d='m6 13.4-4.7-4.7 1.4-1.4 3.3 3.3 7.3-7.3 1.4 1.4z' />
    </Svg>
  );
};
