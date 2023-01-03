/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';

import { ButtonProps } from '../Button';
import { PolymorphicForwardRefComponent, useTheme } from '../../utils';
import '@itwin/itwinui-css/css/button.css';

export type IconButtonProps = {
  /**
   * Button gets active style.
   * @default false
   */
  isActive?: boolean;
} & Omit<ButtonProps, 'startIcon' | 'endIcon'>;

type IconButtonComponent = PolymorphicForwardRefComponent<
  'button',
  IconButtonProps
>;

/**
 * Icon button
 * @example
 * <IconButton><SvgAdd /></IconButton>
 * <IconButton styleType='borderless'><SvgAdd /></IconButton>
 */
export const IconButton: IconButtonComponent = React.forwardRef(
  (props, ref) => {
    const {
      isActive,
      children,
      styleType = 'default',
      size,
      type = 'button',
      className,
      as: Element = 'button',
      ...rest
    } = props;

    useTheme();

    return (
      <Element
        ref={ref}
        className={cx('iui-button', className)}
        data-iui-variant={styleType !== 'default' ? styleType : undefined}
        data-iui-size={size}
        data-iui-active={isActive}
        type={type}
        {...rest}
      >
        <span className='iui-button-icon' aria-hidden>
          {children}
        </span>
      </Element>
    );
  },
);

export default IconButton;
