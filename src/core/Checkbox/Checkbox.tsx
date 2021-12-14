/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { ProgressRadial } from '../ProgressIndicators';
import { useMergedRefs, useTheme } from '../utils';
import '@itwin/itwinui-css/css/inputs.css';

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
   * Type of checkbox, regular or eyeball checkbox that is used for visibility.
   * @default 'default'
   */
  variant?: 'default' | 'eyeball';
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
 * <Checkbox label='Visibility Checkbox' variant='eyeball' />
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      className,
      disabled = false,
      indeterminate = false,
      label,
      status,
      variant = 'default',
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
    });

    const defaultCheckbox = (
      <svg viewBox='0 0 16 16' aria-hidden='true' focusable='false'>
        <path className='iui-check' d='M6,14L0,8l2-2l4,4l8-8l2,2L6,14z' />
        <path className='iui-check-partial' d='m1 6.5h14v3h-14z' />
      </svg>
    );

    const visibilityCheckbox = (
      <svg viewBox='0 0 16 16' aria-hidden='true' focusable='false'>
        <path
          className='iui-check'
          d='m8 2.99051a8.81883 8.81883 0 0 0 -8 4.95062 8.74664 8.74664 0 0 0 8 5.06836 8.63266 8.63266 0 0 0 8-5.06836 8.83631 8.83631 0 0 0 -8-4.95062zm-1.31445 1.86981a1.47663 1.47663 0 1 1 -1.47663 1.47668 1.47665 1.47665 0 0 1 1.47663-1.47668zm1.31445 6.64917a7.17486 7.17486 0 0 1 -6.30475-3.55237 7.4952 7.4952 0 0 1 2.81475-2.6336 3.83956 3.83956 0 1 0 6.98126.00244 7.522 7.522 0 0 1 2.81774 2.63916 7.09785 7.09785 0 0 1 -6.309 3.54437z'
        />

        <g className='iui-check-partial'>
          <path
            d='m8 3v7.9a4.01179 4.01179 0 0 0 4-4 6.7509 6.7509 0 0 0 -.2-1.4l.1.1a6.89429 6.89429 0 0 1 2.4 2.4 8.39088 8.39088 0 0 1 -2.3 2.3 6.89412 6.89412 0 0 1 -3.9 1.2c-.03345 0-.06653-.00677-.1-.0072v1.5072a8.90686 8.90686 0 0 0 8-5 8.90686 8.90686 0 0 0 -8-5z'
            opacity='.33'
          />
          <path d='m8 0a1 1 0 0 0 -1 1v2.07135a8.91637 8.91637 0 0 0 -7 4.92865 8.91637 8.91637 0 0 0 7 4.92865v2.07135a1 1 0 0 0 2 0v-14a1 1 0 0 0 -1-1zm-1.5 4.9a1.55426 1.55426 0 0 1 .5.087v2.81451a1.40746 1.40746 0 0 1 -.5.09849 1.538 1.538 0 0 1 -1.5-1.5 1.53794 1.53794 0 0 1 1.5-1.5zm-2.3 5.4a6.97279 6.97279 0 0 1 -2.5-2.3 6.89429 6.89429 0 0 1 2.4-2.4c.1 0 .1-.1.2-.1a3.194 3.194 0 0 0 -.3 1.4 4.0047 4.0047 0 0 0 3 3.857v.65289a6.37491 6.37491 0 0 1 -2.8-1.10989z' />
        </g>

        <path
          className='iui-uncheck'
          d='m1.70671 12.879 11.17218-11.17219 1.4142 1.4142-11.17218 11.17218zm.99329-1.679 1.1-1.1a5.06317 5.06317 0 0 1 -2-2.1 7.48268 7.48268 0 0 1 6.2-3.5 4.86877 4.86877 0 0 1 1.2.1l1.3-1.3a10.07431 10.07431 0 0 0 -2.5-.3 8.84129 8.84129 0 0 0 -8 5 8.42455 8.42455 0 0 0 2.7 3.2zm10.7-6.4-1.1 1.1a7.08625 7.08625 0 0 1 2 2.1 7.50323 7.50323 0 0 1 -6.2 3.5 8.31665 8.31665 0 0 1 -1.3-.2l-1.3 1.3a8.909 8.909 0 0 0 6.4-.5 9.04344 9.04344 0 0 0 4.1-4.1 9.168 9.168 0 0 0 -2.6-3.2z'
        />
      </svg>
    );

    return (
      <label
        className={cx(
          'iui-checkbox',
          {
            'iui-disabled': disabled,
            [`iui-${status}`]: !!status,
            'iui-loading': isLoading,
            'iui-checkbox-visibility': variant === 'eyeball',
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
          {!isLoading &&
            (variant === 'default' ? defaultCheckbox : visibilityCheckbox)}
        </span>
        {label && <span className='iui-label'>{label}</span>}
      </label>
    );
  },
);

export default Checkbox;
