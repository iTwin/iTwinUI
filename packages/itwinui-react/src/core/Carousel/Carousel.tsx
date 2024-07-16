/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { useMergedRefs, Box, useLatestRef, useId } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { CarouselContext } from './CarouselContext.js';
import { CarouselSlider } from './CarouselSlider.js';
import { CarouselSlide } from './CarouselSlide.js';
import { CarouselDotsList } from './CarouselDotsList.js';
import { CarouselDot } from './CarouselDot.js';
import { CarouselNavigation } from './CarouselNavigation.js';

type CarouselProps = {
  /**
   * Index of the currently shown slide.
   * Can be used to set the default index or control the active slide programmatically.
   * @default 0
   */
  activeSlideIndex?: number;
  /**
   * Callback fired when the current slide changes.
   */
  onSlideChange?: (index: number) => void;
};

const CarouselComponent = React.forwardRef((props, ref) => {
  const idPrefix = useId();
  const {
    activeSlideIndex: userActiveIndex = 0,
    onSlideChange,
    className,
    children,
    id = idPrefix,
    ...rest
  } = props;

  const isManuallyUpdating = React.useRef(false);
  const carouselRef = React.useRef<HTMLElement>(null);
  const refs = useMergedRefs(carouselRef, ref);

  const [currentIndex, setCurrentIndex] = React.useState(userActiveIndex);

  const scrollToSlide = React.useRef<
    (index?: number, options?: { instant?: boolean }) => void
  >(() => {}); // stub function populated in CarouselSlider

  const justMounted = React.useRef(true);
  React.useEffect(() => {
    setCurrentIndex(userActiveIndex);
    scrollToSlide.current(userActiveIndex, {
      instant: justMounted.current,
    });
    justMounted.current = false;
  }, [userActiveIndex]);

  const [slideCount, setSlideCount] = React.useState(0);

  const userOnSlideChange = useLatestRef(onSlideChange);
  React.useEffect(() => {
    userOnSlideChange.current?.(currentIndex);
  }, [userOnSlideChange, currentIndex]);

  return (
    <Box
      as='section'
      aria-roledescription='carousel'
      ref={refs}
      className={cx('iui-carousel', className)}
      {...rest}
      id={id}
    >
      <CarouselContext.Provider
        value={{
          currentIndex,
          setCurrentIndex,
          slideCount,
          setSlideCount,
          idPrefix: id,
          isManuallyUpdating,
          scrollToSlide,
        }}
      >
        {children}
      </CarouselContext.Provider>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'section', CarouselProps>;
if (process.env.NODE_ENV === 'development') {
  CarouselComponent.displayName = 'Carousel';
}

/**
 * The Carousel component consists of a set of slides, normally displayed one at a time. A navigation section is
 * shown below the slides, consisting of "dots" and "previous"/"next" buttons, used for changing slides; this navigation
 * section must be present _before_ the slides in DOM order, even though it is visually shown below the slides.
 *
 * The currently shown slide can also be changed using the left/right arrow keys or by dragging on a touch device.
 *
 * This component uses a composition approach so it should be used with the provided subcomponents.
 *
 * @example
 * <Carousel>
 *   <Carousel.Navigation />
 *   <Carousel.Slider>
 *     <Carousel.Slide>...</Carousel.Slide>
 *     <Carousel.Slide>...</Carousel.Slide>
 *     <Carousel.Slide>...</Carousel.Slide>
 *   </Carousel.Slider>
 * </Carousel>
 */
export const Carousel = Object.assign(CarouselComponent, {
  Slider: CarouselSlider,
  Slide: CarouselSlide,
  /**
   * Contains the dots and previous/next buttons for navigating the slides. Must be present _before_ the slides in DOM.
   */
  Navigation: CarouselNavigation,
  /**
   * Contains the dots for activating the slides. Must be present _before_ the slides in DOM.
   */
  DotsList: CarouselDotsList,
  Dot: CarouselDot,
});
