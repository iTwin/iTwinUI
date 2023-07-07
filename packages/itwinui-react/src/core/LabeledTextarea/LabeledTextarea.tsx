/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { StatusIconMap, useId, Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { Textarea } from '../Textarea/index.js';
import type { TextareaProps } from '../Textarea/Textarea.js';
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
   * Custom class name for textarea.
   */
  textareaClassName?: string;
  /**
   * Custom style for textarea.
   */
  textareaStyle?: React.CSSProperties;
} & Pick<LabeledInputProps, 'svgIcon' | 'displayStyle' | 'iconDisplayStyle'> &
  TextareaProps;

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
    className,
    style,
    disabled = false,
    label,
    message,
    status,
    textareaClassName,
    textareaStyle,
    displayStyle = 'default',
    iconDisplayStyle = displayStyle === 'default' ? 'block' : 'inline',
    svgIcon,
    required = false,
    id = uid,
    ...textareaProps
  } = props;

  const icon = svgIcon ?? (status && StatusIconMap[status]());
  const iconFill = !svgIcon ? status : undefined;

  return (
    <InputGrid
      labelPlacement={displayStyle}
      className={className}
      style={style}
    >
      {label && (
        <Label required={required} disabled={disabled} htmlFor={id}>
          {label}
        </Label>
      )}
      {iconDisplayStyle === 'inline' ? (
        <InputWithDecorations status={status}>
          <Box
            as='textarea'
            className={textareaClassName}
            style={textareaStyle}
            required={required}
            disabled={disabled}
            data-iui-status={status}
            rows={3}
            {...textareaProps}
            ref={ref}
          />
          <InputWithDecorations.Icon fill={iconFill}>
            {icon}
          </InputWithDecorations.Icon>
        </InputWithDecorations>
      ) : (
        <Textarea
          disabled={disabled}
          className={textareaClassName}
          style={textareaStyle}
          required={required}
          status={status}
          id={id}
          {...textareaProps}
          ref={ref}
        />
      )}

      {message && (
        <StatusMessage
          status={status}
          startIcon={displayStyle === 'default' ? icon : undefined}
        >
          {message}
        </StatusMessage>
      )}
    </InputGrid>
  );
}) as PolymorphicForwardRefComponent<'textarea', LabeledTextareaProps>;

export default LabeledTextarea;
