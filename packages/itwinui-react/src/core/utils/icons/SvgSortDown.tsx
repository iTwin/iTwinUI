/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Svg } from './Svg.js';

export const SvgSortDown = (props: React.ComponentPropsWithoutRef<'svg'>) => {
  return (
    <Svg {...props}>
      <path d='m7 0v12.7l-3.8-3.7-1.2 1.2 6 5.8 1.2-1.2 4.8-4.6-1.2-1.2-3.8 3.7v-12.7z' />
    </Svg>
  );
};
