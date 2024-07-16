/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box, polymorphic } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type OverlayComponentProps = {
  /**
   * Page elements that are blurred by the Overlay. Will become blurred and inert.
   */
  children?: React.ReactNode;
  /**
   * Content shown inside the Overlay, on top of the blurred content.
   *
   * Can be used to show a loading indicator.
   */
  content?: React.ReactNode;
};

// --------------------------------------------------------------------------------

const OverlayComponent = React.forwardRef((props, forwardedRef) => {
  const { content, children, ...rest } = props;

  return (
    <OverlayWrapper ref={forwardedRef} {...rest}>
      <OverlayOverlay>{content}</OverlayOverlay>
      <OverlayHiddenContent>{children}</OverlayHiddenContent>
    </OverlayWrapper>
  );
}) as PolymorphicForwardRefComponent<'div', OverlayComponentProps>;
if (process.env.NODE_ENV === 'development') {
  OverlayComponent.displayName = 'Overlay';
}

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
if (process.env.NODE_ENV === 'development') {
  OverlayHiddenContent.displayName = 'Overlay.HiddenContent';
}

// --------------------------------------------------------------------------------

const OverlayOverlay = polymorphic('iui-overlay');
if (process.env.NODE_ENV === 'development') {
  OverlayOverlay.displayName = 'Overlay.Overlay';
}

// --------------------------------------------------------------------------------

const OverlayWrapper = polymorphic('iui-overlay-wrapper');
if (process.env.NODE_ENV === 'development') {
  OverlayWrapper.displayName = 'Overlay.Wrapper';
}

// --------------------------------------------------------------------------------

/**
 * The Overlay component can be used to hide some UI while its content is loading or revalidating,
 * and display a loading indicator on top of it.
 *
 * The hidden content gets blurred and becomes inert so it cannot be interacted with.
 *
 * @example
 * <Overlay content="loading…">
 *   content beneath the overlay… (text, img, etc.)
 * </Overlay>
 *
 * @example
 * <Overlay.Wrapper>
 *   <Overlay.Overlay>
 *     loading…
 *   <Overlay.Overlay>
 *   <Overlay.HiddenContent>
 *     content beneath the overlay… (text, img, etc.)
 *   <Overlay.HiddenContent />
 * </Overlay.Wrapper>
 */
export const Overlay = Object.assign(OverlayComponent, {
  /**
   * The main component is a wrapper to hold the
   * `Overlay.HiddenContent` and `Overlay.Overlay`.
   */
  Wrapper: OverlayWrapper,
  /**
   * `Overlay.HiddenContent` houses page elements that are blurred by the
   * Overlay. These elements will become inert when the overlay is active.
   */
  HiddenContent: OverlayHiddenContent,
  /**
   * `Overlay.Overlay` sits on top of the HiddenContent, and can show
   * any arbitrary content like a progress indicator and loading message.
   */
  Overlay: OverlayOverlay,
});

const useInertPolyfill = () => {
  const loaded = React.useRef(false);
  const modulePath =
    'https://cdn.jsdelivr.net/npm/wicg-inert@3.1.2/dist/inert.min.js';

  React.useEffect(() => {
    (async () => {
      if (!HTMLElement.prototype.hasOwnProperty('inert') && !loaded.current) {
        await import(/* webpackIgnore: true */ /* @vite-ignore */ modulePath);
        loaded.current = true;
      }
    })();
  }, []);
};
