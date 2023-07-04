/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';

import { Select } from '../Select/index.js';
import type { SelectProps } from '../Select/Select.js';
import { StatusIconMap, useId } from '../utils/index.js';
import type { LabeledInputProps } from '../LabeledInput/LabeledInput.js';
import StatusMessage from '../StatusMessage/StatusMessage.js';
import InputGrid from '../InputGrid/InputGrid.js';
import Label from '../Label/Label.js';

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
    triggerProps,
    ...rest
  } = props;

  const labelId = `${useId()}-label`;

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
    <InputGrid displayStyle={displayStyle} className={className} style={style}>
      {label && (
        <Label required={required} id={labelId}>
          {label}
        </Label>
      )}
      <Select
        disabled={disabled}
        className={selectClassName}
        style={selectStyle}
        {...rest}
        triggerProps={{
          'aria-labelledby': labelId,
          ...triggerProps,
        }}
      />
      {message && (
        <StatusMessage
          status={status}
          startIcon={displayStyle === 'default' ? icon() : undefined}
        >
          {message}
        </StatusMessage>
      )}
      <></>
    </InputGrid>
  );
};

export default LabeledSelect;
