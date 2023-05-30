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
  polymorphic,
  StatusIconMap,
  SvgCloseSmall,
  Box,
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/props.js';
import { IconButton } from '../Buttons/index.js';

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
};

const AlertComponent = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    type = 'informational',
    isSticky = false,
    ...rest
  } = props;

  return (
    <Box
      as='div'
      className={cx('iui-alert', className)}
      data-iui-status={type}
      data-iui-variant={isSticky ? 'sticky' : undefined}
      ref={ref}
      {...rest}
    >
      <AlertContext.Provider value={{ type }}>{children}</AlertContext.Provider>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', AlertOwnProps>;
AlertComponent.displayName = 'Alert';

// ----------------------------------------------------------------------------
// Alert.Icon component

const AlertIcon = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;

  const { type } = useSafeContext(AlertContext);

  const StatusIcon = StatusIconMap[type];

  return (
    <Icon fill={type} ref={ref} {...rest}>
      {children ?? <StatusIcon />}
    </Icon>
  );
}) as PolymorphicForwardRefComponent<'span', React.ComponentProps<typeof Icon>>;
AlertIcon.displayName = 'Alert.Icon';

// ----------------------------------------------------------------------------
// Alert.Message component

const AlertMessage = polymorphic.span('iui-alert-message');
AlertMessage.displayName = 'Alert.Message';

// ----------------------------------------------------------------------------
// Alert.Action component

const AlertAction = React.forwardRef((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <Box
      as={(!!props.href ? 'a' : 'button') as 'a'}
      className={cx('iui-alert-link', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'a'>;
AlertAction.displayName = 'Alert.Action';

// ----------------------------------------------------------------------------
// Alert.CloseButton component

const AlertCloseButton = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;

  return (
    <IconButton
      styleType='borderless'
      size='small'
      aria-label='Close'
      ref={ref}
      {...rest}
    >
      {children ?? <SvgCloseSmall />}
    </IconButton>
  );
}) as PolymorphicForwardRefComponent<'button'>;
AlertCloseButton.displayName = 'Alert.CloseButton';

/**
 * A small box to quickly grab user attention and communicate a brief message
 * @example
 * <Alert>
 *  <Alert.Message>This is an alert.</Alert.Message>
 * </Alert>
 * @example
 * <Alert type='informational'>
 *  <Alert.Icon />
 *  <Alert.Message>This is an informational alert.</Alert.Message>
 * </Alert>
 * @example
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
 * </Alert>
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

export default Alert;
