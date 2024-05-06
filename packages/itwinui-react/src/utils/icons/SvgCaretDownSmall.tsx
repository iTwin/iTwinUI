/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Svg } from './Svg.js';

export const SvgCaretDownSmall = (
  props: React.ComponentPropsWithoutRef<'svg'>,
) => {
  return (
    <Svg {...props}>
      <path d='M4.807 6h6.395a.28.28 0 0 1 .24.443L8.27 9.9a.34.34 0 0 1-.481 0L4.566 6.443A.27.27 0 0 1 4.806 6z' />
    </Svg>
  );
};
