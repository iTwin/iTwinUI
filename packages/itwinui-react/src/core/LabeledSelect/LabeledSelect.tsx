/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';

import { Select } from '../Select/index.js';
import type { SelectProps } from '../Select/Select.js';
import { StatusIconMap, useId, Icon } from '../utils/index.js';
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
   * If true, shows a red asterisk but does not prevent form submission.
   * @default false
   */
  required?: boolean;
  /**
   * Pass props to wrapper element.
   */
  wrapperProps?: React.ComponentProps<typeof InputGrid>;
  /**
   * Passes properties for label.
   */
  labelProps?: React.ComponentProps<'div'>;
  /**
   * Passes properties for message content.
   */
  messageContentProps?: React.ComponentPropsWithRef<'div'>;
  /**
   * Passes properties for message icon.
   */
  messageIconProps?: React.ComponentProps<typeof Icon>;
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
    required = false,
    triggerProps,
    wrapperProps,
    labelProps,
    messageContentProps,
    messageIconProps,
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
    <InputGrid labelPlacement={displayStyle} {...wrapperProps}>
      {label && (
        <Label
          as='div'
          required={required}
          disabled={disabled}
          id={labelId}
          {...labelProps}
        >
          {label}
        </Label>
      )}
      <Select
        disabled={disabled}
        className={className}
        style={style}
        status={status}
        {...rest}
        triggerProps={{
          'aria-labelledby': labelId,
          ...triggerProps,
        }}
      />
      {(message || icon()) && (
        <StatusMessage
          status={status}
          startIcon={displayStyle === 'default' ? icon() : undefined}
          iconProps={messageIconProps}
          contentProps={messageContentProps}
        >
          {message}
        </StatusMessage>
      )}
    </InputGrid>
  );
};

export default LabeledSelect;
