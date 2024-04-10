/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Svg } from './Svg.js';

export const SvgCaretRightSmall = (
  props: React.ComponentPropsWithoutRef<'svg'>,
) => {
  return (
    <Svg {...props}>
      <path d='M6.003 4.807v6.4a.28.28 0 0 0 .443.24L9.9 8.27a.34.34 0 0 0 0-.48L6.446 4.566a.269.269 0 0 0-.443.24z' />
    </Svg>
  );
};
