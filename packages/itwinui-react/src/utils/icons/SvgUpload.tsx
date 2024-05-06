/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Svg } from './Svg.js';

export const SvgUpload = (props: React.ComponentPropsWithoutRef<'svg'>) => {
  return (
    <Svg {...props}>
      <path d='m2 5h4v7h4v-7h4l-6-5zm12 6v3h-12v-3h-2v5h16v-5z' />
    </Svg>
  );
};
