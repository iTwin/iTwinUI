/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';

import { Select } from '../Select';
import { SelectProps } from '../Select/Select';
import { StatusIconMap, useTheme, InputContainer } from '../utils';
import { LabeledInputProps } from '../LabeledInput';
import '@itwin/itwinui-css/css/select.css';

export type LabeledSelectProps<T> = {
  /**
   * Label of the select.
   */
  label?: React.ReactNode;
  /**
   * Message below the select. Does not apply to 'inline' select.
   */
  message?: React.ReactNode;
  /**
   * Status of the select.
   * @default ''
   */
  status?: 'positive' | 'warning' | 'negative';
  /**
   * Custom svg icon. Will override status icon if specified.
   */
  svgIcon?: JSX.Element;
  /**
   * Custom CSS class name for the select element.
   */
  selectClassName?: string;
  /**
   * Custom CSS Style for the select element.
   */
  selectStyle?: React.CSSProperties;
  /**
   * If true, shows a red asterisk but does not prevent form submission.
   * @default false
   */
  required?: boolean;
} & Pick<LabeledInputProps, 'displayStyle'> &
  SelectProps<T>;

/**
 * Labeled select component to select value from options.
 * @example
 * <LabeledSelect
 *   label='Select Label'
 *   options={[
 *     { value: 1, label: 'Item #1' },
 *     { value: 2, label: 'Item #2' },
 *     { value: 3, label: 'Item #3' },
 *   ]}
 *   message='Help Message'
 * />
 * <LabeledSelect
 *   label='Select Label'
 *   options={[
 *     { value: 1, label: 'Item #1' },
 *     { value: 2, label: 'Item #2' },
 *     { value: 3, label: 'Item #3' },
 *   ]}
 *   message='Positive Message'
 *   status='positive'
 * />
 * <LabeledSelect
 *   label='Select Label'
 *   options={[
 *     { value: 1, label: 'Item #1' },
 *     { value: 2, label: 'Item #2' },
 *     { value: 3, label: 'Item #3' },
 *   ]}
 *   message='Custom Message'
 *   svgIcon={<SvgCamera />}
 * />
 */
export const LabeledSelect = <T,>(
  props: LabeledSelectProps<T>,
): JSX.Element => {
  const {
    className,
    disabled = false,
    label,
    message,
    status,
    svgIcon,
    displayStyle = 'default',
    style,
    selectClassName,
    selectStyle,
    required = false,
    ...rest
  } = props;

  useTheme();

  const icon = () => {
    if (svgIcon) {
      return React.cloneElement(svgIcon, { 'aria-hidden': true });
    }
    if (status && message) {
      return StatusIconMap[status]();
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
      icon={displayStyle === 'default' ? icon() : undefined}
      isLabelInline={displayStyle === 'inline'}
      className={className}
      style={style}
    >
      <Select
        disabled={disabled}
        className={selectClassName}
        style={selectStyle}
        {...rest}
      />
    </InputContainer>
  );
};

export default LabeledSelect;
