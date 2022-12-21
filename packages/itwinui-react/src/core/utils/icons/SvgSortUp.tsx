/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
export const SvgSortUp = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg viewBox='0 0 16 16' {...props}>
      <path d='m9 16v-12.7l3.8 3.7 1.2-1.2-6-5.8-1.2 1.2-4.8 4.6 1.2 1.2 3.8-3.7v12.7z' />
    </svg>
  );
};
