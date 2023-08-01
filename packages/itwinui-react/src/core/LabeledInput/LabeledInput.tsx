/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Input } from '../Input/Input.js';
import { StatusIconMap, useId, Icon } from '../utils/index.js';
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
   * Pass props to wrapper element.
   */
  wrapperProps?: React.ComponentProps<typeof InputGrid>;
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
  /**
   * Passes properties for message content.
   */
  messageContentProps?: React.ComponentPropsWithRef<'div'>;
  /**
   * Passes properties for icon.
   */
  iconProps?: React.ComponentProps<typeof Icon>;
  /**
   * Passes properties for label.
   */
  labelProps?: React.ComponentProps<'label'>;
  /**
   *  Passes properties for input wrapper.
   */
  inputWrapperProps?: React.ComponentProps<typeof InputWithDecorations>;
} & React.ComponentProps<typeof Input>;

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
    disabled = false,
    label,
    message,
    status,
    svgIcon,
    wrapperProps,
    labelProps,
    messageContentProps,
    iconProps,
    inputWrapperProps,
    displayStyle = 'default',
    iconDisplayStyle = displayStyle === 'default' ? 'block' : 'inline',
    required = false,
    id = uid,
    ...rest
  } = props;

  const icon = svgIcon ?? (status && StatusIconMap[status]());

  return (
    <InputGrid labelPlacement={displayStyle} {...wrapperProps}>
      {label && (
        <Label
          as='label'
          required={required}
          disabled={disabled}
          htmlFor={id}
          {...labelProps}
        >
          {label}
        </Label>
      )}

      <InputWithDecorations
        status={status}
        isDisabled={disabled}
        {...inputWrapperProps}
      >
        <InputWithDecorations.Input
          disabled={disabled}
          required={required}
          id={id}
          ref={ref}
          {...rest}
        />
        {icon && iconDisplayStyle === 'inline' && (
          <InputWithDecorations.Icon
            fill={!svgIcon ? status : undefined}
            {...iconProps}
          >
            {icon}
          </InputWithDecorations.Icon>
        )}
      </InputWithDecorations>

      {(message || (icon && iconDisplayStyle !== 'inline')) && (
        <StatusMessage
          status={status}
          startIcon={iconDisplayStyle !== 'inline' ? icon : undefined}
          iconProps={iconProps}
          contentProps={messageContentProps}
        >
          {message}
        </StatusMessage>
      )}
    </InputGrid>
  );
}) as PolymorphicForwardRefComponent<'input', LabeledInputProps>;

export default LabeledInput;
