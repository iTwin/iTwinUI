/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
export const SvgClose = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg viewBox='0 0 16 16' {...props}>
      <path d='m14 0-6 6-6-6-2 2 6 6-6 6 2 2 6-6 6 6 2-2-6-6 6-6' />
    </svg>
  );
};
