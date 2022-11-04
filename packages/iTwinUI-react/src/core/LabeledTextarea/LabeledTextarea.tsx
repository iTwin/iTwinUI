/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { StatusIconMap, useTheme, InputContainer } from '../utils';
import { Textarea } from '../Textarea';
import { TextareaProps } from '../Textarea/Textarea';
import { LabeledInputProps } from '../LabeledInput';
import '@itwin/itwinui-css/css/input.css';

export type LabeledTextareaProps = {
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
export const LabeledTextarea = React.forwardRef(
  (props: LabeledTextareaProps, ref: React.RefObject<HTMLTextAreaElement>) => {
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
      ...textareaProps
    } = props;

    useTheme();

    const icon = svgIcon ?? (status && StatusIconMap[status]());

    return (
      <InputContainer
        as='label'
        label={label}
        disabled={disabled}
        required={required}
        status={status}
        message={message}
        icon={icon}
        isLabelInline={displayStyle === 'inline'}
        isIconInline={iconDisplayStyle === 'inline'}
        className={className}
        style={style}
      >
        <Textarea
          disabled={disabled}
          className={textareaClassName}
          style={textareaStyle}
          required={required}
          {...textareaProps}
          ref={ref}
        />
      </InputContainer>
    );
  },
);

export default LabeledTextarea;
