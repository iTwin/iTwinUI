/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { Input, InputProps } from '../Input/Input';
import { StatusIconMap } from '../utils/common';
import { useTheme } from '../utils/hooks/useTheme';
import '@itwin/itwinui-css/css/inputs.css';

export type LabeledInputProps = {
  /**
   * Label of the input.
   */
  label?: React.ReactNode;
  /**
   * Message below the input. Does not apply to 'inline' input.
   */
  message?: React.ReactNode;
  /**
   * Status of the input.
   */
  status?: 'positive' | 'warning' | 'negative';
  /**
   * Custom svg icon. If input has status, default status icon is used instead.
   */
  svgIcon?: JSX.Element;
  /**
   * Custom CSS class name for the input element.
   */
  inputClassName?: string;
  /**
   * Custom CSS Style for the input element.
   */
  inputStyle?: React.CSSProperties;
  /**
   * You can choose between default and inline.
   * @default 'default'
   */
  displayStyle?: 'default' | 'inline';
} & InputProps;

/**
 * Basic labeled input component
 * @example
 * <LabeledInput label='My label' />
 * <LabeledInput disabled label='My label' />
 * <LabeledInput status='positive' label='Positive' />
 * <LabeledInput status='negative' label='Negative' setFocus />
 */
export const LabeledInput = React.forwardRef<
  HTMLInputElement,
  LabeledInputProps
>((props, ref) => {
  const {
    className,
    disabled = false,
    label,
    message,
    status,
    svgIcon,
    style,
    inputClassName,
    inputStyle,
    displayStyle = 'default',
    required = false,
    ...rest
  } = props;

  useTheme();

  const icon = status ? StatusIconMap[status] : svgIcon;

  return (
    <label
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
      <Input
        disabled={disabled}
        className={inputClassName}
        style={inputStyle}
        required={required}
        ref={ref}
        {...rest}
      />
      {(message || icon) && (
        <div className='iui-message'>
          {icon}
          {displayStyle === 'default' && message}
        </div>
      )}
    </label>
  );
});

export default LabeledInput;
