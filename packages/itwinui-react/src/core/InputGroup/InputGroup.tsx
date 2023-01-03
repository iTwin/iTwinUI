/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { StatusIconMap, useTheme, CommonProps, InputContainer } from '../utils';
import '@itwin/itwinui-css/css/utils.css';

export type InputGroupProps = {
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
} & Omit<CommonProps, 'title'>;

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
export const InputGroup = (props: InputGroupProps) => {
  const {
    children,
    disabled = false,
    displayStyle = 'default',
    label,
    message,
    status,
    svgIcon,
    className,
    style,
    required = false,
    ...rest
  } = props;
  useTheme();

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
      className={className}
      style={style}
      {...rest}
    >
      <div className='iui-input-group'>{children}</div>
    </InputContainer>
  );
};

export default InputGroup;
