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

type LinkActionOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types
type LinkBoxOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

export type LinkActionProps = PolymorphicComponentProps<
  'a',
  LinkActionOwnProps
>;

export type LinkBoxProps = PolymorphicComponentProps<'div', LinkBoxOwnProps>;

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
export const LinkAction = React.forwardRef((props, ref) => {
  const { as: Element = 'a', className, ...rest } = props;
  return (
    <Element ref={ref} className={cx('iui-link-action', className)} {...rest} />
  );
}) as PolymorphicForwardRefComponent<'a', LinkActionOwnProps>;

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
export const LinkBox = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, ...rest } = props;
  return (
    <Element ref={ref} className={cx('iui-link-box', className)} {...rest} />
  );
}) as PolymorphicForwardRefComponent<'div', LinkBoxOwnProps>;

LinkBox.displayName = 'LinkBox';
