/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { CarouselContext } from './CarouselContext';
import { getWindow, useMergedRefs, useIsomorphicLayoutEffect } from '../utils';

/**
 * `CarouselSlider` is the scrollable list that should consist of `CarouselSlide` components.
 */
export const CarouselSlider = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<'ol'>
>((props, ref) => {
  const { children, className, ...rest } = props;
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('CarouselSlider must be used within Carousel');
  }

  const { setSlideCount, idPrefix, scrollToSlide, isManuallyUpdating } =
    context;

  const items = React.useMemo(
    () =>
      React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              id: `${idPrefix}--slide-${index}`,
              index,
            })
          : child,
      ) ?? [],
    [children, idPrefix],
  ) as React.ReactNode[];

  useIsomorphicLayoutEffect(() => {
    setSlideCount(items.length);
  }, [items.length, setSlideCount]);

  const sliderRef = React.useRef<HTMLOListElement>(null);
  const refs = useMergedRefs(sliderRef, ref);

  scrollToSlide.current = (
    slideIndex: number,
    { instant }: { instant?: boolean } = {},
  ) => {
    isManuallyUpdating.current = true; // start manual update

    const slideToShow = sliderRef.current?.children.item(slideIndex) as
      | HTMLElement
      | undefined;

    if (!sliderRef.current || !slideToShow) {
      return;
    }

    const motionOk = getWindow()?.matchMedia(
      '(prefers-reduced-motion: no-preference)',
    )?.matches;

    sliderRef.current.scrollTo({
      left: slideToShow.offsetLeft - sliderRef.current.offsetLeft,
      behavior: (instant || !motionOk ? 'instant' : 'smooth') as ScrollBehavior, // scrollTo accepts 'instant' but ScrollBehavior type is wrong
    });
  };

  const scrollTimeout = React.useRef<number>();

  // reset isManuallyUpdating.current to false after the last scroll event
  const handleOnScroll = React.useCallback(() => {
    if (scrollTimeout.current) {
      getWindow()?.clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = getWindow()?.setTimeout(() => {
      isManuallyUpdating.current = false;
    }, 100);
  }, [isManuallyUpdating]);

  return (
    <ol
      aria-live='polite'
      className={cx('iui-carousel-slider', className)}
      ref={refs}
      onScroll={handleOnScroll}
      {...rest}
    >
      {items}
    </ol>
  );
});
