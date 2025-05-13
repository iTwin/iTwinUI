/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box, SvgCheckmark } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { ThemeProviderFutureContext } from '../ThemeProvider/ThemeProvider.js';

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
export const ToggleSwitch = React.forwardRef((props, ref) => {
  const {
    disabled = false,
    labelPosition = 'right',
    label,
    className,
    style,
    size = 'default',
    labelProps = {},
    icon: iconProp,
    ...rest
  } = props;

  const consistentPropsSpread =
    React.useContext(ThemeProviderFutureContext)?.consistentPropsSpread ===
    true;

  // Disallow custom icon for small size, but keep the default checkmark when prop is not passed.
  const shouldShowIcon =
    iconProp === undefined || (iconProp !== null && size !== 'small');

  const consistencyRelatedProps = React.useMemo(() => {
    if (consistentPropsSpread) {
      return {
        outerProps: {},
        innerProps: { rest, className, style },
      };
    }

    return {
      outerProps: { className, style },
      innerProps: { rest },
    };
  }, [className, consistentPropsSpread, rest, style]);

  return (
    <Box
      as={label ? 'label' : 'div'}
      {...consistencyRelatedProps.outerProps}
      className={cx(
        'iui-toggle-switch-wrapper',
        {
          'iui-disabled': disabled,
          'iui-label-on-right': label && labelPosition === 'right',
          'iui-label-on-left': label && labelPosition === 'left',
        },
        consistencyRelatedProps.outerProps.className,
      )}
      data-iui-size={size}
    >
      <Box
        as='input'
        {...consistencyRelatedProps.innerProps}
        className={cx(
          'iui-toggle-switch',
          consistencyRelatedProps.innerProps.className,
        )}
        type='checkbox'
        role='switch'
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
