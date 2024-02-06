/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { polymorphic } from '../utils/functions/polymorphic.js';
import type { PolymorphicForwardRefComponent } from '../utils/props.js';
import { Box } from '../utils/components/index.js';

/**
 * Polymorphic link action component.
 * It is rendered as `a` by default.
 * @example
 * <LinkBox>
 *   <Surface>
 *     <LinkAction href='/new-page'>Whole card is clickable</LinkAction>
 *   </Surface>
 * </LinkBox>
 */
export const LinkAction = React.forwardRef((props, forwardedRef) => {
  return (
    <Box
      as={(!!props.href ? 'a' : 'button') as 'a'}
      {...props}
      className={cx('iui-link-action', props.className)}
      ref={forwardedRef}
    />
  );
}) as PolymorphicForwardRefComponent<'a'>;
LinkAction.displayName = 'LinkAction';

/**
 * Polymorphic link box component.
 * Used to wrap around your component to use LinkAction.
 * Rendered as `div` by default
 * @example
 * <LinkBox>
 *   <Surface>
 *     <LinkAction href='/new-page'>Whole card is clickable</LinkAction>
 *   </Surface>
 * </LinkBox>
 */
export const LinkBox = polymorphic.div('iui-link-box');
LinkBox.displayName = 'LinkBox';
