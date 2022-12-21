/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
export const SvgUpload = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg viewBox='0 0 16 16' {...props}>
      <path d='m2 5h4v7h4v-7h4l-6-5zm12 6v3h-12v-3h-2v5h16v-5z' />
    </svg>
  );
};
