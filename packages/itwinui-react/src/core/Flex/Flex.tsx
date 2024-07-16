/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import type { AnyString } from '../../utils/types.js';
import type { PolymorphicForwardRefComponent } from '../../utils/props.js';
import { Box } from '../../utils/components/Box.js';

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

/**
 * String literal shorthands that correspond to the size tokens in [itwinui-variables](https://github.com/iTwin/iTwinUI/blob/main/packages/itwinui-variables/src/sizes.scss).
 */
type SizeToken = (typeof sizeTokens)[number];

const getValueForToken = (token?: string) => {
  if (sizeTokens.includes(token as (typeof sizeTokens)[number])) {
    return `var(--iui-size-${token})`;
  }
  return token;
};

// ----------------------------------------------------------------------------
// Main Flex component

const FlexComponent = React.forwardRef((props, ref) => {
  const {
    display,
    flexDirection,
    justifyContent,
    alignItems,
    gap,
    flexWrap,
    className,
    style,
    ...rest
  } = props;

  return (
    <Box
      className={cx('iui-flex', className)}
      style={
        {
          '--iui-flex-display': display,
          '--iui-flex-direction': flexDirection,
          '--iui-flex-justify': justifyContent,
          '--iui-flex-align': alignItems,
          '--iui-flex-gap': getValueForToken(gap),
          '--iui-flex-wrap': flexWrap,
          ...style,
        } as React.CSSProperties
      }
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', FlexOwnProps>;
if (process.env.NODE_ENV === 'development') {
  FlexComponent.displayName = 'Flex';
}

type FlexOwnProps = {
  /**
   * Value of the `display` property.
   * @default 'flex'
   */
  display?: 'flex' | 'inline-flex';
  /**
   * Value of the `justify-content` property.
   * @default 'flex-start'
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
   *
   * @default 'xs'
   */
  gap?: SizeToken | AnyString;
  /**
   * Value of the `direction` property.
   * @default 'row'
   */
  flexDirection?: React.CSSProperties['flexDirection'];
  /**
   * Value of the `flex-wrap` property.
   * @default 'nowrap'
   */
  flexWrap?: React.CSSProperties['flexWrap'];
};

// ----------------------------------------------------------------------------
// Flex.Spacer component

const FlexSpacer = React.forwardRef((props, ref) => {
  const { flex, className, style, ...rest } = props;
  return (
    <Box
      className={cx('iui-flex-spacer', className)}
      style={
        { '--iui-flex-spacer-flex': flex, ...style } as React.CSSProperties
      }
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', FlexSpacerOwnProps>;
if (process.env.NODE_ENV === 'development') {
  FlexSpacer.displayName = 'Flex.Spacer';
}

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

// ----------------------------------------------------------------------------
// Flex.Item subcomponent

const FlexItem = React.forwardRef((props, ref) => {
  const { gapBefore, gapAfter, flex, alignSelf, className, style, ...rest } =
    props;

  const _style = {
    '--iui-flex-item-flex': flex,
    '--iui-flex-item-align': alignSelf,
    '--iui-flex-item-gap-before': getValueForToken(gapBefore),
    '--iui-flex-item-gap-after': getValueForToken(gapAfter),
    ...(gapBefore !== undefined && {
      '--iui-flex-item-gap-before-toggle': 'var(--iui-on)',
    }),
    ...(gapAfter !== undefined && {
      '--iui-flex-item-gap-after-toggle': 'var(--iui-on)',
    }),
    ...style,
  } as React.CSSProperties;

  return (
    <Box
      className={cx('iui-flex-item', className)}
      ref={ref}
      style={_style}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', FlexItemOwnProps>;
if (process.env.NODE_ENV === 'development') {
  FlexItem.displayName = 'Flex.Item';
}

type FlexItemOwnProps = {
  /**
   * Gap before the flex item, if different from the `gap` set on `Flex` component.
   */
  gapBefore?: SizeToken | AnyString;
  /**
   * Gap after the flex item, if different from the `gap` set on `Flex` component.
   */
  gapAfter?: SizeToken | AnyString;
  /**
   * Value of the `flex` css property.
   * @default 'auto'
   */
  flex?: React.CSSProperties['flex'];
  /**
   * Value of the `align-self` css property.
   * @default 'auto'
   */
  alignSelf?: React.CSSProperties['alignSelf'];
};

// ----------------------------------------------------------------------------
// Exported compound component

/**
 * A utility component that makes it easier to work with CSS flexbox
 * and iTwinUI design tokens. Supports all flex properties.
 * Can be used with or without `Flex.Item` and `Flex.Spacer` subcomponents.
 *
 * @example
 * <Flex>
 *   <Icon>...</Icon>
 *   <Text>...</Text>
 *   <Flex.Spacer />
 *   <IconButton>...</IconButton>
 * </Flex>
 *
 * @example
 * <Flex gap='m' flexWrap='wrap'>
 *   <Flex.Item>...</Flex.Item>
 *   <Flex.Item>...</Flex.Item>
 *   ...
 * </Flex>
 *
 * @example
 * <Flex gap='l'>
 *   <Flex.Item>...</Flex.Item>
 *   <Flex.Item>...</Flex.Item>
 *   <Flex.Item gapBefore='s'>...</Flex.Item>
 *   <Flex.Item>...</Flex.Item>
 * </Flex>
 */
export const Flex = Object.assign(FlexComponent, {
  /**
   * Subcomponent that allows customizing flex items through the
   * `flex`, `alignSelf` and `gapBefore`/`gapAfter` props.
   *
   * The `gapBefore`/`gapAfter` props can used to override the gap at an
   * individual level, for when you need a different gap than the one
   * set in the parent `Flex`.
   *
   * @example
   * <Flex gap='l'>
   *   <Flex.Item>...</Flex.Item>
   *   <Flex.Item>...</Flex.Item>
   *   <Flex.Item gapBefore='s'>...</Flex.Item>
   *   <Flex.Item>...</Flex.Item>
   * </Flex>
   */
  Item: FlexItem,
  /**
   * Subcomponent that fills up the available space using a really large `flex` value.
   * Useful when you want to push certain items to one edge.
   *
   * @example
   * <Flex>
   *   <div>this stays on the left</div>
   *   <Flex.Spacer /> // this fills up the available empty space
   *   <div>this gets pushed all the way to the end</div>
   * </Flex>
   */
  Spacer: FlexSpacer,
});
