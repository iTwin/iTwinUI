/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { VisuallyHidden, Box } from '../../utils/index.js';
import type { ButtonProps } from '../Button/Button.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { Tooltip } from '../../Tooltip/index.js';

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
} & Omit<ButtonProps, 'startIcon' | 'endIcon'>;

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
    type = 'button',
    className,
    label,
    ...rest
  } = props;

  return (
    <IconButtonTooltip label={label}>
      <Box
        as='button'
        ref={ref}
        className={cx('iui-button', className)}
        data-iui-variant={styleType !== 'default' ? styleType : undefined}
        data-iui-size={size}
        data-iui-active={isActive}
        aria-pressed={isActive}
        type={type}
        {...rest}
      >
        <Box as='span' className='iui-button-icon' aria-hidden>
          {children}
        </Box>
        {label ? <VisuallyHidden>{label}</VisuallyHidden> : null}
      </Box>
    </IconButtonTooltip>
  );
}) as PolymorphicForwardRefComponent<'button', IconButtonProps>;

const IconButtonTooltip = (props: {
  label?: React.ReactNode;
  children: React.ReactElement;
}) => {
  const { label, children } = props;

  return label ? (
    <Tooltip aria-hidden='true' content={label}>
      {children}
    </Tooltip>
  ) : (
    children
  );
};

export default IconButton;
