/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';

import {
  useTheme,
  PolymorphicComponentProps,
  PolymorphicForwardRefComponent,
} from '../../utils';
import '@itwin/itwinui-css/css/button.css';

type ButtonOwnProps = {
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
  children?: React.ReactNode;
};

export type ButtonProps<T extends React.ElementType = 'button'> =
  PolymorphicComponentProps<T, ButtonOwnProps>;

type ButtonComponent = PolymorphicForwardRefComponent<'button', ButtonOwnProps>;

/**
 * Generic button component
 * @example
 * <Button>This is a default button</Button>
 * <Button disabled={true}>This is a disabled button</Button>
 * <Button size='large' styleType='high-visibility'>This is a large high visibility button</Button>
 * <Button size='small' styleType='cta'>This is a small call to action button</Button>
 * <Button startIcon={<SvgAdd />}>New</Button>
 */
export const Button: ButtonComponent = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    size,
    style,
    styleType = 'default',
    type = 'button',
    startIcon,
    endIcon,
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
      style={style}
      type={type}
      {...rest}
    >
      {startIcon && (
        <span className='iui-button-icon' aria-hidden>
          {startIcon}
        </span>
      )}

      {children && <span>{children}</span>}

      {endIcon && (
        <span className='iui-button-icon' aria-hidden>
          {endIcon}
        </span>
      )}
    </Element>
  );
});

export default Button;
