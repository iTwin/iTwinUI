/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useIntersection, useMergedRefs } from '../utils';
import { CarouselContext } from './CarouselContext';

type CarouselSlideProps = {
  /**
   * Index of the current slide.
   * Does not need to be manually specified because it will be set in parent (`CarouselSlider`).
   */
  index?: number;
} & React.ComponentPropsWithoutRef<'li'>;

/**
 * `CarouselSlide` is used for the actual slide content. The content can be specified through `children`.
 *
 * It is recommended that the slide content bring its own dimensions (esp. height) and that
 * the dimensions should be the same for all slides.
 */
export const CarouselSlide = React.forwardRef<
  HTMLLIElement,
  CarouselSlideProps
>((props, ref) => {
  const { index, className, children, ...rest } = props;

  const context = React.useContext(CarouselContext);
  if (!context || index == null) {
    throw new Error('CarouselSlide must be used within Carousel');
  }

  const { isManuallyUpdating, setCurrentIndex } = context;

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

  return (
    <li
      className={cx('iui-carousel-slider-item', className)}
      role='tabpanel'
      aria-roledescription='slide'
      ref={refs}
      {...rest}
    >
      {children}
    </li>
  );
});
