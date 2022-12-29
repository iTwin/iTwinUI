/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { getRandomValue, useMergedRefs, useTheme } from '../utils';
import '@itwin/itwinui-css/css/carousel.css';
import { CarouselContext } from './CarouselContext';
import { CarouselSlider } from './CarouselSlider';
import { CarouselSlide } from './CarouselSlide';
import { CarouselDotsList } from './CarouselDotsList';
import { CarouselDot } from './CarouselDot';
import { CarouselNavigation } from './CarouselNavigation';

export type CarouselProps = {
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
} & React.ComponentPropsWithoutRef<'div'>;

/**
 * The Carousel component consists of a set of slides, normally displayed one at a time. A navigation section is
 * located below the slides, consisting of "dots" and "previous"/"next" buttons, used for changing slides.
 *
 * The currently shown slide can also be changed using the left/right arrow keys or by dragging on a touch device.
 *
 * This component uses a composition approach so it should be used with the provided subcomponents.
 *
 * @example
 * <Carousel>
 *   <Carousel.Slider>
 *     <Carousel.Slide>...</Carousel.Slide>
 *     <Carousel.Slide>...</Carousel.Slide>
 *     <Carousel.Slide>...</Carousel.Slide>
 *   </Carousel.Slider>
 *   <Carousel.Navigation />
 * </Carousel>
 */
export const Carousel = Object.assign(
  React.forwardRef<HTMLElement, CarouselProps>((props, ref) => {
    const {
      activeSlideIndex: userActiveIndex = 0,
      onSlideChange,
      className,
      children,
      ...rest
    } = props;

    // Generate a stateful random id if not specified
    const [id] = React.useState(
      () => props.id ?? `iui-carousel-${getRandomValue(10)}`,
    );

    useTheme();

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

      // re-focus the carousel for keyboard nav, but not on first mount
      // because it shows outline and might interfere with other components
      if (!justMounted.current) {
        carouselRef.current?.focus({ preventScroll: true });
      }

      justMounted.current = false;
    }, [userActiveIndex]);

    const [slideCount, setSlideCount] = React.useState(0);

    const [keysPressed, setKeysPressed] = React.useState<
      Record<string, boolean>
    >({});

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        setKeysPressed((old) => ({ ...old, [event.key]: true }));
      }
    };

    const handleKeyUp = (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft': {
          setKeysPressed((old) => ({ ...old, ArrowLeft: false }));
          const prevIndex = (slideCount + currentIndex - 1) % slideCount;
          scrollToSlide.current(prevIndex);
          setCurrentIndex(prevIndex);
          break;
        }
        case 'ArrowRight': {
          setKeysPressed((old) => ({ ...old, ArrowRight: false }));
          const nextIndex = (slideCount + currentIndex + 1) % slideCount;
          scrollToSlide.current(nextIndex);
          setCurrentIndex(nextIndex);
          break;
        }
      }
    };

    const userOnSlideChange = React.useRef(onSlideChange);
    React.useEffect(() => {
      userOnSlideChange.current?.(currentIndex);
    }, [currentIndex]);

    return (
      <section
        aria-roledescription='carousel'
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
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
            keysPressed,
            idPrefix: id,
            isManuallyUpdating,
            scrollToSlide,
          }}
        >
          {children}
        </CarouselContext.Provider>
      </section>
    );
  }),
  {
    Slider: CarouselSlider,
    Slide: CarouselSlide,
    Navigation: CarouselNavigation,
    DotsList: CarouselDotsList,
    Dot: CarouselDot,
  },
);

export default Carousel;
