/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Svg } from './Svg.js';

export const SvgImportantSmall = (
  props: React.ComponentPropsWithoutRef<'svg'>,
) => {
  return (
    <Svg {...props}>
      <path d='M6.25 1h3.5v3.19l-.676 6.408H6.91L6.25 4.19zm.12 10.572h3.268V15H6.37z' />
    </Svg>
  );
};
