/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import {
  Box,
  mergeEventHandlers,
  useInertPolyfill,
  useIntersection,
  useMergedRefs,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { CarouselContext } from './CarouselContext.js';

type CarouselSlideProps = {
  /**
   * Index of the current slide.
   * Does not need to be manually specified because it will be set in parent (`CarouselSlider`).
   */
  index?: number;
};

/**
 * `CarouselSlide` is used for the actual slide content. The content can be specified through `children`.
 *
 * It is recommended that the slide content bring its own dimensions (esp. height) and that
 * the dimensions should be the same for all slides.
 */
export const CarouselSlide = React.forwardRef((props, ref) => {
  const { index, className, children, ...rest } = props;

  const context = React.useContext(CarouselContext);
  if (!context || index == null) {
    throw new Error('CarouselSlide must be used within Carousel');
  }

  const { isManuallyUpdating, currentIndex, setCurrentIndex } = context;

  const updateActiveIndexOnScroll = React.useCallback(() => {
    // only update index if scroll was triggered by browser
    if (!isManuallyUpdating.current) {
      setCurrentIndex(index);
    }
  }, [index, isManuallyUpdating, setCurrentIndex]);

  const intersectionRef = useIntersection(
    updateActiveIndexOnScroll,
    { threshold: 0.5 },
    false,
  );

  const refs = useMergedRefs(intersectionRef, ref);

  useInertPolyfill();

  return (
    <Box
      className={cx('iui-carousel-slider-item', className)}
      role='tabpanel'
      aria-roledescription='slide'
      tabIndex={index === currentIndex ? 0 : undefined}
      ref={refs}
      {...{ inert: index !== currentIndex ? '' : undefined }}
      {...rest}
      onKeyDown={mergeEventHandlers(props.onKeyDown, (event) => {
        // prevent default browser scrolling on arrow keys because focus will get lost when slide switches
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
        }
      })}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', CarouselSlideProps>;
if (process.env.NODE_ENV === 'development') {
  CarouselSlide.displayName = 'Carousel.Slide';
}
