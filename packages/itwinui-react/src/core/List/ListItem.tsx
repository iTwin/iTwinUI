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

const ListItemComponent = React.forwardRef((props, ref) => {
  const {
    as: Element = 'div',
    size = 'default',
    disabled = false,
    active = false,
    className,
    ...rest
  } = props;

  useTheme();

  return (
    <Element
      className={cx('iui-list-item', className)}
      data-iui-active={active ? 'true' : undefined}
      data-iui-disabled={disabled ? 'true' : undefined}
      data-iui-size={size === 'large' ? 'large' : undefined}
      ref={ref}
      role='listitem'
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', ListItemOwnProps>;

type ListItemOwnProps = {
  size?: 'default' | 'large';
  disabled?: boolean;
  active?: boolean;
};

// ----------------------------------------------------------------------------

const ListItemIcon = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, ...rest } = props;

  return (
    <Element
      className={cx('iui-list-item-icon', className)}
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', ListItemIconOwnProps>;

type ListItemIconOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

// ----------------------------------------------------------------------------

const ListItemContent = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, ...rest } = props;

  return (
    <Element
      className={cx('iui-list-item-content', className)}
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', ListItemContentOwnProps>;

type ListItemContentOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

// ----------------------------------------------------------------------------

const ListItemDescription = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, ...rest } = props;

  return (
    <Element
      className={cx('iui-list-item-description', className)}
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', LListItemDescriptionOwnProps>;

type LListItemDescriptionOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

// ----------------------------------------------------------------------------
// Exported compound component

export const ListItem = Object.assign(ListItemComponent, {
  Icon: ListItemIcon,
  Content: ListItemContent,
  Description: ListItemDescription,
});

export type ListItemProps = PolymorphicComponentProps<'div', ListItemOwnProps>;
