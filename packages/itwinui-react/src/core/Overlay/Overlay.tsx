/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Box, polymorphic, dynamicImport } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';

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

const OverlayComponent = React.forwardRef((props, forwardedRef) => {
  const { content, children, ...rest } = props;

  return (
    <OverlayWrapper ref={forwardedRef} {...rest}>
      <OverlayMessage>{content}</OverlayMessage>
      <OverlayHiddenContent>{children}</OverlayHiddenContent>
    </OverlayWrapper>
  );
}) as PolymorphicForwardRefComponent<'div', OverlayComponentProps>;
OverlayComponent.displayName = 'Overlay';

// --------------------------------------------------------------------------------

const OverlayHiddenContent = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  useInertPolyfill();
  return (
    <Box {...{ inert: '' }} ref={ref} {...rest}>
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div'>;
OverlayHiddenContent.displayName = 'Overlay.HiddenContent';

// --------------------------------------------------------------------------------

const OverlayMessage = polymorphic('iui-overlay');
OverlayMessage.displayName = 'Overlay.Overlay';

// --------------------------------------------------------------------------------

const OverlayWrapper = polymorphic('iui-overlay-wrapper');
OverlayWrapper.displayName = 'Overlay.Wrapper';

// --------------------------------------------------------------------------------

/**
 *
 * This is an Overlay Component.
 *
 *
 * @example
 * <Overlay content="loading">
 * content beneath the overlay... (text, img, etc.)
 * </Overlay>
 *
 *
 * This is an Overlay Component using subcomponents.
 *
 *
 * @example
 * <Overlay.Wrapper>
 *  <Overlay.Overlay>
 *    loading...
 *  <Overlay.Overlay>
 *  <Overlay.HiddenContent>
 *    content beneath the overlay... (text, img, etc.)
 *  <Overlay.HiddenContent />
 * </Overlay.Wrapper>
 *
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

const useInertPolyfill = () => {
  const loaded = React.useRef(false);
  const modulePath =
    'https://cdn.jsdelivr.net/npm/wicg-inert@3.1.2/dist/inert.min.js';

  React.useEffect(() => {
    async () => {
      if (!HTMLElement.prototype.hasOwnProperty('inert') && !loaded.current) {
        await dynamicImport(modulePath);
        loaded.current = true;
      }
    };
  }, []);
};
