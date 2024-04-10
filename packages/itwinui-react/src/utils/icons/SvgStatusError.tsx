/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Svg } from './Svg.js';

export const SvgStatusError = (
  props: React.ComponentPropsWithoutRef<'svg'>,
) => {
  return (
    <Svg {...props}>
      <path d='M9 12H7v-2h2v2Zm0-3H7V4h2v5Zm2.314-9H4.686L0 4.686v6.628L4.686 16h6.628L16 11.314V4.686L11.314 0Z' />
    </Svg>
  );
};
