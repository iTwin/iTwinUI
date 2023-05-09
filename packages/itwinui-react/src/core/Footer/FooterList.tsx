/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useItwinui } from '../utils/index.js';
import cx from 'classnames';
import '@itwin/itwinui-css/css/footer.css';

export type FooterListProps = React.ComponentPropsWithRef<'ul'>;

/**
 * Footer list. Recommended to use inside `Footer` with `Footer.Item` and `Footer.Separator`.
 */
export const FooterList = (props: FooterListProps) => {
  const { className, children, ...rest } = props;

  useItwinui();

  return (
    <ul className={cx('iui-legal-footer-list', className)} {...rest}>
      {children}
    </ul>
  );
};

export default FooterList;
