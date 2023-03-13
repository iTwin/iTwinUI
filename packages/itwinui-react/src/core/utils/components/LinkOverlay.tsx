/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  PolymorphicComponentProps,
  PolymorphicForwardRefComponent,
} from '../props';

type LinkOverlayOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types
type LinkBoxOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

export type PolymorphicLinkOverlayProps = PolymorphicComponentProps<
  'a',
  LinkOverlayOwnProps
>;

export type PolymorphicLinkBoxProps = PolymorphicComponentProps<
  'div',
  LinkBoxOwnProps
>;

/**
 * Polymorphic link overlay component.
 * It is rendered as `a` by default.
 */
export const LinkOverlay = React.forwardRef((props, ref) => {
  const { as: Element = 'a', className, ...rest } = props;
  return (
    <Element
      ref={ref}
      className={cx('iui-link-overlay', className)}
      {...rest}
    />
  );
  // eslint-disable-next-line @typescript-eslint/ban-types
}) as PolymorphicForwardRefComponent<'a', LinkOverlayOwnProps>;

LinkOverlay.displayName = 'LinkOverlay';

export const LinkBox = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, ...rest } = props;
  return (
    <Element ref={ref} className={cx('iui-link-box', className)} {...rest} />
  );
  // eslint-disable-next-line @typescript-eslint/ban-types
}) as PolymorphicForwardRefComponent<'div', LinkBoxOwnProps>;

LinkBox.displayName = 'LinkBox';
