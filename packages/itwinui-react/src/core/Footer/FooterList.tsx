/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useTheme } from '../utils';
import cx from 'classnames';
import '@itwin/itwinui-css/css/footer.css';

export type FooterListProps = React.ComponentPropsWithRef<'ul'>;

/**
 * Footer list. Recommended to use inside `Footer` with `Footer.Item` and `Footer.Separator`.
 */
export const FooterList = (props: FooterListProps) => {
  const { className, children, ...rest } = props;

  useTheme();

  return (
    <ul className={cx('iui-legal-footer-list', className)} {...rest}>
      {children}
    </ul>
  );
};

export default FooterList;
