/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import VirtualScroll from './VirtualScroll';
import * as UseResizeObserver from '../hooks/useResizeObserver';
import { useVirtualization } from '.';

// to return correct values for container 'scroller' and children
const heightsMock = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect');
let triggerResize: (size: DOMRectReadOnly) => void = jest.fn();

const generateDataArray = (length: number) =>
  new Array(length).fill(null).map((_, index) => ++index);

beforeAll(() => {
  jest
    .spyOn(UseResizeObserver, 'useResizeObserver')
    .mockImplementation((onResize) => {
      triggerResize = onResize;
      return [
        jest.fn(),
        { disconnect: jest.fn() } as unknown as ResizeObserver,
      ];
    });
});

afterAll(() => {
  jest.clearAllMocks();
});

it('should render only few elements out of big list', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heightsMock.mockImplementation(function (this: Record<string, any>) {
    if (Object.values(this)[0].memoizedProps.id === 'scroller') {
      return { height: 400 } as DOMRect;
    }
    return { height: 40 } as DOMRect;
  });
  const data = generateDataArray(1000);
  const { container } = render(
    <div style={{ overflow: 'auto', height: 400 }} id='scroller'>
      <VirtualScroll
        itemsLength={data.length}
        itemRenderer={(index) => (
          <div
            key={index}
            className='element'
            style={{ height: 40 }}
          >{`Element${data[index]}`}</div>
        )}
      />
    </div>,
  );
  act(() => triggerResize({ height: 400 } as DOMRectReadOnly));

  let allVisibleElements = container.querySelectorAll('.element');
  expect(allVisibleElements.length).toBe(30);
  expect(allVisibleElements[0].textContent).toBe('Element1');
  expect(allVisibleElements[29].textContent).toBe('Element30');

  const scrollable = container.querySelector('#scroller') as HTMLElement;
  fireEvent.scroll(scrollable, {
    target: { scrollTop: 160 },
  });
  allVisibleElements = container.querySelectorAll('.element');
  expect(allVisibleElements.length).toBe(30);
  expect(allVisibleElements[0].textContent).toBe('Element1');
  expect(allVisibleElements[29].textContent).toBe('Element30');

  fireEvent.scroll(scrollable, {
    target: { scrollTop: 800 },
  });
  allVisibleElements = container.querySelectorAll('.element');
  expect(allVisibleElements.length).toBe(30);
  expect(allVisibleElements[0].textContent).toBe('Element11');
  expect(allVisibleElements[29].textContent).toBe('Element40');

  // scroll up
  fireEvent.scroll(scrollable, {
    target: { scrollTop: 0 },
  });
  allVisibleElements = container.querySelectorAll('.element');
  expect(allVisibleElements.length).toBe(30);
  expect(allVisibleElements[0].textContent).toBe('Element1');
  expect(allVisibleElements[29].textContent).toBe('Element30');

  // scroll to the end
  fireEvent.scroll(scrollable, {
    target: { scrollTop: 39600 },
  });
  allVisibleElements = container.querySelectorAll('.element');
  expect(allVisibleElements.length).toBe(30);
  expect(allVisibleElements[0].textContent).toBe('Element971');
  expect(allVisibleElements[29].textContent).toBe('Element1000');
});

it('should not crash with empty list items', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heightsMock.mockImplementation(function (this: Record<string, any>) {
    if (Object.values(this)[0].memoizedProps.id === 'scroller') {
      return { height: 400 } as DOMRect;
    }
    return { height: 0 } as DOMRect;
  });
  const data = generateDataArray(1000);
  const { container } = render(
    <div style={{ overflow: 'auto', height: 400 }} id='scroller'>
      <VirtualScroll
        itemsLength={data.length}
        itemRenderer={(index) => <div key={index} className='element' />}
      />
    </div>,
  );
  act(() => triggerResize({ height: 400 } as DOMRectReadOnly));

  expect(container.querySelectorAll('.element').length).toBe(20);
});

it('should render 1 item', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heightsMock.mockImplementation(function (this: Record<string, any>) {
    if (Object.values(this)[0].memoizedProps.id === 'scroller') {
      return { height: 40 } as DOMRect;
    }
    return { height: 40 } as DOMRect;
  });
  const data = generateDataArray(1);
  const { container } = render(
    <div style={{ overflow: 'auto', maxHeight: 400 }} id='scroller'>
      <VirtualScroll
        itemsLength={data.length}
        itemRenderer={(index) => (
          <div key={index} className='element'>
            {data[index]}
          </div>
        )}
      />
    </div>,
  );
  act(() => triggerResize({ height: 40 } as DOMRectReadOnly));

  expect(container.querySelectorAll('.element').length).toBe(1);
});

it('should show provided index on first render', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heightsMock.mockImplementation(function (this: Record<string, any>) {
    if (Object.values(this)[0].memoizedProps.id === 'scroller') {
      return { height: 400 } as DOMRect;
    }
    return { height: 40 } as DOMRect;
  });

  jest
    .spyOn(HTMLElement.prototype, 'scrollTo')
    .mockImplementation(function (this: HTMLElement, options) {
      this.scrollTop = (options as ScrollToOptions).top ?? 0;
      fireEvent.scroll(this, {
        target: { scrollTop: (options as ScrollToOptions).top ?? 0 },
      });
    });
  const data = generateDataArray(1000);
  const { container } = render(
    <div style={{ overflow: 'auto', height: 400 }} id='scroller'>
      <VirtualScroll
        itemsLength={data.length}
        itemRenderer={(index) => (
          <div
            key={index}
            className='element'
            style={{ height: 40 }}
          >{`Element${data[index]}`}</div>
        )}
        scrollToIndex={50}
      />
    </div>,
  );
  act(() => triggerResize({ height: 400 } as DOMRectReadOnly));

  const allVisibleElements = container.querySelectorAll('.element');
  expect(allVisibleElements.length).toBe(30);
  expect(allVisibleElements[0].textContent).toBe('Element41');
  expect(allVisibleElements[29].textContent).toBe('Element70');
});

it('should render parent as ul', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heightsMock.mockImplementation(function (this: Record<string, any>) {
    if (Object.values(this)[0].memoizedProps.id === 'scroller') {
      return { height: 400 } as DOMRect;
    }
    return { height: 40 } as DOMRect;
  });

  jest
    .spyOn(HTMLElement.prototype, 'scrollTo')
    .mockImplementation(function (this: HTMLElement, options) {
      this.scrollTop = (options as ScrollToOptions).top ?? 0;
      fireEvent.scroll(this, {
        target: { scrollTop: (options as ScrollToOptions).top ?? 0 },
      });
    });
  const data = generateDataArray(4000);
  const MyComponentToRender = () => {
    const { outerProps, innerProps, visibleChildren } = useVirtualization({
      itemsLength: data.length,
      itemRenderer: (index) => (
        <li
          key={index}
          className='element'
          style={{ height: 40 }}
        >{`Element${data[index]}`}</li>
      ),
    });

    return (
      <div style={{ overflow: 'auto', height: 400 }} id='scroller'>
        <div {...outerProps}>
          <ul {...innerProps} className='customClass'>
            {visibleChildren}
          </ul>
        </div>
      </div>
    );
  };

  const { container } = render(<MyComponentToRender />);
  act(() => triggerResize({ height: 400 } as DOMRectReadOnly));

  expect(container.querySelector('ul.customClass')).toBeTruthy();
  const allVisibleElements = container.querySelectorAll('.element');
  expect(allVisibleElements.length).toBe(30);
  expect(allVisibleElements[0].textContent).toBe('Element1');
  expect(allVisibleElements[29].textContent).toBe('Element30');
});
