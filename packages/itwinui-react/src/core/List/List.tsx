/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { useTheme } from '../utils/index.js';
import type {
  PolymorphicForwardRefComponent,
  PolymorphicComponentProps,
} from '../utils/index.js';
import '@itwin/itwinui-css/css/menu.css';

export const List = React.forwardRef((props, ref) => {
  const { as: Element = 'ul', className, ...rest } = props;

  useTheme();

  return (
    <Element
      className={cx('iui-list', className)}
      ref={ref}
      role='list'
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'ul', ListOwnProps>;

type ListOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

export type ListProps = PolymorphicComponentProps<'ul', ListOwnProps>;
