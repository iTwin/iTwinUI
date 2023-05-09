/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { useItwinui } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import type { ButtonProps } from '../Buttons/index.js';

export type HeaderBasicButtonProps = ButtonProps;

type HeaderBasicButtonComponent = PolymorphicForwardRefComponent<
  'button',
  HeaderBasicButtonProps
>;

export const HeaderBasicButton: HeaderBasicButtonComponent = React.forwardRef(
  (props, ref) => {
    const {
      onClick,
      className,
      children,
      style,
      type = 'button',
      startIcon,
      endIcon,
      as: Element = 'button',
      styleType,
      size,
      ...rest
    } = props;
    styleType; // To omit and prevent eslint error.
    size; // To omit and prevent eslint error.
    useItwinui();

    return (
      <Element
        className={cx('iui-header-breadcrumb-button', className)}
        onClick={onClick}
        ref={ref}
        type={type}
        style={style}
        {...rest}
      >
        {startIcon &&
          React.cloneElement(startIcon, {
            className: startIcon.props.className,
          })}
        {children}
        {endIcon &&
          React.cloneElement(endIcon, {
            className: endIcon.props.className,
          })}
      </Element>
    );
  },
);

export default HeaderBasicButton;
