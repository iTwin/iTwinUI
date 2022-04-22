/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { CarouselContext } from './CarouselContext';
import { getWindow, useMergedRefs, useResizeObserver } from '../utils';

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

  const {
    currentIndex,
    setSlideCount,
    idPrefix,
    isManuallyUpdating,
    scrollInstantly,
  } = context;

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

  React.useLayoutEffect(() => {
    setSlideCount(items.length);
  }, [items.length, setSlideCount]);

  const [width, setWidth] = React.useState<number>();
  const [resizeRef] = useResizeObserver(({ width }) => setWidth(width));

  const sliderRef = React.useRef<HTMLOListElement>(null);
  const refs = useMergedRefs(sliderRef, resizeRef, ref);
  const justMounted = React.useRef(true);

  const previousWidth = React.useRef<number>();
  React.useLayoutEffect(() => {
    const slideToShow = sliderRef.current?.children.item(currentIndex) as
      | HTMLElement
      | undefined;

    if (
      !sliderRef.current ||
      !slideToShow ||
      (!isManuallyUpdating.current && previousWidth.current === width)
    ) {
      return;
    }

    // instant scroll on first mount
    if (justMounted.current) {
      scrollInstantly.current = true;
      justMounted.current = false;
    }

    const motionOk = getWindow()?.matchMedia(
      '(prefers-reduced-motion: no-preference)',
    )?.matches;

    sliderRef.current.scrollTo({
      left: slideToShow.offsetLeft - sliderRef.current.offsetLeft,
      behavior: (scrollInstantly.current || !motionOk
        ? 'instant'
        : 'smooth') as ScrollBehavior, // scrollTo accepts 'instant' but ScrollBehavior type is wrong
    });

    scrollInstantly.current = false;
    previousWidth.current = width;
  }, [currentIndex, isManuallyUpdating, scrollInstantly, width]);

  return (
    <ol
      aria-live='polite'
      className={cx('iui-carousel-slider', className)}
      ref={refs}
      {...rest}
    >
      {items}
    </ol>
  );
});
