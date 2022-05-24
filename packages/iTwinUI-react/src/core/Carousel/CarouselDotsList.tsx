/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { CarouselContext } from './CarouselContext';
import {
  getBoundedValue,
  getWindow,
  useMergedRefs,
  useResizeObserver,
  useTheme,
} from '../utils';
import { CarouselDot } from './CarouselDot';
import '@itwin/itwinui-css/css/carousel.css';

type CarouselDotsListProps = {
  /** Number of total dots/slides in the carousel. Will be inferred from Carousel context or children. Otherwise, it is required to be passed. */
  length?: number;
  /** Index of currently active dot. Will be inferred from Carousel context, or else default to 0. */
  currentIndex?: number;
  /** Callback fired when any of the dots are clicked. */
  onSlideChange?: (index: number) => void;
} & React.ComponentPropsWithoutRef<'div'>;

/**
 * The `CarouselDots` component shows a list of `CarouselDot` components which can be used to
 * choose a specific slide. If used as a descendant of `Carousel`, then this component does not need
 * any props or `children`.
 *
 * The props can be specified if this component is being used outside `Carousel`. `children` can be specified
 * to override the individual dots that are shown.
 *
 * @example
 * <Carousel>
 *   // ...
 *   <Carousel.Dots />
 * </Carousel>
 *
 * @example
 * <Carousel.Dots
 *   length={10}
 *   maxCount={3}
 *   currentIndex={current}
 *   onSlideChange={(i) => setCurrent(i)}
 * />
 */
export const CarouselDotsList = React.forwardRef<
  HTMLDivElement,
  CarouselDotsListProps
>((props, ref) => {
  const {
    currentIndex: userCurrentIndex,
    length,
    className,
    onSlideChange,
    children,
    ...rest
  } = props;

  useTheme();

  const context = React.useContext(CarouselContext);
  const slideCount =
    length ?? context?.slideCount ?? React.Children.count(children);
  const currentIndex = userCurrentIndex ?? context?.currentIndex ?? 0;
  const idPrefix = props.id ?? context?.idPrefix;

  const handleSlideChange = React.useCallback(
    (index: number) => {
      if (context) {
        context.setCurrentIndex(index);
        context.scrollToSlide.current(index);
      }
      onSlideChange?.(index);
    },
    [context, onSlideChange],
  );

  const justMounted = React.useRef(true);
  const [visibleCount, setVisibleCount] = React.useState(slideCount);
  const listRef = React.useRef<HTMLDivElement>(null);

  const [width, setWidth] = React.useState<number>();
  const [resizeRef, resizeObserver] = useResizeObserver(({ width }) => {
    if (!listRef.current) {
      return;
    }

    setWidth(width);
    const dotWidth = (listRef.current.children[0] as HTMLElement).offsetWidth;
    setVisibleCount(Math.floor(width / dotWidth));
  });

  React.useEffect(() => resizeObserver?.disconnect(), [resizeObserver]);

  const refs = useMergedRefs(ref, resizeRef, listRef);

  const firstVisibleDotIndex = React.useMemo(
    () =>
      getBoundedValue(
        currentIndex - Math.ceil(visibleCount / 2) + 1,
        0,
        slideCount - visibleCount,
      ),
    [currentIndex, slideCount, visibleCount],
  );
  const lastVisibleDotIndex = React.useMemo(
    () =>
      getBoundedValue(
        currentIndex + Math.floor(visibleCount / 2),
        visibleCount - 1,
        slideCount - 1,
      ),
    [currentIndex, slideCount, visibleCount],
  );

  const dots = React.useMemo(() => {
    return Array(slideCount)
      .fill(null)
      .map((_, index) => {
        const isFirstSmallDot =
          (index === firstVisibleDotIndex && index !== 0) ||
          (index === lastVisibleDotIndex && index !== slideCount - 1);
        const isSecondSmallDot =
          (index === firstVisibleDotIndex + 1 && index !== 1) ||
          (index === lastVisibleDotIndex - 1 && index !== slideCount - 2);
        const isClipped =
          index < firstVisibleDotIndex || index > lastVisibleDotIndex;

        return (
          <CarouselDot
            key={index}
            aria-label={`Slide ${index}`}
            isActive={index === currentIndex}
            onClick={() => handleSlideChange(index)}
            isSmall={isSecondSmallDot}
            isSmaller={isFirstSmallDot || isClipped}
            id={idPrefix && `${idPrefix}--dot-${index}`}
            aria-controls={idPrefix && `${idPrefix}--slide-${index}`}
          />
        );
      });
  }, [
    slideCount,
    firstVisibleDotIndex,
    lastVisibleDotIndex,
    currentIndex,
    idPrefix,
    handleSlideChange,
  ]);

  React.useEffect(() => {
    const firstDot = listRef.current?.children[firstVisibleDotIndex] as
      | HTMLElement
      | undefined;
    if (!listRef.current || !firstDot) {
      return;
    }

    const motionOk = getWindow()?.matchMedia(
      '(prefers-reduced-motion: no-preference)',
    )?.matches;

    listRef.current.scrollTo({
      left: firstDot.offsetLeft - listRef.current.offsetLeft,
      behavior: motionOk && !justMounted.current ? 'smooth' : 'auto',
    });

    if (justMounted.current) {
      justMounted.current = false;
    }
  }, [currentIndex, firstVisibleDotIndex, slideCount, visibleCount, width]);

  return (
    <>
      <div
        className={cx('iui-carousel-navigation-dots', className)}
        role='tablist'
        aria-label='Slides'
        ref={refs}
        {...rest}
      >
        {children ?? dots}
      </div>
    </>
  );
});
