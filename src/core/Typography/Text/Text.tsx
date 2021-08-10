/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useTheme } from '../../utils/hooks/useTheme';
import { CommonProps } from '../../utils/props';
import '@itwin/itwinui-css/css/text.css';

type TextOwnProps<T extends React.ElementType | React.ComponentType = 'div'> = {
  /**
   * What element should the text be rendered as?
   * @default 'div'
   */
  as?: T;
  /**
   * Which typography variant/size should be used for the styling?
   *
   * 'headline' = h1,
   * 'title' = h2,
   * 'subheading' = h3,
   * 'leading' = h4,
   * 'body' = normal paragraph text,
   * 'small' = smaller text
   *
   * @default 'body'
   */
  variant?: 'headline' | 'title' | 'subheading' | 'leading' | 'body' | 'small';
  /**
   * Show text in muted style.
   * @default false
   */
  isMuted?: boolean;
  /**
   * Use it if you are still loading the content.
   * @default false
   */
  isSkeleton?: boolean;
} & CommonProps;

export type TextProps<
  T extends React.ElementType | React.ComponentType = 'div'
> = TextOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TextOwnProps<T>>;

/**
 * Polymorphic typography component to render any kind of text as any kind of element.
 * @example
 * <Text>Some normal paragraph text rendered as a div</Text>
 * @example
 * <Text variant='title' as='h3'>I'm some h2 text rendered as an h3 element!</Text>
 * @example
 * <Text isMuted>Some muted text.</Text>
 * <Text isSkeleton>Skeleton text</Text>
 */
export const Text = <T extends React.ElementType | React.ComponentType = 'div'>(
  props: TextProps<T>,
) => {
  const {
    variant = 'body',
    as: Element = 'div',
    className,
    isMuted = false,
    isSkeleton = false,
    ...rest
  } = props;

  useTheme();

  return (
    <Element
      className={cx(
        {
          [`iui-text-${variant}`]: variant !== 'body',
          'iui-text-block': variant === 'body',
          'iui-text-muted': isMuted,
          'iui-skeleton': isSkeleton,
        },
        className,
      )}
      {...rest}
    />
  );
};

export default Text;
