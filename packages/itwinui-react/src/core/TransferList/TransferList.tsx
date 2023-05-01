/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  CommonProps,
  PolymorphicComponentProps,
  PolymorphicForwardRefComponent,
  useTheme,
} from '../utils';
import '@itwin/itwinui-css/css/transfer-list.css';

// ----------------------------------------------------------------------------
// TransferList.Area component

type TransferListAreaOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

export type TransferListAreaProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, TransferListAreaOwnProps>;

const TransferListArea = React.forwardRef((props, ref) => {
  const { as: Element = 'div', children, className, ...rest } = props;

  return (
    <Element
      className={cx('iui-transfer-list-area', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TransferListAreaOwnProps>;

// ----------------------------------------------------------------------------
// TransferList.Label component

type TransferListLabelOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

export type TransferListLabelProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, TransferListLabelOwnProps>;

const TransferListLabel = React.forwardRef((props, ref) => {
  const { as: Element = 'div', children, className, ...rest } = props;

  return (
    <Element
      className={cx('iui-transfer-list-label', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TransferListLabelOwnProps>;

// ----------------------------------------------------------------------------
// TransferList.Toolbar component

type TransferListToolbarOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

export type TransferListToolbarProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, TransferListToolbarOwnProps>;

const TransferListToolbar = React.forwardRef((props, ref) => {
  const { as: Element = 'div', children, className, ...rest } = props;

  return (
    <Element
      className={cx('iui-transfer-list-toolbar', className)}
      role={'toolbar'}
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TransferListToolbarOwnProps>;

export type TransferListProps = {
  /**
   * Content in the transfer list.
   */
  children: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * The TransferList container allows content to appear elevated through the use of a drop shadow
 * @example
 * <TransferList>TransferList Content</TransferList>
 * <TransferList elevation={2}>TransferList Content</TransferList>
 * <TransferList>
 *   <TransferList.Header>TransferList Header Content</TransferList.Header>
 *   <TransferList.Body isPadded={true}>TransferList Body Content</TransferList.Body>
 * </TransferList>
 */
export const TransferList = Object.assign(
  React.forwardRef(
    (props: TransferListProps, ref: React.RefObject<HTMLDivElement>) => {
      const { className, children, ...rest } = props;
      useTheme();

      return (
        <div
          className={cx('iui-transfer-list-wrapper', className)}
          ref={ref}
          {...rest}
        >
          {children}
        </div>
      );
    },
  ),
  {
    /**
     * 	TransferList area subcomponent
     */
    Area: TransferListArea,
    /**
     * 	TransferList label subcomponent
     */
    Label: TransferListLabel,
    /**
     * 	TransferList toolbar subcomponent
     */
    Toolbar: TransferListToolbar,
  },
);

export default TransferList;
