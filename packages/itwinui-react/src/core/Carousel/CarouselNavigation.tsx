/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { CarouselContext } from './CarouselContext.js';
import { IconButton } from '../Buttons/index.js';
import { CarouselDotsList } from './CarouselDotsList.js';
import { Box, SvgChevronLeft, SvgChevronRight } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';

const CarouselNavigationComponent = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <Box
      as='nav'
      className={cx('iui-carousel-navigation', className)}
      ref={ref}
      {...rest}
    >
      {children ?? (
        <>
          <Box className='iui-carousel-navigation-left'>
            <PreviousButton />
          </Box>

          <CarouselDotsList />

          <Box className='iui-carousel-navigation-right'>
            <NextButton />
          </Box>
        </>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'nav'>;

/** Button for switching to previous slide */
const PreviousButton = React.forwardRef((props, ref) => {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('CarouselNavigation should be used inside Carousel');
  }

  const {
    slideCount,
    currentIndex,
    setCurrentIndex,
    keysPressed,
    scrollToSlide,
  } = context;

  return (
    <IconButton
      styleType='borderless'
      size='small'
      tabIndex={-1}
      data-pressed={keysPressed['ArrowLeft'] || undefined}
      ref={ref}
      {...props}
      onClick={(e) => {
        const prevIndex = (slideCount + currentIndex - 1) % slideCount;
        setCurrentIndex(prevIndex);
        scrollToSlide.current(prevIndex, { instant: e.detail > 3 });
        props?.onClick?.(e);
      }}
    >
      <SvgChevronLeft />
    </IconButton>
  );
}) as PolymorphicForwardRefComponent<
  'button',
  React.ComponentProps<typeof IconButton>
>;

/** Button for switching to next slide */
const NextButton = React.forwardRef((props, ref) => {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('CarouselNavigation should be used inside Carousel');
  }

  const {
    slideCount,
    currentIndex,
    setCurrentIndex,
    keysPressed,
    scrollToSlide,
  } = context;

  return (
    <IconButton
      styleType='borderless'
      size='small'
      tabIndex={-1}
      data-pressed={keysPressed['ArrowRight'] || undefined}
      ref={ref}
      {...props}
      onClick={(e) => {
        const nextIndex = (slideCount + currentIndex + 1) % slideCount;
        setCurrentIndex(nextIndex);
        scrollToSlide.current(nextIndex, { instant: e.detail > 3 });
        props?.onClick?.(e);
      }}
    >
      <SvgChevronRight />
    </IconButton>
  );
}) as PolymorphicForwardRefComponent<
  'button',
  React.ComponentProps<typeof IconButton>
>;

/**
 * The `CarouselNavigation` component by default consists of the `PreviousButton` and `NextButton`
 * shown on the left and right, and the `CarouselDotsList` component shown in the middle.
 *
 * `children` can be specified to override what is shown in this navigation section.
 */
export const CarouselNavigation = Object.assign(CarouselNavigationComponent, {
  PreviousButton,
  NextButton,
});
