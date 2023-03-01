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

export const ListItem = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, ...rest } = props;

  useTheme();

  return (
    <Element
      className={cx('iui-list-item', className)}
      ref={ref}
      role='listitem'
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', ListItemOwnProps>;

type ListItemOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

export type ListItemProps = PolymorphicComponentProps<'div', ListItemOwnProps>;
