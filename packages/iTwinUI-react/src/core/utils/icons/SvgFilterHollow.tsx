/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
export const SvgFilterHollow = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg viewBox='0 0 16 16' {...props}>
      <path d='M15 1v.5L9.4 6.2l-.4.3v6L7 14V6.5l-.4-.3L1 1.5V1zm1-1H0v2l6 5v9l4-3V7l6-5z' />
    </svg>
  );
};
