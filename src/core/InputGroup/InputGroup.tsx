/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { StatusIconMap } from '../utils/common';
import { useTheme } from '../utils/hooks/useTheme';
import { CommonProps } from '../utils/props';
import '@itwin/itwinui-css/css/inputs.css';

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
  const icon = status ? StatusIconMap[status] : svgIcon;

  return (
    <div
      className={cx(
        'iui-input-container',
        {
          'iui-disabled': disabled,
          [`iui-${status}`]: !!status,
          [`iui-${displayStyle}`]: displayStyle !== 'default',
        },
        className,
      )}
      style={style}
      {...rest}
    >
      {label && (
        <div
          className={cx('iui-label', {
            'iui-required': required,
          })}
        >
          {label}
        </div>
      )}
      {children}
      {(message || icon) && (
        <div className='iui-message'>
          {icon}
          {displayStyle === 'default' && message}
        </div>
      )}
    </div>
  );
};

export default InputGroup;
