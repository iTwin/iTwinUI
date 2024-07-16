/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { CarouselContext } from './CarouselContext.js';
import {
  getWindow,
  useMergedRefs,
  useLayoutEffect,
  Box,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

/**
 * `CarouselSlider` is the scrollable list that should consist of `CarouselSlide` components.
 */
export const CarouselSlider = React.forwardRef((props, ref) => {
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
          ? React.cloneElement(child as JSX.Element, {
              id: `${idPrefix}--slide-${index}`,
              'aria-labelledby': `${idPrefix}--dot-${index}`,
              index,
            })
          : child,
      ) ?? [],
    [children, idPrefix],
  ) as React.ReactNode[];

  useLayoutEffect(() => {
    setSlideCount(items.length);
  }, [items.length, setSlideCount]);

  const sliderRef = React.useRef<HTMLElement>(null);
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
    <Box
      className={cx('iui-carousel-slider', className)}
      ref={refs}
      onScroll={handleOnScroll}
      tabIndex={-1} // this prevents undesirable tabbing to the list in Firefox/Chrome
      {...rest}
    >
      {items}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div'>;
if (process.env.NODE_ENV === 'development') {
  CarouselSlider.displayName = 'Carousel.Slider';
}
