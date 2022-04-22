/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { CarouselContext } from './CarouselContext';
import { IconButton, IconButtonProps } from '../Buttons';
import { CarouselDotsList } from './CarouselDotsList';
import SvgChevronLeft from '@itwin/itwinui-icons-react/cjs/icons/ChevronLeft';
import SvgChevronRight from '@itwin/itwinui-icons-react/cjs/icons/ChevronRight';

/** Button for switching to previous slide */
const PreviousButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const context = React.useContext(CarouselContext);
    if (!context) {
      throw new Error('CarouselNavigation should be used inside Carousel');
    }

    const {
      slideCount,
      setCurrentIndex,
      keysPressed,
      scrollInstantly,
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
          if (e.detail > 3) {
            scrollInstantly.current = true;
          }
          setCurrentIndex((old) => (slideCount + old - 1) % slideCount);
          props?.onClick?.(e);
        }}
      >
        <SvgChevronLeft />
      </IconButton>
    );
  },
);

/** Button for switching to next slide */
const NextButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const context = React.useContext(CarouselContext);
    if (!context) {
      throw new Error('CarouselNavigation should be used inside Carousel');
    }

    const {
      slideCount,
      setCurrentIndex,
      keysPressed,
      scrollInstantly,
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
          if (e.detail > 3) {
            scrollInstantly.current = true;
          }
          setCurrentIndex((old) => (slideCount + old + 1) % slideCount);
          props?.onClick?.(e);
        }}
      >
        <SvgChevronRight />
      </IconButton>
    );
  },
);

/**
 * The `CarouselNavigation` component by default consists of the `PreviousButton` and `NextButton`
 * shown on the left and right, and the `CarouselDotsList` component shown in the middle.
 *
 * `children` can be specified to override what is shown in this navigation section.
 */
export const CarouselNavigation = Object.assign(
  React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'nav'>>(
    (props, ref) => {
      const { className, children, ...rest } = props;

      return (
        <nav
          className={cx('iui-carousel-navigation', className)}
          ref={ref}
          {...rest}
        >
          {children ?? (
            <>
              <div className='iui-carousel-navigation-left'>
                <PreviousButton />
              </div>

              <CarouselDotsList />

              <div className='iui-carousel-navigation-right'>
                <NextButton />
              </div>
            </>
          )}
        </nav>
      );
    },
  ),
  { PreviousButton, NextButton },
);
