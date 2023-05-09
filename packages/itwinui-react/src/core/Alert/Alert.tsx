/* eslint-disable @typescript-eslint/ban-types */
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import '@itwin/itwinui-css/css/alert.css';
import { useTheme, StatusIconMap, SvgCloseSmall } from '../utils/index.js';
import type {
  CommonProps,
  PolymorphicComponentProps,
  PolymorphicForwardRefComponent,
} from '../utils/props.js';

// ----------------------------------------------------------------------------
// Alert.Icon component

type AlertIconOwnProps = {
  /**
   * Type of the alert icon.
   */
  type?: 'positive' | 'warning' | 'negative' | 'informational';
};

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

type AlertCloseButtonOwnProps = {};

const AlertCloseButton = React.forwardRef((props, ref) => {
  const { as: Element = 'button', children, className, ...rest } = props;

  return (
    <Element
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

// ----------------------------------------------------------------------------
// Alert component

type AlertOwnProps = {
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

export const AlertComponent = React.forwardRef(
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
) as PolymorphicForwardRefComponent<'div', AlertOwnProps>;

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
 *  <Alert.CloseButton onClick={action('Close!')}>
 *    <Alert.CloseButtonIcon>
 *      <SvgCollapse />
 *    </Alert.CloseButtonIcon>
 *  </Alert.CloseButton>
 */
export const Alert = Object.assign(AlertComponent, {
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
});

export type AlertIconProps = PolymorphicComponentProps<
  'svg',
  AlertIconOwnProps
>;

export type AlertMessageProps = PolymorphicComponentProps<
  'span',
  AlertMessageOwnProps
>;

export type AlertClickableTextProps = PolymorphicComponentProps<
  'a',
  AlertClickableTextOwnProps
>;

export type AlertCloseButtonProps = PolymorphicComponentProps<
  'button',
  AlertCloseButtonOwnProps
>;

export type AlertCloseButtonIconProps = PolymorphicComponentProps<
  'span',
  AlertCloseButtonIconOwnProps
>;

export type AlertProps = PolymorphicComponentProps<'div', AlertOwnProps>;

export default Alert;
