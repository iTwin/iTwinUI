/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { Box } from './Box.js';
import { Icon } from '../../core/Icon/Icon.js';
import { IconButton } from '../../core/Buttons/IconButton.js';
import type { IconProps } from '../../core/Icon/Icon.js';
import type { IconButtonProps } from '../../core/Buttons/IconButton.js';

export type InputFlexContainerProps = {
  isDisabled?: boolean;
  status?: 'positive' | 'warning' | 'negative';
  size?: 'small' | 'large';
};

/**
 * Utility component for input container with display flex abilities.
 * @private
 */
export const InputFlexContainer = React.forwardRef((props, ref) => {
  const { isDisabled, status, children, className, size, style, ...rest } =
    props;

  return (
    <Box
      className={cx('iui-input-flex-container', className)}
      data-iui-status={status}
      data-iui-size={size}
      data-iui-disabled={isDisabled ? 'true' : undefined}
      ref={ref}
      style={style}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', InputFlexContainerProps>;

/**
 * Button inside InputFlexContainer that collapses the padding between the button and the input/textarea.
 * @private
 */
export const InputFlexContainerButton = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <IconButton
      ref={ref}
      className={cx('iui-input-flex-container-icon', className)}
      styleType='borderless'
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<
  'button',
  Omit<IconButtonProps, 'styleType'> & {
    /**
     * Style of the button.
     * Use 'borderless' to hide outline.
     * @default 'borderless'
     */
    styleType?: IconButtonProps['styleType'];
  }
>;

/**
 * Icon inside InputFlexContainer that collapses the padding between the icon and the input/textarea.
 * @private
 */
export const InputFlexContainerIcon = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <Icon
      ref={ref}
      className={cx('iui-input-flex-container-icon', className)}
      padded
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<
  'span',
  Omit<IconProps, 'padded'> & {
    /**
     * Option to add padding to the icon.
     * @default true
     */
    padded?: IconProps['padded'];
  }
>;
