/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Input } from '../Input/Input.js';
import type { InputProps } from '../Input/Input.js';
import { StatusIconMap, useId } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { InputGrid } from '../InputGrid/index.js';
import { InputWithDecorations } from '../InputWithDecorations/index.js';
import { StatusMessage } from '../StatusMessage/StatusMessage.js';
import { Label } from '../Label/Label.js';

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
   * Custom svg icon. Will override status icon if specified.
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
   * Set display style of label.
   * Supported values:
   * - 'default' - label appears above input.
   * - 'inline' - appears in the same line as input.
   * @default 'default'
   */
  displayStyle?: 'default' | 'inline';
  /**
   * Set display style of icon.
   * Supported values:
   * - 'block' - icon appears below input.
   * - 'inline' - icon appears inside input (at the end).
   *
   * Defaults to 'block' if `displayStyle` is `default`, else 'inline'.
   */
  iconDisplayStyle?: 'block' | 'inline';
} & InputProps;

/**
 * Basic labeled input component
 * @example
 * <LabeledInput label='My label' />
 * <LabeledInput disabled label='My label' />
 * <LabeledInput status='positive' label='Positive' />
 * <LabeledInput status='negative' label='Negative' setFocus />
 */
export const LabeledInput = React.forwardRef((props, ref) => {
  const uid = useId();

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
    iconDisplayStyle = displayStyle === 'default' ? 'block' : 'inline',
    required = false,
    id = uid,
    ...rest
  } = props;

  const icon = svgIcon ?? (status && StatusIconMap[status]());

  return (
    <InputGrid displayStyle={displayStyle} className={className} style={style}>
      {label && (
        <Label required={required} htmlFor={id}>
          {label}
        </Label>
      )}
      {icon && iconDisplayStyle === 'inline' ? (
        <InputWithDecorations>
          <InputWithDecorations.Input
            disabled={disabled}
            className={inputClassName}
            style={inputStyle}
            required={required}
            ref={ref}
            id={id}
            {...rest}
          />
          <InputWithDecorations.Icon>{icon}</InputWithDecorations.Icon>
        </InputWithDecorations>
      ) : (
        <Input
          disabled={disabled}
          className={inputClassName}
          style={inputStyle}
          required={required}
          ref={ref}
          id={id}
          {...rest}
        />
      )}
      {message && (
        <StatusMessage
          status={status}
          startIcon={iconDisplayStyle !== 'inline' ? icon : undefined}
        >
          {message}
        </StatusMessage>
      )}
      <></>
    </InputGrid>
  );
}) as PolymorphicForwardRefComponent<'input', LabeledInputProps>;

export default LabeledInput;
