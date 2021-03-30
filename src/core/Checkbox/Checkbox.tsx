/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { ProgressRadial } from '../ProgressIndicators';
import { useMergedRefs } from '../utils/hooks/useMergedRefs';
import { useTheme } from '../utils/hooks/useTheme';
import '@bentley/itwinui/css/inputs.css';

export type CheckboxProps = {
  /**
   * Text that will be shown next to the checkbox.
   */
  label?: React.ReactNode;
  /**
   * Allow checkbox to be indeterminate.
   * @default false
   */
  indeterminate?: boolean;
  /**
   * Status of checkbox.
   */
  status?: 'positive' | 'warning' | 'negative';
  /**
   * Set focus on checkbox.
   */
  setFocus?: boolean;
  /**
   * Display a loading state.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Custom CSS class name for the checkmark element.
   */
  checkmarkClassName?: string;
  /**
   * Custom CSS Style for the checkmark element.
   */
  checkmarkStyle?: React.CSSProperties;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

/**
 * Simple input checkbox
 * @example
 * <Checkbox label='Basic Checkbox' />
 * <Checkbox label='Disabled Checkbox' disabled />
 * <Checkbox label='Checked' checked />
 * <Checkbox label='Positive Checkbox' status='positive' />
 * <Checkbox label='Warning Checkbox' status='warning' />
 * <Checkbox label='Negative Checkbox' status='negative' />
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      className,
      disabled = false,
      indeterminate = false,
      label,
      status,
      setFocus,
      isLoading = false,
      style,
      checkmarkClassName,
      checkmarkStyle,
      ...rest
    } = props;

    useTheme();

    const inputElementRef = React.useRef<HTMLInputElement>(null);
    const refs = useMergedRefs<HTMLInputElement>(inputElementRef, ref);

    React.useEffect(() => {
      if (inputElementRef.current && setFocus) {
        inputElementRef.current.focus();
      }
    }, [setFocus]);

    React.useEffect(() => {
      if (inputElementRef.current) {
        inputElementRef.current.indeterminate = indeterminate;
        inputElementRef.current.checked = indeterminate
          ? false
          : inputElementRef.current.checked;
      }
    }, [indeterminate]);

    return (
      <label
        className={cx(
          'iui-checkbox',
          {
            'iui-disabled': disabled,
            [`iui-${status}`]: !!status,
            'iui-loading': isLoading,
          },
          className,
        )}
        style={style}
      >
        <input
          disabled={disabled || isLoading}
          type='checkbox'
          ref={refs}
          {...rest}
        />
        <span
          className={cx('iui-checkbox-checkmark', checkmarkClassName)}
          style={checkmarkStyle}
        >
          {isLoading && <ProgressRadial indeterminate />}
          {!isLoading && (
            <svg viewBox='0 0 16 16' aria-hidden='true' focusable='false'>
              <path className='iui-check' d='M6,14L0,8l2-2l4,4l8-8l2,2L6,14z' />
              <path className='iui-check-partial' d='m1 6.5h14v3h-14z' />
            </svg>
          )}
        </span>
        {label && <div className='iui-label'>{label}</div>}
      </label>
    );
  },
);

export default Checkbox;
