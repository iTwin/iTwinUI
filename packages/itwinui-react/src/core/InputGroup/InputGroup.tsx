/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { InputGrid } from '../InputGrid/InputGrid.js';
import { Label } from '../Label/Label.js';
import { StatusMessage } from '../StatusMessage/StatusMessage.js';

type InputGroupProps = {
  /**
   * Label of the group.
   */
  label?: React.ReactNode;
  /**
   * Status of the group.
   */
  status?: 'positive' | 'warning' | 'negative';
  /**
   * Message below the group. Does not apply to 'inline' group.
   *
   * When `typeof message === "string"`, it is automatically wrapped with {@link StatusMessage}.
   * If you are passing a non-string message that is not `<StatusMessage>`, you may need to wrap it with
   * `<StatusMessage>` yourself for proper styling of `message`.
   */
  message?: React.ReactNode;
  /**
   * You can choose between default and inline.
   * @default 'default'
   */
  displayStyle?: 'default' | 'inline';
  /**
   * Disable whole group.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the whole input group is required.
   * @default false
   */
  required?: boolean;
  /**
   * Custom icon. If group has status, default status icon is used instead.
   */
  svgIcon?: React.ComponentPropsWithoutRef<typeof StatusMessage>['startIcon'];
  /**
   * Child inputs inside group.
   */
  children: React.ReactNode;
  /**
   * Passes properties for label.
   */
  labelProps?: React.ComponentProps<'label'>;
  /**
   * Passes properties for message.
   */
  messageProps?: Pick<
    React.ComponentProps<typeof StatusMessage>,
    'iconProps' | 'contentProps'
  >;
  /**
   * Passes properties for inner input group element.
   */
  innerProps?: React.ComponentProps<'div'>;
};

/**
 * Group Checkbox/Radio components together
 * @example
 * <caption>Group checkboxes</caption>
 * <InputGroup label='Checkbox group'>
 *  <Checkbox />
 *  <Checkbox />
 * </InputGroup>
 * @example
 * <caption>Group radios</caption>
 * <InputGroup label='Radio group'>
 *  <Radio />
 *  <Radio />
 * </InputGroup>
 */
export const InputGroup = React.forwardRef((props, forwardedRef) => {
  const {
    className,
    children,
    disabled = false,
    displayStyle = 'default',
    label,
    status,
    required = false,
    labelProps,
    innerProps,
    message,
    svgIcon,
    messageProps,
    ...rest
  } = props;

  return (
    <InputGrid
      ref={forwardedRef}
      as='div'
      labelPlacement={displayStyle}
      className={cx('iui-input-group-wrapper', className)}
      data-iui-status={status}
      {...rest}
    >
      {label && (
        <Label
          as='label'
          required={required}
          disabled={disabled}
          {...labelProps}
        >
          {label}
        </Label>
      )}
      <Box
        as='div'
        {...innerProps}
        className={cx('iui-input-group', innerProps?.className)}
      >
        {children}
      </Box>
      <BottomMessage
        message={message}
        status={status}
        svgIcon={svgIcon}
        displayStyle={displayStyle}
        messageProps={messageProps}
      />
    </InputGrid>
  );
}) as PolymorphicForwardRefComponent<'div', InputGroupProps>;
if (process.env.NODE_ENV === 'development') {
  InputGroup.displayName = 'InputGroup';
}

// ------------------------------------------------------------------------------------------------

/**
 * @private
 * - When `typeof message !== 'string'`, `message` is returned as-is (e.g. when `message=<StatusMessage />`).
 * - Else, it is wrapped in a `<StatusMessage />`.
 */
const BottomMessage = (
  props: Pick<
    InputGroupProps,
    'message' | 'status' | 'svgIcon' | 'displayStyle' | 'messageProps'
  >,
) => {
  const { message, status, svgIcon, displayStyle, messageProps } = props;

  if (message && typeof message !== 'string') {
    return message;
  }

  if (message || status || svgIcon) {
    return (
      <StatusMessage
        iconProps={{
          'aria-hidden': true,
        }}
        startIcon={svgIcon}
        status={status}
        {...messageProps}
      >
        {displayStyle !== 'inline' && message}
      </StatusMessage>
    );
  }

  return null;
};
