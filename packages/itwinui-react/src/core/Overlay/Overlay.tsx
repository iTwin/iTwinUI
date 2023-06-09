/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import {
  Box,
  polymorphic,
  type PolymorphicForwardRefComponent,
} from '../utils/index.js';
import cx from 'classnames';

// return a box with no class name that has inert

export const OverlayHiddenContent = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return (
    <Box ref={ref} {...rest}>
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div'>;

// return a div with iui-progress-indicator-overlay

export const OverlayMessage = polymorphic('iui-overlay');
OverlayMessage.displayName = 'Overlay.Message';

export const Overlay = React.forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <Box className={cx('iui-overlay-wrapper', className)} ref={ref} {...rest}>
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div'>;

export default Overlay;
