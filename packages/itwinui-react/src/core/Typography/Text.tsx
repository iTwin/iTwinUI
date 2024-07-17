/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type TextProps = {
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
};

// ----------------------------------------------------------------------------

/**
 * Polymorphic typography component to render any kind of text as any kind of element.
 * Users should decide which element to render based on the context of their app. Link to heading levels docs: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements#accessibility_concerns
 *
 * @example
 * <Text>Some normal paragraph text rendered as a div</Text>
 * @example
 * <Text variant='title' as='h3'>I'm some h2 text rendered as an h3 element!</Text>
 * @example
 * <Text isMuted>Some muted text.</Text>
 * <Text isSkeleton>Skeleton text</Text>
 */
export const Text = React.forwardRef((props, ref) => {
  const {
    variant = 'body',
    className,
    isMuted = false,
    isSkeleton = false,
    ...rest
  } = props;

  return (
    <TextContext.Provider value={true}>
      <Box
        className={cx(
          {
            [`iui-text-${variant}`]: variant !== 'body',
            'iui-text-block': variant === 'body',
            'iui-text-muted': isMuted,
            'iui-skeleton': isSkeleton,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    </TextContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', TextProps>;
if (process.env.NODE_ENV === 'development') {
  Text.displayName = 'Text';
}

// ----------------------------------------------------------------------------

export const TextContext = React.createContext(false);
