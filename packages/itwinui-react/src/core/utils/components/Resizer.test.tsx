/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Resizer, { ResizerProps } from './Resizer';
import * as Styles from '../functions/styles';

jest.spyOn(Styles, 'getTranslateValues').mockReturnValue([100, 100]);
jest.spyOn(window, 'getComputedStyle').mockReturnValue({
  minWidth: '50px',
  minHeight: '50px',
} as CSSStyleDeclaration);
jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
  width: 100,
  height: 100,
} as DOMRect);

const onResizeEnd = jest.fn();

const TestComponent = (props?: Partial<ResizerProps>) => {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <div
      id='test-component'
      ref={ref}
      style={{ width: 100, height: 100, transform: 'translate(100px, 100px)' }}
    >
      <Resizer
        elementRef={ref}
        containerRef={{
          current: {
            getBoundingClientRect: () => ({
              left: 0,
              right: 300,
              top: 0,
              bottom: 300,
            }),
          } as HTMLElement,
        }}
        onResizeEnd={onResizeEnd}
        {...props}
      />
    </div>
  );
};

const renderComponent = (props?: Partial<ResizerProps>) => {
  return render(<TestComponent {...props} />);
};

afterEach(() => {
  jest.clearAllMocks();
});

/*
 * For better understanding how everything is positioned.
 * +------------------------------+
 * |                              |
 * |  (100;100)                   |
 * |      +---------------+       |
 * |      |    w=100px    |       |
 * |      |               |       |
 * |      |               |       |
 * |      | h=100px       |       | h=300px
 * |      |               |       |
 * |      |    element    |       |
 * |      +---------------+       |
 * |                  (200;200)   |
 * |                              |
 * |         container            |
 * +------------------------------+
 *            w=300px         (300;300)
 */

it('should resize from the top-left', () => {
  const { container } = renderComponent();

  const element = container.querySelector('#test-component') as HTMLElement;
  expect(element).toBeTruthy();
  const resizer = container.querySelector(
    '[data-iui-resizer="top-left"]',
  ) as HTMLElement;
  expect(resizer).toBeTruthy();

  fireEvent.pointerDown(resizer, { clientX: 100, clientY: 100, button: 0 });
  // Resize past container top-left corner
  fireEvent.pointerMove(resizer, { clientX: -100, clientY: -100 });
  expect(element.style.width).toBe('200px');
  expect(element.style.height).toBe('200px');
  expect(element.style.transform).toBe('translate(0px, 0px)');

  // Resize to minimum size
  fireEvent.pointerMove(resizer, { clientX: 150, clientY: 150 });
  // Resize past the minimum size
  fireEvent.pointerMove(resizer, { clientX: 200, clientY: 200 });
  expect(element.style.width).toBe('50px');
  expect(element.style.height).toBe('50px');
  expect(element.style.transform).toBe('translate(150px, 150px)');

  // Normal resize
  fireEvent.pointerMove(resizer, { clientX: 50, clientY: 50 });
  expect(element.style.width).toBe('150px');
  expect(element.style.height).toBe('150px');
  expect(element.style.transform).toBe('translate(50px, 50px)');
  fireEvent.pointerUp(resizer);

  expect(onResizeEnd).toHaveBeenCalledWith({
    width: '150px',
    height: '150px',
    transform: 'translate(50px, 50px)',
  });
});

it('should resize from the top', () => {
  const { container } = renderComponent();

  const element = container.querySelector('#test-component') as HTMLElement;
  expect(element).toBeTruthy();
  const resizer = container.querySelector(
    '[data-iui-resizer="top"]',
  ) as HTMLElement;
  expect(resizer).toBeTruthy();

  fireEvent.pointerDown(resizer, { clientX: 150, clientY: 100, button: 0 });
  // Resize past container top edge
  fireEvent.pointerMove(resizer, { clientX: 150, clientY: -100 });
  expect(element.style.width).toBe('100px');
  expect(element.style.height).toBe('200px');
  expect(element.style.transform).toBe('translate(100px, 0px)');

  // Resize to minimum height
  fireEvent.pointerMove(resizer, { clientX: 150, clientY: 150 });
  // Resize past the minimum height
  fireEvent.pointerMove(resizer, { clientX: 150, clientY: 200 });
  expect(element.style.width).toBe('100px');
  expect(element.style.height).toBe('50px');
  expect(element.style.transform).toBe('translate(100px, 150px)');

  // Normal resize
  fireEvent.pointerMove(resizer, { clientX: 150, clientY: 50 });
  expect(element.style.width).toBe('100px');
  expect(element.style.height).toBe('150px');
  expect(element.style.transform).toBe('translate(100px, 50px)');
  fireEvent.pointerUp(resizer);

  expect(onResizeEnd).toHaveBeenCalledWith({
    width: '100px',
    height: '150px',
    transform: 'translate(100px, 50px)',
  });
});

it('should resize from the top-right', () => {
  const { container } = renderComponent();

  const element = container.querySelector('#test-component') as HTMLElement;
  expect(element).toBeTruthy();
  const resizer = container.querySelector(
    '[data-iui-resizer="top-right"]',
  ) as HTMLElement;
  expect(resizer).toBeTruthy();

  fireEvent.pointerDown(resizer, { clientX: 200, clientY: 100, button: 0 });
  // Resize past container top-right corner
  fireEvent.pointerMove(resizer, { clientX: 500, clientY: -500 });
  expect(element.style.width).toBe('200px');
  expect(element.style.height).toBe('200px');
  expect(element.style.transform).toBe('translate(100px, 0px)');

  // Resize to minimum height
  fireEvent.pointerMove(resizer, { clientX: 150, clientY: 150 });
  // Resize past the minimum height
  fireEvent.pointerMove(resizer, { clientX: 150, clientY: 200 });
  expect(element.style.width).toBe('50px');
  expect(element.style.height).toBe('50px');
  expect(element.style.transform).toBe('translate(100px, 150px)');

  // Normal resize
  fireEvent.pointerMove(resizer, { clientX: 250, clientY: 50 });
  expect(element.style.width).toBe('150px');
  expect(element.style.height).toBe('150px');
  expect(element.style.transform).toBe('translate(100px, 50px)');
  fireEvent.pointerUp(resizer);

  expect(onResizeEnd).toHaveBeenCalledWith({
    width: '150px',
    height: '150px',
    transform: 'translate(100px, 50px)',
  });
});

it('should resize from the right', () => {
  const { container } = renderComponent();

  const element = container.querySelector('#test-component') as HTMLElement;
  expect(element).toBeTruthy();
  const resizer = container.querySelector(
    '[data-iui-resizer="right"]',
  ) as HTMLElement;
  expect(resizer).toBeTruthy();

  fireEvent.pointerDown(resizer, { clientX: 200, clientY: 150, button: 0 });
  // Resize past container right edge
  fireEvent.pointerMove(resizer, { clientX: 500, clientY: 150 });
  expect(element.style.width).toBe('200px');
  expect(element.style.height).toBe('100px');
  expect(element.style.transform).toBe('translate(100px, 100px)');

  // Normal resize
  fireEvent.pointerMove(resizer, { clientX: 250, clientY: 150 });
  expect(element.style.width).toBe('150px');
  expect(element.style.height).toBe('100px');
  expect(element.style.transform).toBe('translate(100px, 100px)');
  fireEvent.pointerUp(resizer);

  expect(onResizeEnd).toHaveBeenCalledWith({
    width: '150px',
    height: '100px',
    transform: 'translate(100px, 100px)',
  });
});

it('should resize from the bottom-right', () => {
  const { container } = renderComponent();

  const element = container.querySelector('#test-component') as HTMLElement;
  expect(element).toBeTruthy();
  const resizer = container.querySelector(
    '[data-iui-resizer="bottom-right"]',
  ) as HTMLElement;
  expect(resizer).toBeTruthy();

  fireEvent.pointerDown(resizer, { clientX: 200, clientY: 200, button: 0 });
  // Resize past container bottom-right corner
  fireEvent.pointerMove(resizer, { clientX: 500, clientY: 500 });
  expect(element.style.width).toBe('200px');
  expect(element.style.height).toBe('200px');
  expect(element.style.transform).toBe('translate(100px, 100px)');

  // Normal resize
  fireEvent.pointerMove(resizer, { clientX: 250, clientY: 250 });
  expect(element.style.width).toBe('150px');
  expect(element.style.height).toBe('150px');
  expect(element.style.transform).toBe('translate(100px, 100px)');
  fireEvent.pointerUp(resizer);

  expect(onResizeEnd).toHaveBeenCalledWith({
    width: '150px',
    height: '150px',
    transform: 'translate(100px, 100px)',
  });
});

it('should resize from the bottom-left', () => {
  const { container } = renderComponent();

  const element = container.querySelector('#test-component') as HTMLElement;
  expect(element).toBeTruthy();
  const resizer = container.querySelector(
    '[data-iui-resizer="bottom-left"]',
  ) as HTMLElement;
  expect(resizer).toBeTruthy();

  fireEvent.pointerDown(resizer, { clientX: 100, clientY: 200, button: 0 });
  // Resize past container bottom-left corner
  fireEvent.pointerMove(resizer, { clientX: -500, clientY: 500 });
  expect(element.style.width).toBe('200px');
  expect(element.style.height).toBe('200px');
  expect(element.style.transform).toBe('translate(0px, 100px)');

  // Resize to minimum width
  fireEvent.pointerMove(resizer, { clientX: 150, clientY: 150 });
  // Resize past the minimum width
  fireEvent.pointerMove(resizer, { clientX: 200, clientY: 150 });
  expect(element.style.width).toBe('50px');
  expect(element.style.height).toBe('50px');
  expect(element.style.transform).toBe('translate(150px, 100px)');

  // Normal resize
  fireEvent.pointerMove(resizer, { clientX: 50, clientY: 250 });
  expect(element.style.width).toBe('150px');
  expect(element.style.height).toBe('150px');
  expect(element.style.transform).toBe('translate(50px, 100px)');
  fireEvent.pointerUp(resizer);

  expect(onResizeEnd).toHaveBeenCalledWith({
    width: '150px',
    height: '150px',
    transform: 'translate(50px, 100px)',
  });
});

it('should resize from the left', () => {
  const { container } = renderComponent();

  const element = container.querySelector('#test-component') as HTMLElement;
  expect(element).toBeTruthy();
  const resizer = container.querySelector(
    '[data-iui-resizer="left"]',
  ) as HTMLElement;
  expect(resizer).toBeTruthy();

  fireEvent.pointerDown(resizer, { clientX: 100, clientY: 150, button: 0 });
  // Resize past container left edge
  fireEvent.pointerMove(resizer, { clientX: -500, clientY: 150 });
  expect(element.style.width).toBe('200px');
  expect(element.style.height).toBe('100px');
  expect(element.style.transform).toBe('translate(0px, 100px)');

  // Resize to minimum width
  fireEvent.pointerMove(resizer, { clientX: 150, clientY: 150 });
  // Resize past the minimum width
  fireEvent.pointerMove(resizer, { clientX: 200, clientY: 150 });
  expect(element.style.width).toBe('50px');
  expect(element.style.height).toBe('100px');
  expect(element.style.transform).toBe('translate(150px, 100px)');

  // Normal resize
  fireEvent.pointerMove(resizer, { clientX: 50, clientY: 150 });
  expect(element.style.width).toBe('150px');
  expect(element.style.height).toBe('100px');
  expect(element.style.transform).toBe('translate(50px, 100px)');
  fireEvent.pointerUp(resizer);

  expect(onResizeEnd).toHaveBeenCalledWith({
    width: '150px',
    height: '100px',
    transform: 'translate(50px, 100px)',
  });
});

it('should set user-select to none when resizing', () => {
  const { container } = renderComponent();

  const resizer = container.querySelector(
    '[data-iui-resizer="right"]',
  ) as HTMLElement;
  expect(resizer).toBeTruthy();

  expect(document.body.style.userSelect).toBe('');

  fireEvent.pointerDown(resizer, { clientX: 200, clientY: 150, button: 0 });
  expect(document.body.style.userSelect).toBe('none');
  fireEvent.pointerMove(resizer, { clientX: 250, clientY: 150 });
  fireEvent.pointerUp(resizer);
  expect(document.body.style.userSelect).toBe('');
});

it('should do nothing on mouse right click', () => {
  const { container } = renderComponent();

  const element = container.querySelector('#test-component') as HTMLElement;
  expect(element).toBeTruthy();
  const resizer = container.querySelector(
    '[data-iui-resizer="right"]',
  ) as HTMLElement;
  expect(resizer).toBeTruthy();

  fireEvent.pointerDown(resizer, { clientX: 200, clientY: 150, button: 1 });
  fireEvent.pointerMove(resizer, { clientX: 250, clientY: 150 });
  expect(element.style.width).toBe('100px');
  expect(element.style.height).toBe('100px');
  expect(element.style.transform).toBe('translate(100px, 100px)');
  fireEvent.pointerUp(resizer);
  expect(onResizeEnd).not.toHaveBeenCalled();
});
