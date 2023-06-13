/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import {
  polymorphic,
  type PolymorphicForwardRefComponent,
} from '../utils/index.js';
import cx from 'classnames';

// return a box with no class name that has inert

const OverlayHiddenContent = React.forwardRef((props, ref) => {
  const { as: Box = 'div', children, ...rest } = props;
  return (
    <Box custom-attribute='inert' ref={ref} {...rest}>
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div'>;
OverlayHiddenContent.displayName = 'Overlay.HiddenContent';

// return a div with iui-progress-indicator-overlay

const OverlayMessage = polymorphic('iui-overlay');
OverlayMessage.displayName = 'Overlay.Message';

// return a div with iui-overlay-wrapper and children

const OverlayWrapper = React.forwardRef((props, ref) => {
  const { as: Box = 'div', children, className, ...rest } = props;
  return (
    <Box className={cx('iui-overlay-wrapper', className)} ref={ref} {...rest}>
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div'>;
OverlayWrapper.displayName = 'Overlay.Wrapper';

// --------------------------------------------------------------------------------
/**
 *
 * This is an Overlay Component. The main component is a wrapper to hold
 * the Overlay HiddenContent and Overlay Message.
 *
 * @example
 * <OverlayWrapper>
 *  <Overlay.Message>
 *    loading...
 *  <Overlay.Message>
 *  <Overlay.HiddenComponent>
 *    content beneath the overlay... (text, img, etc.)
 *  <Overlay.HiddenComponent />
 * </OverlayWrapper>
 *
 */
export const Overlay = Object.assign(OverlayWrapper, {
  /**
   * HiddenContent houses page elements that are blurred by the
   * Overlay.
   */
  HiddenContent: OverlayHiddenContent,
  /**
   *  Message contains the progress indicator and loading message
   *  for the Overlay. It sits on top of the HiddenContent.
   */
  Message: OverlayMessage,
});
