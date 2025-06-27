/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box, SvgCheckmark } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type ToggleSwitchProps = {
  /**
   * Label for the toggle switch.
   */
  label?: React.ReactNode;
  /**
   * Passes properties for ToggleSwitch label.
   */
  labelProps?: React.ComponentProps<'span'>;
  /**
   * Position of the label.
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';
  /**
   * Passes props to wrapper.
   *
   * `className` and `style` props are applied depending on `wrapperProps`:
   * - `wrapperProps!=null`: `className` and `style` applied on the `input` element where all the other props are applied.
   * - `consistentPropsSpread=false/undefined`: `className` and `style` applied on the wrapper instead of the `input`
   * element where all the other props are applied.
   *
   * `...rest` props will always be applied on the `input`.
   */
  wrapperProps?: React.HTMLAttributes<HTMLElement>;
} & (
  | {
      /**
       * Size of the toggle switch.
       *  @default 'default'
       */
      size?: 'default';
      /**
       * Custom icon inside the toggle switch. Shown only when toggle is checked and size is not small.
       *
       * Will override the default checkmark icon.
       */
      icon?: React.JSX.Element | null;
    }
  | {
      size: 'small';
      icon?: never;
    }
);

/**
 * A switch for turning on and off.
 *
 * ---
 *
 * `className` and `style` props are applied depending on `wrapperProps`:
 * - `wrapperProps!=null`: `className` and `style` applied on the `input` element where
 * all the other props are applied.
 * - `consistentPropsSpread=false/undefined`: `className` and `style` applied on the wrapper instead of the `input`
 * element where all the other props are applied.
 *
 * ---
 *
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
 *
 * @example
 * <caption>ToggleSwitch with wrapperProps</caption>
 * <ToggleSwitch
 *   className='my-class' // applied to input
 *   style={{ padding: 16 }} // applied to input
 *   wrapperProps={{
 *     className: 'my-wrapper-class', // applied to wrapper
 *     style: { padding: 16 }, // applied to wrapper
 *   }}
 *
 *   // Other props are applied to input
 *   data-dummy='value' // applied to input
 * />
 */
export const ToggleSwitch = React.forwardRef((props, ref) => {
  const {
    disabled = false,
    labelPosition = 'right',
    label,
    className,
    style,
    size = 'default',
    labelProps = {},
    wrapperProps,
    icon: iconProp,
    ...rest
  } = props;

  const shouldApplyClassNameAndStyleOnWrapper = wrapperProps == null;

  // Disallow custom icon for small size, but keep the default checkmark when prop is not passed.
  const shouldShowIcon =
    iconProp === undefined || (iconProp !== null && size !== 'small');

  return (
    <Box
      as={label ? 'label' : 'div'}
      style={shouldApplyClassNameAndStyleOnWrapper ? style : undefined}
      {...wrapperProps}
      className={cx(
        'iui-toggle-switch-wrapper',
        {
          'iui-disabled': disabled,
          'iui-label-on-right': label && labelPosition === 'right',
          'iui-label-on-left': label && labelPosition === 'left',
        },
        shouldApplyClassNameAndStyleOnWrapper ? className : undefined,
        wrapperProps?.className,
      )}
      data-iui-size={size}
    >
      <Box
        as='input'
        type='checkbox'
        role='switch'
        style={!shouldApplyClassNameAndStyleOnWrapper ? style : undefined}
        {...rest}
        className={cx(
          'iui-toggle-switch',
          !shouldApplyClassNameAndStyleOnWrapper ? className : undefined,
        )}
        disabled={disabled}
        ref={ref}
      />
      {shouldShowIcon && (
        <Box as='span' className='iui-toggle-switch-icon' aria-hidden>
          {iconProp || <SvgCheckmark />}
        </Box>
      )}
      {label && (
        <Box
          as='span'
          {...labelProps}
          className={cx('iui-toggle-switch-label', labelProps?.className)}
        >
          {label}
        </Box>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'input', ToggleSwitchProps>;
if (process.env.NODE_ENV === 'development') {
  ToggleSwitch.displayName = 'ToggleSwitch';
}
