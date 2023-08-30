/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { Box } from './Box.js';

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
