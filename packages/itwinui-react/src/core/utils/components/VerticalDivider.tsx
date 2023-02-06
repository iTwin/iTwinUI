/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme } from '../hooks';
import '@itwin/itwinui-css/css/utils.css';

export type VerticalDividerProps = React.ComponentPropsWithRef<'span'>;

export const VerticalDivider = React.forwardRef<
  HTMLDivElement,
  VerticalDividerProps
>((props, ref) => {
  const { className, ...rest } = props;

  useTheme();

  return (
    <span
      className={cx('iui-vertical-divider', className)}
      ref={ref}
      {...rest}
    />
  );
});

export default VerticalDivider;
