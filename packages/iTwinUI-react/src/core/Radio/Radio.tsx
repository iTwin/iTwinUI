/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';

import { useMergedRefs, useTheme } from '../utils';
import '@itwin/itwinui-css/css/inputs.css';

export type RadioProps = {
  /**
   * Label of the radio.
   */
  label?: React.ReactNode;
  /**
   * Status of the radio.
   */
  status?: 'positive' | 'warning' | 'negative';
  /**
   * Custom CSS class name for the checkmark element.
   *
   * @deprecated As of 1.32.0, this is applied on the actual radio `<input>` element.
   * The checkmark has been moved into a pseudo-element.
   */
  checkmarkClassName?: string;
  /**
   * Custom CSS Style for the checkmark element.
   *
   * @deprecated As of 1.32.0, this is applied on the actual radio `<input>` element.
   * The checkmark has been moved into a pseudo-element.
   */
  checkmarkStyle?: React.CSSProperties;
  /**
   * Set focus on radio element.
   * @default false
   */
  setFocus?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

/**
 * Basic radio input component
 * @example
 * <Radio />
 * <Radio label='Radio' />
 * <Radio disabled={true} label='Radio' />
 * <Radio status='positive' label='Positive' />
 * <Radio status='warning' label='Warning' />
 * <Radio status='negative' label='Negative' />
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (props, ref) => {
    const {
      className,
      disabled = false,
      label,
      status,
      style,
      checkmarkClassName,
      checkmarkStyle,
      setFocus = false,
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

    const radio = (
      <input
        className={cx(
          'iui-radio',
          className && { [className]: !label },
          checkmarkClassName,
        )}
        style={{ ...(!label && style), ...checkmarkStyle }}
        disabled={disabled}
        type='radio'
        ref={refs}
        {...rest}
      />
    );

    return !label ? (
      radio
    ) : (
      <label
        className={cx(
          'iui-radio-wrapper',
          { 'iui-disabled': disabled, [`iui-${status}`]: !!status },
          className,
        )}
        style={style}
      >
        {radio}
        {label && <span className='iui-radio-label'>{label}</span>}
      </label>
    );
  },
);

export default Radio;
