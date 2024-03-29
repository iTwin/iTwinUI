/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Svg } from './Svg.js';

export const SvgCaretUpSmall = (
  props: React.ComponentPropsWithoutRef<'svg'>,
) => {
  return (
    <Svg {...props}>
      <path d='M4.807 9.997h6.395a.28.28 0 0 0 .24-.443L8.27 6.097a.34.34 0 0 0-.48 0h-.001L4.566 9.554a.27.27 0 0 0 .24.443z' />
    </Svg>
  );
};
