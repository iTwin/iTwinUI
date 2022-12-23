/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme } from '../../utils';
import '@itwin/itwinui-css/css/anchor.css';

export const Anchor = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, ...rest }, ref) => {
  useTheme();
  return <a className={cx('iui-anchor', className)} ref={ref} {...rest} />;
});

export default Anchor;
