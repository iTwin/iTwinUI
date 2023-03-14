/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
export const SvgDocument = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg viewBox='0 0 16 16' {...props}>
      <path d='M10 0H2v16h12V4h-4zm1 0v3h3z' />
    </svg>
  );
};
