/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  PolymorphicComponentProps,
  PolymorphicForwardRefComponent,
  useTheme,
} from '../../utils';
import '@itwin/itwinui-css/css/anchor.css';

type AnchorOwnProps = Record<never, never>;

export type AnchorProps<T extends React.ElementType = 'a'> =
  PolymorphicComponentProps<T, AnchorOwnProps>;

type AnchorComponent = PolymorphicForwardRefComponent<'a', AnchorOwnProps>;

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
export const Anchor = React.forwardRef((props, ref) => {
  const { as: Element = 'a', className, ...rest } = props;

  useTheme();

  return (
    <Element className={cx('iui-anchor', className)} ref={ref} {...rest} />
  );
}) as AnchorComponent;

export default Anchor;
