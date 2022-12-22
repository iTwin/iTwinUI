/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';

type CarouselDotProps = {
  /** Is this dot currently active? */
  isActive?: boolean;
  /** Should be set to true for dots that are one spot from the edge of truncation. The dot size becomes small.  */
  isSmall?: boolean;
  /** Should be set to true for dots that are at the edge of truncation. The dot size becomes even smaller.  */
  isSmaller?: boolean;
} & React.ComponentPropsWithoutRef<'button'>;

/**
 * `CarouselDot` is the actual "dot" component used to activate a slide on clicking.
 * It should be used as a child of `CarouselDotsList`.
 */
export const CarouselDot = React.forwardRef<
  HTMLButtonElement,
  CarouselDotProps
>((props, ref) => {
  const { isActive, isSmaller, isSmall, className, ...rest } = props;

  return (
    <button
      type='button'
      role='tab'
      tabIndex={-1}
      className={cx(
        'iui-carousel-navigation-dot',
        {
          'iui-active': isActive,
          'iui-first': isSmaller,
          'iui-second': isSmall,
        },
        className,
      )}
      aria-selected={isActive}
      ref={ref}
      {...rest}
    />
  );
});
