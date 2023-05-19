/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import '@itwin/itwinui-css/css/alert.css';
import {
  Icon,
  useSafeContext,
  useGlobals,
  StatusIconMap,
  SvgCloseSmall,
} from '../utils/index.js';
import type {
  CommonProps,
  PolymorphicComponentProps,
  PolymorphicForwardRefComponent,
} from '../utils/props.js';

const AlertContext = React.createContext<
  | {
      /**
       * Type of the alert.
       */
      type: 'positive' | 'warning' | 'negative' | 'informational';
    }
  | undefined
>(undefined);

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

const AlertComponent = React.forwardRef((props, ref) => {
  const {
    as: Element = 'div',
    children,
    className,
    type = 'informational',
    style,
    isSticky = false,
    ...rest
  } = props;

  useGlobals();

  return (
    <Element
      className={cx('iui-alert', className)}
      data-iui-status={type}
      data-iui-variant={isSticky ? 'sticky' : undefined}
      style={style}
      ref={ref}
      {...rest}
    >
      <AlertContext.Provider value={{ type }}>{children}</AlertContext.Provider>
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', AlertOwnProps>;

// ----------------------------------------------------------------------------
// Alert.Icon component

type AlertIconOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const AlertIcon = React.forwardRef((props, ref) => {
  const { as: Element = 'svg', children, className, ...rest } = props;

  const { type } = useSafeContext(AlertContext);

  if (!children) {
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

type AlertMessageOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const AlertMessage = React.forwardRef((props, ref) => {
  const { as: Element = 'span', children, className, ...rest } = props;

  return (
    <Element className={cx('iui-alert-message', className)} ref={ref} {...rest}>
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'span', AlertMessageOwnProps>;

// ----------------------------------------------------------------------------
// Alert.Action component

type AlertActionOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const AlertAction = React.forwardRef((props, ref) => {
  const { as: Element = 'a', children, className, ...rest } = props;

  return (
    <Element className={cx('iui-alert-link', className)} ref={ref} {...rest}>
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'a', AlertActionOwnProps>;

// ----------------------------------------------------------------------------
// Alert.CloseButton component

type AlertCloseButtonOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const AlertCloseButton = React.forwardRef((props, ref) => {
  const { as: Element = 'button', children, className, ...rest } = props;

  console.log('HasChildren?: ', children ? true : false);
  return (
    <Element
      aria-label='Close'
      type='button'
      className={cx('iui-alert-button', className)}
      ref={ref}
      {...rest}
    >
      {children ?? (
        <Icon>
          <SvgCloseSmall />
        </Icon>
      )}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'button', AlertCloseButtonOwnProps>;

/**
 * A small box to quickly grab user attention and communicate a brief message
 * @example
 * <Alert>
 *  <Alert.Message>This is an alert.</Alert.Message>
 * </Alert>
 * <Alert type='informational'>
 *  <Alert.Icon />
 *  <Alert.Message>This is an informational alert.</Alert.Message>
 * </Alert>
 * <Alert type='positive'>
 *  <Alert.Icon>
 *    <SvgSmileyHappy />
 *  </Alert.Icon>
 *  <Alert.Message>
 *    This is an alert.
 *    <Alert.Action>This is clickable text.</Alert.Action>
 *  </Alert.Message>
 *  <Alert.CloseButton onClick={action('Close!')}>
 *    <Icon>
 *      <SvgCollapse />
 *    </Icon>
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
   * 	Alert action subcomponent for the link you want to provide.
   */
  Action: AlertAction,
  /**
   * 	Alert close button subcomponent
   */
  CloseButton: AlertCloseButton,
});

export type AlertProps = PolymorphicComponentProps<'div', AlertOwnProps>;

export type AlertIconProps = PolymorphicComponentProps<
  'svg',
  AlertIconOwnProps
>;

export type AlertMessageProps = PolymorphicComponentProps<
  'span',
  AlertMessageOwnProps
>;

export type AlertActionProps = PolymorphicComponentProps<
  'a',
  AlertActionOwnProps
>;

export type AlertCloseButtonProps = PolymorphicComponentProps<
  'button',
  AlertCloseButtonOwnProps
>;

export default Alert;
