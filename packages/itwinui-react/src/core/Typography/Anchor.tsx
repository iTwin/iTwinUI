/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import cx from 'classnames';
import { Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.js';

type AnchorProps = {
  /**
   * Whether the anchor links to an external site.
   *
   * When true, there will be an icon added at the end of the anchor text.
   */
  isExternal?: boolean;
};

/**
 * A consistently styled anchor component.
 *
 * Supports polymorphic `as` prop for use with `Link` components from routers,
 * or to render as a button.
 *
 * @example
 * <Anchor href='/'>Home</Anchor>
 * <Anchor href='/projects'>Projects</Anchor>
 *
 * @example
 * <Anchor as={Link} to='/'>Home</Anchor>
 * <Anchor as='button' onClick={() => {}}>click me</Anchor>
 */
export const Anchor = React.forwardRef((props, forwardedRef) => {
  const { isExternal, children, ...rest } = props;

  return (
    <Box
      as='a'
      {...rest}
      ref={forwardedRef}
      className={cx(
        'iui-anchor',
        { 'iui-anchor-external': isExternal },
        props.className,
      )}
    >
      {children}
      {props.target === '_blank' && (
        <VisuallyHidden> (opens in new tab)</VisuallyHidden>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'a', AnchorProps>;
