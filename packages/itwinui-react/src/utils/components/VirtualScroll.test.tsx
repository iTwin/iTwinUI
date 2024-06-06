/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { act, fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { VirtualScroll } from './VirtualScroll.js';
import * as UseResizeObserver from '../hooks/useResizeObserver.js';
import { useVirtualizer } from '@tanstack/react-virtual';

// to return correct values for container 'scroller' and children
const heightsMock = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect');
let triggerResize: (size: DOMRectReadOnly) => void = vi.fn();

const generateDataArray = (length: number) =>
  new Array(length).fill(null).map((_, index) => ++index);

beforeAll(() => {
  vi.spyOn(UseResizeObserver, 'useResizeObserver').mockImplementation(
    (onResize) => {
      triggerResize = onResize;
      return [vi.fn(), { disconnect: vi.fn() } as unknown as ResizeObserver];
    },
  );
});

afterAll(() => {
  vi.clearAllMocks();
});

it('should render only few elements out of big list', () => {
  heightsMock.mockImplementation(function (this: Record<string, any>) {
    if (Object.values(this)[0].memoizedProps.id === 'scroller') {
      return { height: 400 } as DOMRect;
    }
    return { height: 40 } as DOMRect;
  });
  const data = generateDataArray(1000);
  const TestComponent = () => {
    const [parentRef, setParentRef] = React.useState<HTMLDivElement | null>(
      null,
    );
    return (
      <div
        style={{ overflow: 'auto', height: 400 }}
        id='scroller'
        ref={(element) => {
          setParentRef(element);
        }}
      >
        <VirtualScroll
          itemsLength={data.length}
          itemRenderer={(index) => (
            <div
              key={index}
              className='element'
              style={{ height: 40 }}
            >{`Element${data[index]}`}</div>
          )}
          scrollContainerRef={parentRef}
          bufferSize={20}
        />
      </div>
    );
  };
  const { container } = render(<TestComponent />);
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
  heightsMock.mockImplementation(function (this: Record<string, any>) {
    if (Object.values(this)[0].memoizedProps.id === 'scroller') {
      return { height: 400 } as DOMRect;
    }
    return { height: 0 } as DOMRect;
  });
  const data = generateDataArray(1000);
  const TestComponent = () => {
    const [parentRef, setParentRef] = React.useState<HTMLDivElement | null>(
      null,
    );
    return (
      <div
        style={{ overflow: 'auto', height: 400 }}
        id='scroller'
        ref={(element) => {
          setParentRef(element);
        }}
      >
        <VirtualScroll
          itemsLength={data.length}
          itemRenderer={(index) => (
            <div key={index} className='element' style={{ height: 40 }} />
          )}
          scrollContainerRef={parentRef}
          //bufferSize={20}
        />
      </div>
    );
  };
  const { container } = render(<TestComponent />);
  act(() => triggerResize({ height: 400 } as DOMRectReadOnly));

  expect(container.querySelectorAll('.element').length).toBe(20);
});

it('should render 1 item', () => {
  heightsMock.mockImplementation(function (this: Record<string, any>) {
    if (Object.values(this)[0].memoizedProps.id === 'scroller') {
      return { height: 40 } as DOMRect;
    }
    return { height: 40 } as DOMRect;
  });
  const data = generateDataArray(1);
  const TestComponent = () => {
    const [parentRef, setParentRef] = React.useState<HTMLDivElement | null>(
      null,
    );
    return (
      <div
        style={{ overflow: 'auto', height: 400 }}
        id='scroller'
        ref={(element) => {
          setParentRef(element);
        }}
      >
        <VirtualScroll
          itemsLength={data.length}
          itemRenderer={(index) => (
            <div key={index} className='element'>
              {data[index]}
            </div>
          )}
          scrollContainerRef={parentRef}
          bufferSize={20}
        />
      </div>
    );
  };
  const { container } = render(<TestComponent />);
  act(() => triggerResize({ height: 40 } as DOMRectReadOnly));

  expect(container.querySelectorAll('.element').length).toBe(1);
});

it('should show provided index on first render', () => {
  heightsMock.mockImplementation(function (this: Record<string, any>) {
    if (Object.values(this)[0].memoizedProps.id === 'scroller') {
      return { height: 400 } as DOMRect;
    }
    return { height: 40 } as DOMRect;
  });

  vi.spyOn(HTMLElement.prototype, 'scrollTo').mockImplementation(function (
    this: HTMLElement,
    options,
  ) {
    this.scrollTop = (options as ScrollToOptions).top ?? 0;
    fireEvent.scroll(this, {
      target: { scrollTop: (options as ScrollToOptions).top ?? 0 },
    });
  });
  const data = generateDataArray(1000);
  const TestComponent = () => {
    const [parentRef, setParentRef] = React.useState<HTMLDivElement | null>(
      null,
    );
    return (
      <div
        style={{ overflow: 'auto', height: 400 }}
        id='scroller'
        ref={(element) => {
          setParentRef(element);
        }}
      >
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
          scrollContainerRef={parentRef}
          bufferSize={20}
        />
      </div>
    );
  };
  const { container } = render(<TestComponent />);
  act(() => triggerResize({ height: 400 } as DOMRectReadOnly));

  const allVisibleElements = container.querySelectorAll('.element');
  expect(allVisibleElements.length).toBe(30);
  expect(allVisibleElements[0].textContent).toBe('Element41');
  expect(allVisibleElements[29].textContent).toBe('Element70');
});

it('should render parent as ul', () => {
  heightsMock.mockImplementation(function (this: Record<string, any>) {
    if (Object.values(this)[0].memoizedProps.id === 'scroller') {
      return { height: 400 } as DOMRect;
    }
    return { height: 40 } as DOMRect;
  });

  vi.spyOn(HTMLElement.prototype, 'scrollTo').mockImplementation(function (
    this: HTMLElement,
    options,
  ) {
    this.scrollTop = (options as ScrollToOptions).top ?? 0;
    fireEvent.scroll(this, {
      target: { scrollTop: (options as ScrollToOptions).top ?? 0 },
    });
  });
  const data = generateDataArray(4000);
  const MyComponentToRender = () => {
    const parentRef = React.useRef(null);
    const virtualizer = useVirtualizer({
      count: data.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 40,
      overscan: 20,
    });
    const itemRenderer = (index: number) => (
      <li
        key={index}
        className='element'
        style={{ height: 40 }}
      >{`Element${data[index]}`}</li>
    );
    const innerProps = {
      style: { willChange: 'transform' },
    } as const;

    return (
      <div
        style={{ overflow: 'auto', height: 400 }}
        id='scroller'
        ref={parentRef}
      >
        <div
          style={{
            minBlockSize: virtualizer.getTotalSize(),
            minInlineSize: '100%',
          }}
        >
          <ul {...innerProps} className='customClass'>
            {virtualizer.getVirtualItems().map((virtualItem) => (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={virtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {itemRenderer(virtualItem.index)}
              </div>
            ))}
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
