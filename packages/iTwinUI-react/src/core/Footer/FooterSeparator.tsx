/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useTheme } from '../utils';
import cx from 'classnames';
import '@itwin/itwinui-css/css/footer.css';

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
