/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import type { PolymorphicForwardRefComponent } from '../../utils/props.js';
import { Box, ShadowRoot, useHydration } from '../../utils/index.js';

type VisuallyHiddenOwnProps = {
  /**
   * When VisuallyHidden is used with an interactive element (e.g. button),
   * that element will "unhide" (become visible again) when focused.
   *
   * @default true
   */
  unhideOnFocus?: boolean;
};

/**
 * Hides content visually but keeps it still accessible to screen readers
 * and other assistive technologies.
 *
 * @example
 * <div aria-hidden='true'>★★★☆☆</div>
 * <VisuallyHidden>3 stars out of 5</VisuallyHidden>
 *
 * @see https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html
 */
export const VisuallyHidden = React.forwardRef((props, ref) => {
  const {
    as: asProp = 'span',
    className,
    unhideOnFocus = true,
    children: childrenProp,
    ...rest
  } = props;

  const isHydrated = useHydration() === 'hydrated';

  // ShadowRoot is not supported on all elements, so we only use it for few common ones.
  const children = !['div', 'span', 'p'].includes(asProp) ? (
    childrenProp
  ) : (
    <>
      <ShadowRoot css={css}>
        <slot />
      </ShadowRoot>

      {/* Render childrenProp only after ShadowRoot attaches the shadow DOM (i.e. after hydration) */}
      {/* See: https://github.com/iTwin/iTwinUI/issues/1930 */}
      {isHydrated && childrenProp}
    </>
  );

  return (
    <Box
      as={asProp}
      className={cx('iui-visually-hidden', className)}
      data-iui-unhide-on-focus={unhideOnFocus ? true : undefined}
      ref={ref}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'span', VisuallyHiddenOwnProps>;

// ----------------------------------------------------------------------------

const css = /* css */ `
  :host(:where(:not([data-iui-unhide-on-focus]:is(:focus-within, :active)))) {
    clip-path: inset(50%) !important;
    overflow: hidden !important;
    position: absolute !important;
    white-space: nowrap !important;
    block-size: 1px !important;
    inline-size: 1px !important;
  }
`;
