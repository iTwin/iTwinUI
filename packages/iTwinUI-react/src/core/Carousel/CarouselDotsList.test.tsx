/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import { CarouselDotsList } from './CarouselDotsList';
import * as UseResizeObserver from '../utils/hooks/useResizeObserver';
import userEvent from '@testing-library/user-event';

const originalMatchMedia = window.matchMedia;
beforeAll(() => {
  window.matchMedia = jest.fn().mockReturnValue({ matches: false });
});
afterAll(() => {
  window.matchMedia = originalMatchMedia;
});

it('should render in its most basic state without Carousel', () => {
  render(
    <CarouselDotsList
      id='testid'
      length={10}
      currentIndex={3}
      className='testclass'
      style={{ border: '1px solid' }}
    />,
  );

  const list = screen.getByRole('tablist') as HTMLDivElement;
  expect(list).toHaveClass('iui-carousel-navigation-dots testclass');
  expect(list).toHaveAttribute('id', 'testid');
  // expect(list).toHaveStyle('border: 1px solid;'); // this will fail until inline styles are removed from CarouselDotsList
  expect(list).toHaveAccessibleName('Slides');

  const dots = Array.from(list.children);
  expect(dots).toHaveLength(10);
  dots.forEach((dot, index) => {
    expect(dot).toHaveClass('iui-carousel-navigation-dot');
    expect(dot).toHaveAttribute('role', 'tab');
    expect(dot).toHaveAttribute('tabindex', '-1');
    expect(dot).toHaveAttribute('id', `testid--dot-${index}`);
    expect(dot).toHaveAttribute('aria-controls', `testid--slide-${index}`);

    if (index === 3) {
      expect(dot).toHaveAttribute('aria-selected', 'true');
      expect(dot).toHaveClass('iui-active');
    } else {
      expect(dot).toHaveAttribute('aria-selected', 'false');
      expect(dot).not.toHaveClass('iui-active');
    }
  });
});

it('should call onSlideChange correctly', async () => {
  const mockOnSlideChange = jest.fn();
  const { container } = render(
    <CarouselDotsList
      id='testid'
      length={10}
      currentIndex={0}
      onSlideChange={mockOnSlideChange}
    />,
  );

  expect(mockOnSlideChange).not.toHaveBeenCalled();
  const dots = Array.from<HTMLElement>(
    container.querySelectorAll('.iui-carousel-navigation-dot'),
  );

  await userEvent.click(dots[0]);
  expect(mockOnSlideChange).toHaveBeenCalledWith(0);

  await userEvent.click(dots[9]);
  expect(mockOnSlideChange).toHaveBeenCalledWith(9);

  await userEvent.click(dots[5]);
  expect(mockOnSlideChange).toHaveBeenCalledWith(5);
});

it('should truncate dots correctly', () => {
  const DOT_WIDTH = 28;

  let triggerResize: (size: DOMRectReadOnly) => void = jest.fn();
  jest
    .spyOn(UseResizeObserver, 'useResizeObserver')
    .mockImplementation((onResize) => {
      triggerResize = onResize;
      return [
        jest.fn(),
        { disconnect: jest.fn() } as unknown as ResizeObserver,
      ];
    });

  const dotWidthMock = jest
    .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
    .mockReturnValue(DOT_WIDTH);

  const { container } = render(
    <CarouselDotsList id='testid' length={10} currentIndex={4} />,
  );

  // no truncation if width is unlimited
  expect(container.querySelector('.iui-first')).toBeFalsy();
  expect(container.querySelector('.iui-second')).toBeFalsy();

  // current index is 4, visibleCount is 7, so first dot is 1, last dot is 7
  act(() => triggerResize({ width: DOT_WIDTH * 7 } as DOMRect));
  container
    .querySelectorAll('.iui-carousel-navigation-dot')
    .forEach((dot, index) => {
      if (index <= 1 || index >= 7) {
        expect(dot).toHaveClass('iui-first');
      } else if (index === 2 || index === 6) {
        expect(dot).toHaveClass('iui-second');
      } else {
        expect(dot).not.toHaveClass('iui-first');
        expect(dot).not.toHaveClass('iui-second');
      }
    });

  // current index is 4, visibleCount is 5, so first dot is 2, last dot is 6
  act(() => triggerResize({ width: DOT_WIDTH * 5 } as DOMRect));
  container
    .querySelectorAll('.iui-carousel-navigation-dot')
    .forEach((dot, index) => {
      if (index <= 2 || index >= 6) {
        expect(dot).toHaveClass('iui-first');
      } else if (index === 3 || index === 5) {
        expect(dot).toHaveClass('iui-second');
      } else {
        expect(dot).not.toHaveClass('iui-first');
        expect(dot).not.toHaveClass('iui-second');
      }
    });

  dotWidthMock.mockRestore();
});

it('should work with custom children', () => {
  const { container } = render(
    <CarouselDotsList id='testid' length={10} currentIndex={0}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </CarouselDotsList>,
  );

  const root = container.querySelector('#testid') as HTMLElement;
  expect(root).toHaveClass('iui-carousel-navigation-dots');
  expect(container.querySelector('.iui-carousel-navigation-dot')).toBeFalsy();
  expect(root.children).toHaveLength(3);
  Array.from(root.children).forEach((child, index) => {
    expect(child).toBeInstanceOf(HTMLDivElement);
    expect(child).toHaveTextContent(`${index + 1}`);
  });
});
