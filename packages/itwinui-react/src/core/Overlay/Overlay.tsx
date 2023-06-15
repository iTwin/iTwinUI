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

type OverlayComponentProps = {
  /**
   * The sub-component elements of Overlay.
   */
  children?: React.ReactNode;
  /**
   * Placeholder for Progress Indicator in Overlay
   */
  content?: React.ReactNode;
};

// --------------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OverlayComponent = React.forwardRef((props, forwardedRef) => {
  const { content, children, ...rest } = props;

  return (
    <OverlayWrapper {...rest}>
      <OverlayMessage>{content}</OverlayMessage>
      <OverlayHiddenContent>{children}</OverlayHiddenContent>
    </OverlayWrapper>
  );
}) as PolymorphicForwardRefComponent<'div', OverlayComponentProps>;
OverlayComponent.displayName = 'Overlay';

// --------------------------------------------------------------------------------

const OverlayHiddenContent = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return (
    <Box {...{ inert: '', loading: 'lazy' }} ref={ref} {...rest}>
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div'>;
OverlayHiddenContent.displayName = 'Overlay.HiddenContent';

// --------------------------------------------------------------------------------

const OverlayMessage = polymorphic('iui-overlay');
OverlayMessage.displayName = 'Overlay.Overlay';

// --------------------------------------------------------------------------------

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
 * This is an Overlay Component.
 *
 * @example
 * <OverlayWrapper>
 *  <Overlay.Overlay>
 *    loading...
 *  <Overlay.Overlay>
 *  <Overlay.HiddenContent>
 *    content beneath the overlay... (text, img, etc.)
 *  <Overlay.HiddenContent />
 * </OverlayWrapper>
 *
 */
export const Overlay = Object.assign(OverlayComponent, {
  /**
   *
   * The main component is a wrapper to hold the
   * Overlay HiddenContent and Overlay Message.
   */
  Wrapper: OverlayWrapper,
  /**
   * HiddenContent houses page elements that are blurred by the
   * Overlay.
   */
  HiddenContent: OverlayHiddenContent,
  /**
   *  Message contains the progress indicator and loading message
   *  for the Overlay. It sits on top of the HiddenContent.
   */
  Overlay: OverlayMessage,
});
