/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { StatusIconMap, useId, Box, Icon } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import type { LabeledInputProps } from '../LabeledInput/LabeledInput.js';
import { InputGrid } from '../InputGrid/InputGrid.js';
import { Label } from '../Label/Label.js';
import { StatusMessage } from '../StatusMessage/StatusMessage.js';
import { InputWithDecorations } from '../InputWithDecorations/InputWithDecorations.js';

type LabeledTextareaProps = {
  /**
   * Label for the textarea.
   */
  label: React.ReactNode;
  /**
   * Message below the textarea. Does not apply to 'inline' textarea.
   */
  message?: React.ReactNode;
  /**
   * Status of text area.
   */
  status?: 'positive' | 'warning' | 'negative';
  /**
   * Pass props to wrapper element.
   */
  wrapperProps?: React.ComponentProps<typeof InputGrid>;
  /**
   * Passes properties for label.
   */
  labelProps?: React.ComponentProps<'label'>;
  /**
   * Passes properties for message content.
   */
  messageContentProps?: React.ComponentPropsWithRef<'div'>;
  /**
   * Passes properties for svgIcon.
   */
  iconProps?: React.ComponentProps<typeof Icon>;
} & Pick<LabeledInputProps, 'svgIcon' | 'displayStyle' | 'iconDisplayStyle'>;

/**
 * Textarea wrapper that allows for additional styling and labelling
 * @example
 * <LabeledTextarea
 *  label='Textarea Label'
 *  message='Help Message'
 *  placeholder='This is a textarea'
 * />
 * <LabeledTextarea
 *  label='Disabled Textarea Label'
 *  message='Help Message'
 *  placeholder='This is a textarea'
 *  disabled={true}
 * />
 * <LabeledTextarea
 *  label='Textarea Label'
 *  message='Negative Message'
 *  placeholder='This is a textarea'
 *  status='negative'
 * />
 */
export const LabeledTextarea = React.forwardRef((props, ref) => {
  const uid = useId();

  const {
    disabled = false,
    label,
    message,
    status,
    displayStyle = 'default',
    iconDisplayStyle = displayStyle === 'default' ? 'block' : 'inline',
    svgIcon,
    required = false,
    id = uid,
    wrapperProps,
    labelProps,
    messageContentProps,
    iconProps,
    ...textareaProps
  } = props;

  const icon = svgIcon ?? (status && StatusIconMap[status]());
  const iconFill = !svgIcon ? status : undefined;

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

      <InputWithDecorations status={status}>
        <Box
          as='textarea'
          required={required}
          disabled={disabled}
          data-iui-status={status}
          rows={3}
          {...textareaProps}
          ref={ref}
        />
        {iconDisplayStyle === 'inline' && (
          <InputWithDecorations.Icon fill={iconFill} {...iconProps}>
            {icon}
          </InputWithDecorations.Icon>
        )}
      </InputWithDecorations>

      {(message || (icon && iconDisplayStyle !== 'inline')) && (
        <StatusMessage
          status={status}
          startIcon={displayStyle === 'default' ? icon : undefined}
          iconProps={iconProps}
          contentProps={messageContentProps}
        >
          {message}
        </StatusMessage>
      )}
    </InputGrid>
  );
}) as PolymorphicForwardRefComponent<'textarea', LabeledTextareaProps>;

export default LabeledTextarea;
