/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useGlobals } from '../utils/index.js';
import cx from 'classnames';
import '@itwin/itwinui-css/css/footer.css';

export type FooterItemProps = React.ComponentPropsWithRef<'li'>;

/**
 * Footer item. Recommended to use inside `Footer.List`.
 */
export const FooterItem = (props: FooterItemProps) => {
  const { children, className, ...rest } = props;
  useGlobals();

  return (
    <li className={cx('iui-legal-footer-item', className)} {...rest}>
      {children}
    </li>
  );
};

export default FooterItem;
