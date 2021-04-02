/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';

import { ButtonProps } from '../Button';
import { useTheme } from '../../utils/hooks/useTheme';
import '@bentley/itwinui/css/button.css';

export type IconButtonProps = {
  /**
   * Button gets active style.
   * @default false
   */
  isActive?: boolean;
} & Omit<ButtonProps, 'startIcon' | 'endIcon'>;

/**
 * Icon button
 * @example
 * <IconButton><SvgAdd /></IconButton>
 * <IconButton styleType='borderless'><SvgAdd /></IconButton>
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const {
      isActive,
      children,
      styleType = 'default',
      size,
      type = 'button',
      className,
      ...rest
    } = props;

    useTheme();

    return (
      <button
        ref={ref}
        className={cx(
          'iui-button',
          {
            [`iui-${size}`]: !!size,
            [`iui-${styleType}`]: styleType !== 'default',
            'iui-active': isActive,
          },
          className,
        )}
        type={type}
        {...rest}
      >
        {React.cloneElement(children as JSX.Element, {
          className: cx('iui-icon', (children as JSX.Element).props.className),
        })}
      </button>
    );
  },
);

export default IconButton;
