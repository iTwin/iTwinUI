/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';

import { Select } from '../Select';
import { SelectProps } from '../Select/Select';
import { StatusIconMap } from '../utils/common';
import { useTheme } from '../utils/hooks/useTheme';
import '@itwin/itwinui-css/css/inputs.css';

export type LabeledSelectProps<T> = {
  /**
   * Label of the select.
   */
  label?: React.ReactNode;
  /**
   * Message below the select.
   */
  message?: React.ReactNode;
  /**
   * Status of the select.
   * @default ''
   */
  status?: 'positive' | 'warning' | 'negative';
  /**
   * Custom svg icon. If select has status, default status icon is used instead.
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
   * You can choose between default and inline.
   * @default 'default'
   */
  displayStyle?: 'default' | 'inline';
  /**
   * If true, shows a red asterisk but does not prevent form submission.
   * @default false
   */
  required?: boolean;
} & SelectProps<T>;

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

  const icon = svgIcon ?? (status && StatusIconMap[status]());

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
      <Select
        disabled={disabled}
        className={selectClassName}
        style={selectStyle}
        {...rest}
      />
      {displayStyle === 'default' && (message || icon) && (
        <div className='iui-message'>
          {icon}
          {message}
        </div>
      )}
    </div>
  );
};

export default LabeledSelect;
