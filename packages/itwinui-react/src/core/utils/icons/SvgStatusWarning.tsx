/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
export const SvgStatusWarning = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg viewBox='0 0 16 16' {...props}>
      <path d='m15.86807 13.26721-6.77-11.62a1.15 1.15 0 0 0 -1.1-.67 1.17 1.17 0 0 0 -1.1.69l-6.77 11.59a1.2 1.2 0 0 0 1.1 1.72h13.45a1.19 1.19 0 0 0 1.19-1.71zm-6.87-.29h-2v-2h2zm0-3h-2v-5h2z' />
    </svg>
  );
};
