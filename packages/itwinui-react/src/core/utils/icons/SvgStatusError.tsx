/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
export const SvgStatusError = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg viewBox='0 0 16 16' {...props}>
      <path d='m8 0a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm1 12h-2v-2h2zm0-3h-2v-5h2z' />
    </svg>
  );
};
