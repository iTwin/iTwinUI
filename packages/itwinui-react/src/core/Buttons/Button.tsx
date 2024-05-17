/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';

import { Box, ButtonBase } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { ProgressRadial } from '../ProgressIndicators/ProgressRadial.js';

export type ButtonProps = {
  /**
   * Modify size of the button.
   */
  size?: 'small' | 'large';
  /**
   * Style of the button.
   * Use 'borderless' to hide outline.
   * @default 'default'
   */
  styleType?: 'cta' | 'high-visibility' | 'default' | 'borderless';
  /**
   * Icon shown before the main button content.
   */
  startIcon?: JSX.Element;
  /**
   * Icon shown after the main button content.
   */
  endIcon?: JSX.Element;
  /**
   * Passes props to the button label.
   */
  labelProps?: React.ComponentProps<'span'>;
  /**
   * Passes props to the start icon.
   */
  startIconProps?: React.ComponentProps<'span'>;
  /**
   * Passes props to the end icon.
   */
  endIconProps?: React.ComponentProps<'span'>;
  /**
   * Whether the button should stretch to fill the width of the container.
   *
   * This is useful on narrow containers and mobile views.
   */
  stretched?: boolean;
  /**
   * Specify a loading state for the button.
   */
  loading?: boolean;
} & Pick<React.ComponentProps<typeof ButtonBase>, 'htmlDisabled'>;

/**
 * Generic button component
 * @example
 * <Button>This is a default button</Button>
 * <Button disabled={true}>This is a disabled button</Button>
 * <Button size='large' styleType='high-visibility'>This is a large high visibility button</Button>
 * <Button size='small' styleType='cta'>This is a small call to action button</Button>
 * <Button startIcon={<SvgAdd />}>New</Button>
 */
export const Button = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    size,
    styleType = 'default',
    startIcon,
    endIcon,
    labelProps,
    startIconProps,
    endIconProps,
    stretched,
    loading: loading,
    disabled: disabledProp,
    ...rest
  } = props;

  return (
    <ButtonBase
      ref={ref}
      className={cx('iui-button', 'iui-field', className)}
      data-iui-variant={styleType !== 'default' ? styleType : undefined}
      data-iui-size={size}
      data-iui-loading={loading}
      disabled={disabledProp || loading}
      {...rest}
      style={
        {
          '--_iui-width': stretched ? '100%' : undefined,
          ...props.style,
        } as React.CSSProperties
      }
    >
      {startIcon && (
        <Box
          as='span'
          aria-hidden
          {...startIconProps}
          className={cx('iui-button-icon', startIconProps?.className)}
        >
          {startIcon}
        </Box>
      )}

      {children && <span {...labelProps}>{children}</span>}

      {endIcon && (
        <Box
          as='span'
          aria-hidden
          {...endIconProps}
          className={cx('iui-button-icon', endIconProps?.className)}
        >
          {endIcon}
        </Box>
      )}

      {loading && (
        <ProgressRadial
          size='small'
          className='iui-button-spinner'
          aria-hidden
        />
      )}
    </ButtonBase>
  );
}) as PolymorphicForwardRefComponent<'button', ButtonProps>;
