/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { Carousel } from './Carousel';
import userEvent from '@testing-library/user-event';

const originalMatchMedia = window.matchMedia;
beforeAll(() => {
  window.matchMedia = jest.fn().mockReturnValue({ matches: false });
});
afterAll(() => {
  window.matchMedia = originalMatchMedia;
});

it('should render in its most basic state', () => {
  const { container } = render(
    <Carousel id='testcarousel'>
      <Carousel.Slider>
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
      </Carousel.Slider>
      <Carousel.Navigation />
    </Carousel>,
  );

  const root = container.querySelector('section') as HTMLElement;
  expect(root).toHaveClass('iui-carousel');
  expect(root).toHaveAttribute('aria-roledescription', 'carousel');

  const slider = container.querySelector('ol') as HTMLElement;
  expect(slider).toHaveClass('iui-carousel-slider');

  slider.childNodes.forEach((slide, index) => {
    expect(slide).toHaveClass('iui-carousel-slider-item');
    expect(slide).toHaveAttribute('role', 'tabpanel');
    expect(slide).toHaveAttribute('aria-roledescription', 'slide');
    expect(slide).toHaveTextContent(`${index + 1}`);
    expect(slide).toHaveAttribute('id', `testcarousel--slide-${index}`);
  });

  const nav = container.querySelector('nav') as HTMLElement;
  expect(nav).toHaveClass('iui-carousel-navigation');
  expect(nav.querySelectorAll('.iui-button')).toHaveLength(2);
  expect(nav.querySelector('.iui-carousel-navigation-dots')).toHaveAttribute(
    'role',
    'tablist',
  );

  nav.querySelectorAll('iui-carousel-navigation-dot').forEach((dot, index) => {
    expect(dot).toHaveAttribute('role', 'tab');
    expect(dot).toHaveAttribute('tabindex', '-1');
    expect(dot).toHaveAccessibleName(`Slide ${index + 1}`);
    expect(dot).toHaveAttribute('id', `testcarousel--dot-${index}`);
    expect(dot).toHaveAttribute(
      'aria-controls',
      `testcarousel--slide-${index}`,
    );

    if (index === 0) {
      expect(dot).toHaveAttribute('aria-selected', 'true');
      expect(dot).toHaveClass('iui-active');
    } else {
      expect(dot).not.toHaveAttribute('aria-selected');
      expect(dot).not.toHaveClass('iui-active');
    }
  });
});

it('should work with uncontrolled activeSlideIndex', async () => {
  const { container } = render(
    <Carousel activeSlideIndex={1}>
      <Carousel.Slider>
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
      </Carousel.Slider>
      <Carousel.Navigation />
    </Carousel>,
  );

  const dots = Array.from(
    container.querySelectorAll('.iui-carousel-navigation-dot'),
  );
  expect(dots[1]).toHaveClass('iui-active');

  await userEvent.click(
    container.querySelector(
      '.iui-carousel-navigation-left > .iui-button', // prev slide button (2 -> 1)
    ) as HTMLButtonElement,
  );

  expect(dots[1]).not.toHaveClass('iui-active');
  expect(dots[0]).toHaveClass('iui-active');

  await userEvent.click(dots[2]); // 1 -> 3

  expect(dots[0]).not.toHaveClass('iui-active');
  expect(dots[2]).toHaveClass('iui-active');
});

it('should work with controlled activeSlideIndex', () => {
  const Component = ({ activeIndex = 0 }) => (
    <Carousel activeSlideIndex={activeIndex}>
      <Carousel.Slider>
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
      </Carousel.Slider>
      <Carousel.Navigation />
    </Carousel>
  );

  let activeIndex = 0;
  const { container, rerender } = render(
    <Component activeIndex={activeIndex} />,
  );

  const dots = Array.from(
    container.querySelectorAll('.iui-carousel-navigation-dot'),
  );
  expect(dots[activeIndex]).toHaveClass('iui-active');

  activeIndex = 2;
  rerender(<Component activeIndex={activeIndex} />);
  expect(dots[activeIndex]).toHaveClass('iui-active');
});

it('should handle keyboard navigation', async () => {
  const { container } = render(
    <Carousel>
      <Carousel.Slider>
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
      </Carousel.Slider>
      <Carousel.DotsList />
    </Carousel>,
  );

  const dots = Array.from(
    container.querySelectorAll('.iui-carousel-navigation-dot'),
  );

  // default 0
  expect(dots[0]).toHaveClass('iui-active');

  // focus carousel
  await userEvent.tab();

  // 0 -> 1
  await userEvent.keyboard('{ArrowRight}');
  expect(dots[1]).toHaveClass('iui-active');

  // 1 -> 2
  await userEvent.keyboard('{ArrowRight}');
  expect(dots[2]).toHaveClass('iui-active');

  // 2 -> 0
  await userEvent.keyboard('{ArrowRight}');
  expect(dots[0]).toHaveClass('iui-active');

  // 0 -> 2
  await userEvent.keyboard('{ArrowLeft}');
  expect(dots[2]).toHaveClass('iui-active');

  // 2 -> 1
  await userEvent.keyboard('{ArrowLeft}');
  expect(dots[1]).toHaveClass('iui-active');
});

it('should add data-pressed to prev/next buttons on key down', async () => {
  const { container } = render(
    <Carousel>
      <Carousel.Slider>
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
      </Carousel.Slider>
      <Carousel.Navigation />
    </Carousel>,
  );

  const dots = Array.from(
    container.querySelectorAll('.iui-carousel-navigation-dot'),
  );

  const prev = container.querySelector(
    '.iui-carousel-navigation-left > button',
  );
  const next = container.querySelector(
    '.iui-carousel-navigation-right > button',
  );

  await userEvent.tab();

  // 0 -> 1
  const keyState1 = await userEvent.keyboard('{ArrowRight>}');
  expect(next).toHaveAttribute('data-pressed', 'true');
  await userEvent.keyboard('{/ArrowRight}', { keyboardState: keyState1 });
  expect(next).not.toHaveAttribute('data-pressed');
  expect(dots[1]).toHaveClass('iui-active');

  // 0 -> 1
  const keyState2 = await userEvent.keyboard('{ArrowLeft>}');
  expect(prev).toHaveAttribute('data-pressed', 'true');
  await userEvent.keyboard('{/ArrowLeft}', { keyboardState: keyState2 });
  expect(prev).not.toHaveAttribute('data-pressed');
  expect(dots[0]).toHaveClass('iui-active');
});
