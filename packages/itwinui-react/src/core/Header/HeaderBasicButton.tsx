/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { ButtonBase } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import type { ButtonProps } from '../Buttons/Button.js';

export const HeaderBasicButton = React.forwardRef((props, ref) => {
  const { className, children, startIcon, endIcon, styleType, size, ...rest } =
    props;
  styleType; // To omit and prevent eslint error.
  size; // To omit and prevent eslint error.

  return (
    <ButtonBase
      className={cx('iui-header-breadcrumb-button', className)}
      ref={ref}
      {...rest}
    >
      {startIcon}
      {children}
      {endIcon}
    </ButtonBase>
  );
}) as PolymorphicForwardRefComponent<'button', ButtonProps>;

export default HeaderBasicButton;
