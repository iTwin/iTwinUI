/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  StatusIconMap,
  useGlobals,
  InputContainer,
  Box,
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import '@itwin/itwinui-css/css/utils.css';

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
    children,
    disabled = false,
    displayStyle = 'default',
    label,
    message,
    status,
    svgIcon,
    required = false,
    ...rest
  } = props;
  useGlobals();

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
    <InputContainer
      label={label}
      disabled={disabled}
      required={required}
      status={status}
      message={message}
      icon={icon()}
      isLabelInline={displayStyle === 'inline'}
      ref={forwardedRef}
      {...rest}
    >
      <Box className='iui-input-group'>{children}</Box>
    </InputContainer>
  );
}) as PolymorphicForwardRefComponent<'div', InputGroupProps>;

export default InputGroup;
