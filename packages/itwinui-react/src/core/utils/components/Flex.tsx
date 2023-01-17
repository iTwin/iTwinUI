/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import type { AnyString } from '../types';
import type {
  PolymorphicComponentProps,
  PolymorphicForwardRefComponent,
} from '../props';
import '@itwin/itwinui-css/css/utils.css';

const sizeTokens = [
  '3xs',
  '2xs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  '2xl',
  '3xl',
] as const;
type SizeToken = typeof sizeTokens[number];

const getValueForToken = (token?: string) => {
  if (sizeTokens.includes(token as SizeToken)) {
    return `var(--iui-size-${token})`;
  }
  return token;
};

export type FlexProps = PolymorphicComponentProps<'div', FlexOwnProps>;

type FlexOwnProps = {
  /**
   * Value of the `display` property.
   * @default 'flex'
   */
  display?: 'flex' | 'inline-flex';
  /**
   * Value of the `justify-content` property.
   */
  justifyContent?: React.CSSProperties['justifyContent'];
  /**
   * Value of the `align-items` property. Defaults to 'center' but you
   * might want to use 'flex-start' in some cases.
   * @default 'center'
   */
  alignItems?: React.CSSProperties['alignItems'];
  /**
   * Value of the `gap` property.
   *
   * Supports aliases for iTwinUI size tokens:
   * 3xs, 2xs, xs, s, m, l, xl, 2xl, 3xl
   *
   * Also accepts any valid css value (e.g. "1rem" or "2px")
   */
  gap?: SizeToken | AnyString;
  /**
   * Value of the `direction` property.
   * @default 'row'
   */
  direction?: React.CSSProperties['flexDirection'];
};

const FlexComponent = React.forwardRef((props, ref) => {
  const {
    as: Element = 'div',
    display,
    direction,
    justifyContent,
    alignItems,
    gap,
    className,
    style,
    ...rest
  } = props;

  return (
    <Element
      className={cx('iui-flex', className)}
      style={
        {
          '--iui-flex-display': display,
          '--iui-flex-direction': direction,
          '--iui-flex-justify': justifyContent,
          '--iui-flex-align': alignItems,
          '--iui-flex-gap': getValueForToken(gap),
          ...style,
        } as React.CSSProperties
      }
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', FlexOwnProps>;

const FlexSpacer = React.forwardRef((props, ref) => {
  const { as: Element = 'div', flex, className, style, ...rest } = props;
  return (
    <Element
      className={cx('iui-flex-spacer', className)}
      style={
        {
          '--iui-flex-spacer-flex': flex,
          ...style,
        } as React.CSSProperties
      }
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', FlexSpacerOwnProps>;
type FlexSpacerOwnProps = {
  /**
   * Value of the `flex` css property.
   *
   * This may need to be adjusted if you're also setting `flex` on
   * other `Flex.Item`s.
   *
   * @default 999
   */
  flex?: React.CSSProperties['flex'];
};

const FlexItem = React.forwardRef((props, ref) => {
  const {
    as: Element = 'div',
    gapBefore,
    gapAfter,
    flex,
    className,
    style,
    ...rest
  } = props;

  const _style = {
    '--iui-flex-item-flex': flex,
    '--iui-flex-item-gap-before': getValueForToken(gapBefore),
    '--iui-flex-item-gap-after': getValueForToken(gapAfter),
    '--iui-flex-item-gap-before-toggle':
      gapBefore !== undefined ? 'var(--iui-on)' : undefined,
    '--iui-flex-item-gap-after-toggle':
      gapAfter !== undefined ? 'var(--iui-on)' : undefined,
    ...style,
  } as React.CSSProperties;

  return (
    <Element
      className={cx('iui-flex-item', className)}
      ref={ref}
      style={_style}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', FlexItemOwnProps>;
type FlexItemOwnProps = {
  /**
   * Gap before the flex item, if different from the `gap` set on `Flex` component.
   */
  gapBefore?: SizeToken & AnyString;
  /**
   * Gap after the flex item, if different from the `gap` set on `Flex` component.
   */
  gapAfter?: SizeToken & AnyString;
  /**
   * Value of the `flex` css property.
   *
   * @default auto
   */
  flex?: React.CSSProperties['flex'];
};

/**
 * A utility component that makes it easier to work with
 * css flexbox and iTwinUI design tokens.
 */
export const Flex = Object.assign(FlexComponent, {
  Spacer: FlexSpacer,
  Item: FlexItem,
});

export default Flex;
