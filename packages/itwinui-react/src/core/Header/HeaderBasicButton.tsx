/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import type { ButtonProps } from '../Buttons/Button/Button.js';

export const HeaderBasicButton = React.forwardRef((props, ref) => {
  const {
    onClick,
    className,
    children,
    style,
    startIcon,
    endIcon,
    styleType,
    size,
    ...rest
  } = props;
  styleType; // To omit and prevent eslint error.
  size; // To omit and prevent eslint error.

  return (
    <Box
      as='button'
      className={cx('iui-header-breadcrumb-button', className)}
      onClick={onClick}
      ref={ref}
      type='button'
      style={style}
      {...rest}
    >
      {startIcon}
      {children}
      {endIcon}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'button', ButtonProps>;

export default HeaderBasicButton;
