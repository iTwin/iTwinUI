/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useTheme } from '../utils';
import cx from 'classnames';
import '@itwin/itwinui-css/css/footer.css';

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
