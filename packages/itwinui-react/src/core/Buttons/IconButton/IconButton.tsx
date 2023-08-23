/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { VisuallyHidden, Box, ButtonBase } from '../../utils/index.js';
import type { ButtonProps } from '../Button/Button.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { Tooltip } from '../../Tooltip/Tooltip.js';

export type IconButtonProps = {
  /**
   * Button gets active style.
   * @default false
   */
  isActive?: boolean;
  /**
   * Name of the button, shown in a tooltip and exposed to assistive technologies.
   */
  label?: React.ReactNode;
  /**
   * Passes props to IconButton icon.
   */
  iconProps?: React.ComponentProps<'span'>;
} & Omit<
  ButtonProps,
  'startIcon' | 'endIcon' | 'startIconProps' | 'endIconProps' | 'labelProps'
>;

/**
 * Icon button
 * @example
 * <IconButton label='Add'><SvgAdd /></IconButton>
 * @example
 * <IconButton label='Add' styleType='borderless'><SvgAdd /></IconButton>
 */
export const IconButton = React.forwardRef((props, ref) => {
  const {
    isActive,
    children,
    styleType = 'default',
    size,
    className,
    label,
    iconProps,
    ...rest
  } = props;

  return (
    <IconButtonTooltip label={label}>
      <ButtonBase
        ref={ref}
        className={cx('iui-button', className)}
        data-iui-variant={styleType !== 'default' ? styleType : undefined}
        data-iui-size={size}
        data-iui-active={isActive}
        aria-pressed={isActive}
        {...rest}
      >
        <Box
          as='span'
          aria-hidden
          {...iconProps}
          className={cx('iui-button-icon', iconProps?.className)}
        >
          {children}
        </Box>
        {label ? <VisuallyHidden>{label}</VisuallyHidden> : null}
      </ButtonBase>
    </IconButtonTooltip>
  );
}) as PolymorphicForwardRefComponent<'button', IconButtonProps>;

const IconButtonTooltip = (props: {
  label?: React.ReactNode;
  children: React.ReactElement;
}) => {
  const { label, children } = props;

  return label ? (
    <Tooltip content={label} aria-hidden>
      {React.cloneElement(children, { 'aria-describedby': undefined })}
    </Tooltip>
  ) : (
    children
  );
};

export default IconButton;
