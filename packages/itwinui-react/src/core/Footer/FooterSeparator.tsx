/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useTheme } from '../utils/index.js';
import cx from 'classnames';

export type FooterSeparatorProps = Omit<
  React.ComponentPropsWithRef<'li'>,
  'children'
>;

/**
 * Footer separator. Recommended to use inside `Footer.List`.
 */
export const FooterSeparator = (props: FooterSeparatorProps) => {
  const { className, ...rest } = props;
  useTheme();

  return (
    <li
      className={cx('iui-legal-footer-separator', className)}
      aria-hidden
      {...rest}
    />
  );
};

export default FooterSeparator;
