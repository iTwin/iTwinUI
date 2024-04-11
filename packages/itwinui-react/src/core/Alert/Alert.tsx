/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import {
  useSafeContext,
  polymorphic,
  StatusIconMap,
  SvgCloseSmall,
  Box,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { IconButton } from '../Buttons/IconButton.js';
import { Icon } from '../Icon/Icon.js';
import { Anchor } from '../Typography/Anchor.js';

const AlertContext = React.createContext<
  | {
      /**
       * Type of the alert.
       */
      type: 'positive' | 'warning' | 'negative' | 'informational';
    }
  | undefined
>(undefined);

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

type AlertLegacyProps = {
  /** @deprecated Use `Alert.Action` subcomponent. */
  clickableText?: React.ReactNode;
  /** @deprecated Use `Alert.Action` subcomponent. */
  clickableTextProps?: React.ComponentPropsWithoutRef<'a'>;
  /** @deprecated Use `Alert.CloseButton` subcomponent. */
  onClose?: () => void;
};

// ----------------------------------------------------------------------------
// Alert component

const AlertComponent = React.forwardRef((props, forwardedRef) => {
  const {
    children,
    type = 'informational',
    isSticky = false,
    clickableText,
    clickableTextProps,
    onClose,
    ...rest
  } = props;

  return (
    <Alert.Wrapper type={type} isSticky={isSticky} ref={forwardedRef} {...rest}>
      <Alert.Icon />
      <Alert.Message>
        {children}
        {clickableText ? (
          <Alert.Action {...clickableTextProps}>{clickableText}</Alert.Action>
        ) : null}
      </Alert.Message>
      {onClose ? <Alert.CloseButton onClick={onClose} /> : null}
    </Alert.Wrapper>
  );
}) as PolymorphicForwardRefComponent<'div', AlertOwnProps & AlertLegacyProps>;
AlertComponent.displayName = 'Alert';

// ----------------------------------------------------------------------------
// Alert.Wrapper component

const AlertWrapper = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    type = 'informational',
    isSticky = false,
    ...rest
  } = props;

  return (
    <Box
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
AlertWrapper.displayName = 'Alert.Wrapper';

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
  const { type } = useSafeContext(AlertContext);

  return (
    <Anchor
      as={(!!props.href ? 'a' : 'button') as 'a'}
      className={cx('iui-button-base', 'iui-alert-link', className)}
      underline
      data-iui-status={type}
      ref={ref}
      {...rest}
    >
      {children}
    </Anchor>
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
 * <Alert>This is an alert.</Alert>
 * @example
 * <Alert.Wrapper type='informational'>
 *  <Alert.Icon />
 *  <Alert.Message>This is an informational alert.</Alert.Message>
 *  <Alert.CloseButton onClick={() => {}} />
 * </Alert.Wrapper>
 * @example
 * <Alert.Wrapper type='positive'>
 *  <Alert.Icon>
 *    <SvgSmileyHappy />
 *  </Alert.Icon>
 *  <Alert.Message>
 *    This is an alert.
 *    <Alert.Action>This is clickable text.</Alert.Action>
 *  </Alert.Message>
 *  <Alert.CloseButton onClick={() => {}}>
 *    <SvgCollapse />
 *  </Alert.CloseButton>
 * </Alert.Wrapper>
 */
export const Alert = Object.assign(AlertComponent, {
  /**
   *  Alert wrapper subcomponent
   */
  Wrapper: AlertWrapper,
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
