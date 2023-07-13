/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useTheme } from '../utils/index.js';
import cx from 'classnames';

export type FooterItemProps = React.ComponentPropsWithRef<'li'>;

/**
 * Footer item. Recommended to use inside `Footer.List`.
 */
export const FooterItem = (props: FooterItemProps) => {
  const { children, className, ...rest } = props;
  useTheme();

  return (
    <li className={cx('iui-legal-footer-item', className)} {...rest}>
      {children}
    </li>
  );
};

export default FooterItem;
