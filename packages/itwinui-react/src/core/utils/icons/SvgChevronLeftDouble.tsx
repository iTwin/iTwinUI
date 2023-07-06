/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Svg } from './Svg.js';

export const SvgChevronLeftDouble = (
  props: React.ComponentPropsWithoutRef<'svg'>,
) => {
  return (
    <Svg {...props}>
      <path d='m14.6 0 1.4 1.4-6.6 6.6 6.6 6.6-1.4 1.4-8-8zm-6.6 0 1.4 1.4-6.6 6.6 6.6 6.6-1.4 1.4-8-8z' />
    </Svg>
  );
};
