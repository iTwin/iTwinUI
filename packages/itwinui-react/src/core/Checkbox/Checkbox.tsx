/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { ProgressRadial } from '../ProgressIndicators';
import { useMergedRefs, useTheme } from '../utils';
import '@itwin/itwinui-css/css/checkbox.css';

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
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

/**
 * Simple input checkbox
 * @example
 * <Checkbox />
 * <Checkbox label='Basic Checkbox' />
 * <Checkbox label='Disabled Checkbox' disabled />
 * <Checkbox label='Checked' checked />
 * <Checkbox label='Positive Checkbox' status='positive' />
 * <Checkbox label='Warning Checkbox' status='warning' />
 * <Checkbox label='Negative Checkbox' status='negative' />
 * <Checkbox label='Visibility Checkbox' variant='eyeball' />
 */
export const Checkbox = React.forwardRef(
  (props: CheckboxProps, ref: React.RefObject<HTMLInputElement>) => {
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

    const checkbox = (
      <>
        <input
          className={cx(
            'iui-checkbox',
            {
              'iui-checkbox-visibility': variant === 'eyeball',
              'iui-loading': isLoading,
            },
            className && { [className]: !label },
          )}
          style={!label ? style : undefined}
          disabled={disabled || isLoading}
          type='checkbox'
          ref={refs}
          {...rest}
        />
        {isLoading && <ProgressRadial size='x-small' indeterminate />}
      </>
    );

    return !label ? (
      checkbox
    ) : (
      <label
        className={cx(
          'iui-checkbox-wrapper',
          {
            'iui-disabled': disabled,
            [`iui-${status}`]: !!status,
            'iui-loading': isLoading,
          },
          className,
        )}
        style={style}
      >
        {checkbox}
        {label && <span className='iui-checkbox-label'>{label}</span>}
      </label>
    );
  },
);

export default Checkbox;
