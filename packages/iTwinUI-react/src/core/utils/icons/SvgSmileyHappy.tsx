/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
export const SvgSmileyHappy = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg viewBox='0 0 16 16' {...props}>
      <path d='M8 12.5a5.19 5.19 0 0 1-3.872-1.666.5.5 0 1 1 .744-.668A4.191 4.191 0 0 0 8 11.5a4.191 4.191 0 0 0 3.128-1.334.5.5 0 1 1 .744.668A5.19 5.19 0 0 1 8 12.5zM11 5a1.146 1.146 0 0 1 1 1.25 1.146 1.146 0 0 1-1 1.25 1.146 1.146 0 0 1-1-1.25A1.146 1.146 0 0 1 11 5zM5 5a1.146 1.146 0 0 1 1 1.25A1.146 1.146 0 0 1 5 7.5a1.146 1.146 0 0 1-1-1.25A1.146 1.146 0 0 1 5 5zm3-5a8 8 0 1 0 8 8 8 8 0 0 0-8-8z' />
    </svg>
  );
};
