/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box, ButtonBase, useWarningLogger } from '../../utils/index.js';
import { Tooltip } from '../Tooltip/Tooltip.js';
import type { ButtonProps } from './Button.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.js';
import { ButtonGroupContext } from '../ButtonGroup/ButtonGroup.js';
import { PopoverOpenContext } from '../Popover/Popover.js';

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
   * Props passed to the Tooltip that contains the `label`.
   * Can be used for customizing the tooltip's `placement`, etc.
   */
  labelProps?: Omit<
    React.ComponentPropsWithoutRef<typeof Tooltip>,
    'content' | 'reference' | 'ariaStrategy' | 'children'
  >;
  /**
   * Passes props to IconButton icon.
   */
  iconProps?: React.ComponentProps<'span'>;
  /**
   * @deprecated Use `label` instead.
   */
  title?: string;
} & Omit<
  ButtonProps,
  | 'startIcon'
  | 'endIcon'
  | 'startIconProps'
  | 'endIconProps'
  | 'labelProps'
  | 'loading'
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
    title,
    label = title,
    iconProps,
    labelProps,
    ...rest
  } = props;

  const buttonGroupOrientation = React.useContext(ButtonGroupContext);
  const hasPopoverOpen = React.useContext(PopoverOpenContext);

  const logWarning = useWarningLogger();

  if (
    process.env.NODE_ENV === 'development' &&
    !label &&
    !props['aria-label'] &&
    !props['aria-labelledby']
  ) {
    logWarning('IconButton is missing the `label` prop.');
  }

  const button = (
    <ButtonBase
      ref={ref}
      className={cx('iui-button', 'iui-field', className)}
      data-iui-variant={styleType !== 'default' ? styleType : undefined}
      data-iui-size={size}
      data-iui-active={isActive}
      data-iui-has-popover={hasPopoverOpen ? 'open' : undefined}
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
  );

  return label ? (
    <Tooltip
      placement={buttonGroupOrientation === 'vertical' ? 'right' : 'top'}
      {...labelProps}
      content={label}
      ariaStrategy='none'
    >
      {button}
    </Tooltip>
  ) : (
    button
  );
}) as PolymorphicForwardRefComponent<'button', IconButtonProps>;
if (process.env.NODE_ENV === 'development') {
  IconButton.displayName = 'IconButton';
}
