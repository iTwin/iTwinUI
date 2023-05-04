/* eslint-disable @typescript-eslint/ban-types */
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import {
  CommonProps,
  useTheme,
  StatusIconMap,
  SvgCloseSmall,
  PolymorphicComponentProps,
  PolymorphicForwardRefComponent,
} from '../utils';
import '@itwin/itwinui-css/css/alert.css';

// ----------------------------------------------------------------------------
// Alert.Icon component

type AlertIconOwnProps = {
  /**
   * Type of the alert icon.
   */
  type?: 'positive' | 'warning' | 'negative' | 'informational';
};

export type AlertIconProps<T extends React.ElementType = 'svg'> =
  PolymorphicComponentProps<T, AlertIconOwnProps>;

const AlertIcon = React.forwardRef((props, ref) => {
  const { as: Element = 'svg', children, className, type, ...rest } = props;

  if (type) {
    const StatusIcon = StatusIconMap[type];
    return (
      <StatusIcon
        className={cx('iui-alert-icon', className)}
        ref={ref}
        {...rest}
      />
    );
  }

  return (
    <Element className={cx('iui-alert-icon', className)} ref={ref} {...rest}>
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'svg', AlertIconOwnProps>;

// ----------------------------------------------------------------------------
// Alert.Message component

type AlertMessageOwnProps = {};

export type AlertMessageProps<T extends React.ElementType = 'span'> =
  PolymorphicComponentProps<T, AlertMessageOwnProps>;

const AlertMessage = React.forwardRef((props, ref) => {
  const { as: Element = 'span', children, className, ...rest } = props;

  return (
    <Element className={cx('iui-alert-message', className)} ref={ref} {...rest}>
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'span', AlertMessageOwnProps>;

// ----------------------------------------------------------------------------
// Alert.ClickableText component

type AlertClickableTextOwnProps = {};

export type AlertClickableTextProps<T extends React.ElementType = 'a'> =
  PolymorphicComponentProps<T, AlertClickableTextOwnProps>;

const AlertClickableText = React.forwardRef((props, ref) => {
  const { as: Element = 'a', children, className, ...rest } = props;

  return (
    <Element className={cx('iui-alert-link', className)} ref={ref} {...rest}>
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'a', AlertClickableTextOwnProps>;

// ----------------------------------------------------------------------------
// Alert.CloseButton component

type AlertCloseButtonOwnProps = {
  /**
   * Action handler for close.
   */
  onClose: () => void;
};

export type AlertCloseButtonProps<T extends React.ElementType = 'svg'> =
  PolymorphicComponentProps<T, AlertCloseButtonOwnProps>;

const AlertCloseButton = React.forwardRef((props, ref) => {
  const {
    as: Element = 'button',
    children,
    className,
    onClose,
    ...rest
  } = props;

  return (
    <Element
      onClick={onClose}
      aria-label='Close'
      type='button'
      className={cx('iui-alert-button', className)}
      ref={ref}
      {...rest}
    >
      {children ?? <Alert.CloseButtonIcon />}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'button', AlertCloseButtonOwnProps>;

// ----------------------------------------------------------------------------
// Alert.CloseButtonIcon component

type AlertCloseButtonIconOwnProps = {};

export type AlertCloseButtonIconProps<T extends React.ElementType = 'span'> =
  PolymorphicComponentProps<T, AlertCloseButtonIconOwnProps>;

const AlertCloseButtonIcon = React.forwardRef((props, ref) => {
  const { as: Element = 'span', children, className, ...rest } = props;

  return (
    <Element
      className={cx('iui-alert-button-icon', className)}
      ref={ref}
      aria-hidden
      {...rest}
    >
      {children ?? <SvgCloseSmall />}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'span', AlertCloseButtonIconOwnProps>;

export type AlertProps = {
  /**
   * Type of the alert.
   * @default 'informational'
   */
  type?: 'positive' | 'warning' | 'negative' | 'informational';
  /**
   * Stick the alert to the top.
   * @default false
   */
  isSticky?: boolean;
  /**
   * Alert message text.
   */
  children: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * A small box to quickly grab user attention and communicate a brief message
 * @example
 * <Alert>
 *  <Alert.Message>This is an alert.</Alert.Message>
 * </Alert>
 * <Alert type='informational'>
 *  <Alert.Icon type='informational' />
 *  <Alert.Message>This is an informational alert.</Alert.Message>
 * </Alert>
 * <Alert type='positive'>
 *  <Alert.Icon>
 *    <SvgSmileyHappy />
 *  </Alert.Icon>
 *  <Alert.Message>
 *    This is an alert.
 *    <Alert.ClickableText>This is clickable text.</Alert.ClickableText>
 *  </Alert.Message>
 *  <Alert.CloseButton onClose={action('Close!')}>
 *    <Alert.CloseButtonIcon>
 *      <SvgCollapse />
 *    </Alert.CloseButtonIcon>
 *  </Alert.CloseButton>
 */
export const Alert = Object.assign(
  React.forwardRef(
    (props: AlertProps, ref: React.RefObject<HTMLDivElement>) => {
      const {
        children,
        className,
        type = 'informational',
        style,
        isSticky = false,
        ...rest
      } = props;

      useTheme();

      return (
        <div
          className={cx('iui-alert', className)}
          data-iui-status={type}
          data-iui-variant={isSticky ? 'sticky' : undefined}
          style={style}
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
     * 	Alert icon subcomponent
     */
    Icon: AlertIcon,
    /**
     * 	Alert message subcomponent
     */
    Message: AlertMessage,
    /**
     * 	Alert clickable text subcomponent for the link you want to provide.
     */
    ClickableText: AlertClickableText,
    /**
     * 	Alert close button subcomponent
     */
    CloseButton: AlertCloseButton,
    /**
     * 	Alert close button subcomponent
     */
    CloseButtonIcon: AlertCloseButtonIcon,
  },
);

export default Alert;
