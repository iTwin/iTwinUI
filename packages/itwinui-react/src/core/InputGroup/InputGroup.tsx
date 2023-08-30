/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { StatusIconMap, Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { InputGrid } from '../InputGrid/index.js';
import { Label } from '../Label/index.js';
import { StatusMessage } from '../StatusMessage/index.js';

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
  svgIcon?: JSX.Element;
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
    message,
    status,
    svgIcon,
    required = false,
    labelProps,
    messageProps,
    innerProps,
    ...rest
  } = props;

  const icon = () => {
    if (svgIcon) {
      return React.cloneElement(svgIcon, { 'aria-hidden': true });
    }
    if (status && message) {
      return React.cloneElement(StatusIconMap[status](), {
        'aria-hidden': true,
      });
    }
    return undefined;
  };

  return (
    <InputGrid
      ref={forwardedRef}
      as='div'
      labelPlacement={displayStyle}
      className={cx('iui-input-group-wrapper', className)}
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
      {(message || status || svgIcon) && (
        <StatusMessage startIcon={icon()} status={status} {...messageProps}>
          {displayStyle !== 'inline' && message}
        </StatusMessage>
      )}
    </InputGrid>
  );
}) as PolymorphicForwardRefComponent<'div', InputGroupProps>;

export default InputGroup;
