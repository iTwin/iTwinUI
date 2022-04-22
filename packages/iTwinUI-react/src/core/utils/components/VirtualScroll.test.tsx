/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import VirtualScroll from './VirtualScroll';

// to return correct values for container 'scroller' and children
const heightsMock = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect');

it('should render only few elements out of big list', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heightsMock.mockImplementation(function (this: Record<string, any>) {
    if (Object.values(this)[0].memoizedProps.id === 'scroller') {
      return { height: 400 } as DOMRect;
    }
    return { height: 40 } as DOMRect;
  });
  const { container } = render(
    <div style={{ overflow: 'auto', height: 400 }} id='scroller'>
      <VirtualScroll
        itemsLength={1000}
        itemRenderer={(index) => (
          <div
            key={index}
            className='element'
            style={{ height: 40 }}
          >{`Element${index + 1}`}</div>
        )}
      />
    </div>,
  );
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
  expect(allVisibleElements.length).toBe(20);
  expect(allVisibleElements[0].textContent).toBe('Element981');
  expect(allVisibleElements[19].textContent).toBe('Element1000');
});

it('should not crash with empty list items', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heightsMock.mockImplementation(function (this: Record<string, any>) {
    if (Object.values(this)[0].memoizedProps.id === 'scroller') {
      return { height: 400 } as DOMRect;
    }
    return { height: 0 } as DOMRect;
  });
  const { container } = render(
    <div style={{ overflow: 'auto', height: 400 }} id='scroller'>
      <VirtualScroll
        itemsLength={1000}
        itemRenderer={(index) => <div key={index} className='element' />}
      />
    </div>,
  );
  expect(container.querySelectorAll('.element').length).toBe(20);
});
