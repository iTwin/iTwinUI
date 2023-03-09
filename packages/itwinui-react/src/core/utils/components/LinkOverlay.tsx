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

export type PolymorphicActionProps = PolymorphicComponentProps<
  'a',
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
>;

/**
 * Polymorphic action component.
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
}) as PolymorphicForwardRefComponent<'a', {}>;

LinkOverlay.displayName = 'LinkOverlay';

export const LinkBox = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, ...rest } = props;
  return (
    <Element ref={ref} className={cx('iui-link-box', className)} {...rest} />
  );
  // eslint-disable-next-line @typescript-eslint/ban-types
}) as PolymorphicForwardRefComponent<'div', {}>;

LinkBox.displayName = 'LinkBox';
