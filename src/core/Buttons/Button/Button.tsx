/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';

import { useTheme } from '../../utils/hooks/useTheme';
import '@bentley/itwinui/css/buttons.css';

export type ButtonProps = {
  /**
   * Modify size of the button.
   */
  size?: 'small' | 'large';
  /**
   * Style of the button.
   * @default 'default'
   */
  styleType?: 'cta' | 'high-visibility' | 'default';
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
      ...rest
    } = props;

    useTheme();

    let buttonClass = `iui-buttons-${styleType}`;
    if (!!size) {
      buttonClass = `${buttonClass}-${size}`;
    }

    return (
      <button
        ref={ref}
        className={cx(buttonClass, className)}
        style={style}
        type={type}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export default Button;
