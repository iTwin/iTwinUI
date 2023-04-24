/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme } from '../utils';
import type {
  PolymorphicForwardRefComponent,
  PolymorphicComponentProps,
} from '../utils';
import '@itwin/itwinui-css/css/menu.css';

export const List = React.forwardRef((props, ref) => {
  const { as: Element = 'ul', className, role = 'list', ...rest } = props;

  useTheme();

  return (
    <Element
      className={cx('iui-list', className)}
      ref={ref}
      role={role}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'ul', ListOwnProps>;

type ListOwnProps = {
  /**
   * Sets the role of the list component
   * @default 'list'
   */
  role?: 'list' | 'listbox';
};

export type ListProps = PolymorphicComponentProps<'ul', ListOwnProps>;
