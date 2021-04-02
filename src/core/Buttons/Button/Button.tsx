/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';

import { useTheme } from '../../utils/hooks/useTheme';
import '@bentley/itwinui/css/button.css';

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
   * Content of the button.
   */
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Generic button component
 * @example
 * <Button>This is a default button</Button>
 * <Button disabled={true}>This is a disabled button</Button>
 * <Button size='large' styleType='high-visibility'>This is a large high visibility button</Button>
 * <Button size='small' styleType='cta'>This is a small call to action button</Button>
 * <Button startIcon={<SvgAdd />}>New</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      className,
      size,
      style,
      styleType = 'default',
      type = 'button',
      startIcon,
      endIcon,
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
          },
          className,
        )}
        style={style}
        type={type}
        {...rest}
      >
        {startIcon &&
          React.cloneElement(startIcon, {
            className: cx('iui-icon', startIcon.props.className),
          })}

        <span className='iui-label'>{children}</span>

        {endIcon &&
          React.cloneElement(endIcon, {
            className: cx('iui-icon', endIcon.props.className),
          })}
      </button>
    );
  },
);

export default Button;
