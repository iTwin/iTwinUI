/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
export const SvgChevronRightDouble = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg viewBox='0 0 16 16' {...props}>
      <path d='m1.4 0-1.4 1.4 6.6 6.6-6.6 6.6 1.4 1.4 8-8zm6.6 0-1.4 1.4 6.6 6.6-6.6 6.6 1.4 1.4 8-8z' />
    </svg>
  );
};
