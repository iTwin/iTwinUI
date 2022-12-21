/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
export const SvgNew = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg viewBox='0 0 16 16' {...props}>
      <path d='M8 5a1 1 0 0 1-1-1V1a1 1 0 0 1 2 0v3a1 1 0 0 1-1 1zM4.535 7a.997.997 0 0 1-.499-.134l-2.598-1.5a1 1 0 1 1 1-1.732l2.598 1.5A1 1 0 0 1 4.536 7zM1.94 12.5a1 1 0 0 1-.501-1.866l2.598-1.5a1 1 0 1 1 1 1.732l-2.598 1.5a.997.997 0 0 1-.499.134zM8 16a1 1 0 0 1-1-1v-3a1 1 0 0 1 2 0v3a1 1 0 0 1-1 1zm6.061-3.5a.995.995 0 0 1-.499-.134l-2.598-1.5a1 1 0 1 1 1-1.732l2.598 1.5a1 1 0 0 1-.5 1.866zM11.465 7a1 1 0 0 1-.501-1.866l2.598-1.5a1 1 0 1 1 1 1.732l-2.598 1.5a.995.995 0 0 1-.5.134z' />
    </svg>
  );
};
