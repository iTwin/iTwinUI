/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Svg } from './Svg.js';

export const SvgSortUp = (props: React.ComponentPropsWithoutRef<'svg'>) => {
  return (
    <Svg {...props}>
      <path d='m9 16v-12.7l3.8 3.7 1.2-1.2-6-5.8-1.2 1.2-4.8 4.6 1.2 1.2 3.8-3.7v12.7z' />
    </Svg>
  );
};
