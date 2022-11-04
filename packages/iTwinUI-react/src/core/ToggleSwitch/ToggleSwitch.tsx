/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useMergedRefs, useTheme } from '../utils';
import '@itwin/itwinui-css/css/toggle-switch.css';

export type ToggleSwitchProps = {
  /**
   * Label for the toggle switch.
   */
  label?: React.ReactNode;
  /**
   * Position of the label.
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';
  /**
   * Set focus on toggle.
   * @default false
   */
  setFocus?: boolean;
  /**
   * Icon inside the toggle switch. Shown only when toggle is checked.
   */
  icon?: JSX.Element;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

/**
 * A switch for turning on and off.
 * @example
 * <caption>Basic toggle</caption>
 * <ToggleSwitch onChange={(e) => console.log(e.target.checked)} defaultChecked />
 * @example
 * <caption>Disabled toggle</caption>
 * <ToggleSwitch disabled />
 * @example
 * <caption>Right labeled toggle</caption>
 * <ToggleSwitch defaultChecked label='Right labeled' />
 * @example
 * <caption>Left labeled toggle</caption>
 * <ToggleSwitch defaultChecked label='Left labeled' labelPosition='left' />
 * @example
 * <caption>Toggle with icon</caption>
 * <ToggleSwitch label='With icon toggle' icon={<svg viewBox='0 0 16 16'><path d='M1 1v14h14V1H1zm13 1.7v10.6L8.7 8 14 2.7zM8 7.3L2.7 2h10.6L8 7.3zm-.7.7L2 13.3V2.7L7.3 8zm.7.7l5.3 5.3H2.7L8 8.7z' /></svg>} />
 */
export const ToggleSwitch = React.forwardRef(
  (props: ToggleSwitchProps, ref: React.RefObject<HTMLInputElement>) => {
    const {
      disabled = false,
      labelPosition = 'right',
      icon,
      label,
      setFocus = false,
      className,
      style,
      ...rest
    } = props;

    useTheme();

    const inputElementRef = React.useRef<HTMLInputElement>(null);
    const refs = useMergedRefs<HTMLInputElement>(inputElementRef, ref);
    const WrapperComponent = label ? 'label' : 'div';

    React.useEffect(() => {
      if (inputElementRef.current && setFocus) {
        inputElementRef.current.focus();
      }
    }, [setFocus]);

    return (
      <WrapperComponent
        className={cx(
          'iui-toggle-switch-wrapper',
          {
            'iui-disabled': disabled,
            'iui-label-on-right': label && labelPosition === 'right',
            'iui-label-on-left': label && labelPosition === 'left',
          },
          className,
        )}
        style={style}
      >
        <input
          className='iui-toggle-switch'
          type='checkbox'
          role='switch'
          disabled={disabled}
          ref={refs}
          {...rest}
        />
        {icon &&
          React.cloneElement(icon, {
            className: cx('iui-toggle-switch-icon', icon.props.className),
            'aria-hidden': true,
          })}
        {label && <span className='iui-toggle-switch-label'>{label}</span>}
      </WrapperComponent>
    );
  },
);

export default ToggleSwitch;
