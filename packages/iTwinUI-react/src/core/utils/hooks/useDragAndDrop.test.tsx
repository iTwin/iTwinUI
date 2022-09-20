/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import useDragAndDrop from './useDragAndDrop';
import * as DomFunctions from '../functions/dom';

const DOMMatrixMock = jest.fn();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).DOMMatrix = DOMMatrixMock;

const getBoundingClientRectMock = jest
  .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
  .mockReturnValue({ top: 100, right: 200, bottom: 200, left: 100 } as DOMRect);

jest
  .spyOn(DomFunctions, 'getWindow')
  /* eslint-disable @typescript-eslint/no-explicit-any */
  .mockReturnValue({
    innerWidth: 300,
    innerHeight: 300,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  } as any);
/* eslint-enable @typescript-eslint/no-explicit-any */

const TestComponent = (props: {
  isVisible?: boolean;
  containerRef?: React.RefObject<HTMLElement>;
}) => {
  const { isVisible = true, containerRef } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const { onPointerDown, transform } = useDragAndDrop(ref, containerRef);

  return (
    <>
      {isVisible && (
        <div ref={ref} onPointerDown={onPointerDown} style={{ transform }} />
      )}
    </>
  );
};

beforeEach(() => {
  DOMMatrixMock.mockReturnValue({ m41: 0, m42: 0 });
  getBoundingClientRectMock.mockReturnValue({
    top: 100,
    right: 200,
    bottom: 200,
    left: 100,
  } as DOMRect);
});

afterAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).DOMMatrix = undefined;
  jest.clearAllMocks();
});

it('should handle drag', () => {
  const { container } = render(<TestComponent />);

  const element = container.firstChild as HTMLDivElement;
  fireEvent.pointerDown(element, { clientX: 100, clientY: 100, button: 0 });
  DOMMatrixMock.mockReturnValue({ m41: 100, m42: 100 });
  fireEvent.pointerMove(element, { clientX: 200, clientY: 200 });
  expect(element.style.transform).toBe('translate(100px, 100px)');
  expect(element.style.userSelect).toBe('none');
  fireEvent.pointerUp(element);
  expect(element.style.transform).toBe('translate(100px, 100px)');
  expect(element.style.userSelect).toBe('');

  // Should take previous transform into account.
  DOMMatrixMock.mockReturnValue({ m41: 100, m42: 100 });
  fireEvent.pointerDown(element, { clientX: 100, clientY: 100, button: 0 });
  DOMMatrixMock.mockReturnValue({ m41: 200, m42: 200 });
  fireEvent.pointerMove(element, { clientX: 200, clientY: 200 });
  expect(element.style.transform).toBe('translate(200px, 200px)');
  expect(element.style.userSelect).toBe('none');
  fireEvent.pointerUp(element);
  expect(element.style.transform).toBe('translate(200px, 200px)');
  expect(element.style.userSelect).toBe('');
});

it('should prevent from dragging outside container', () => {
  const { container } = render(
    <TestComponent
      containerRef={{
        current: {
          getBoundingClientRect: () =>
            ({ top: 50, right: 250, bottom: 250, left: 50 } as DOMRect),
        } as HTMLElement,
      }}
    />,
  );

  const element = container.firstChild as HTMLDivElement;
  fireEvent.pointerDown(element, { clientX: 150, clientY: 150, button: 0 });

  // Prevent from dragging too much on the left upper corner.
  DOMMatrixMock.mockReturnValue({ m41: -150, m42: -150 });
  getBoundingClientRectMock.mockReturnValue({
    top: -50,
    right: 50,
    bottom: 50,
    left: -50,
  } as DOMRect);
  fireEvent.pointerMove(element, { clientX: 0, clientY: 0 });
  expect(element.style.transform).toBe('translate(-50px, -50px)');

  // Prevent from dragging too much on the right down corner.
  DOMMatrixMock.mockReturnValue({ m41: 150, m42: 150 });
  getBoundingClientRectMock.mockReturnValue({
    top: 250,
    right: 350,
    bottom: 350,
    left: 250,
  } as DOMRect);
  fireEvent.pointerMove(element, { clientX: 300, clientY: 300 });
  expect(element.style.transform).toBe('translate(50px, 50px)');
});

it('should prevent from dragging outside window', () => {
  const { container } = render(<TestComponent />);

  const element = container.firstChild as HTMLDivElement;
  fireEvent.pointerDown(element, { clientX: 150, clientY: 150, button: 0 });

  // Prevent from dragging too much on the left upper corner.
  DOMMatrixMock.mockReturnValue({ m41: -250, m42: -250 });
  getBoundingClientRectMock.mockReturnValue({
    top: -150,
    right: -50,
    bottom: 50,
    left: -150,
  } as DOMRect);
  fireEvent.pointerMove(element, { clientX: -100, clientY: -100 });
  expect(element.style.transform).toBe('translate(-100px, -100px)');

  // Prevent from dragging too much on the right down corner.
  DOMMatrixMock.mockReturnValue({ m41: 850, m42: 850 });
  getBoundingClientRectMock.mockReturnValue({
    top: 950,
    right: 1050,
    bottom: 1050,
    left: 950,
  } as DOMRect);
  fireEvent.pointerMove(element, { clientX: 1000, clientY: 1000 });
  expect(element.style.transform).toBe('translate(100px, 100px)');
});

it('should preserve transform value after element was removed and brought back to the DOM', () => {
  const { container, rerender } = render(<TestComponent />);

  let element = container.firstChild as HTMLDivElement;
  fireEvent.pointerDown(element, { clientX: 100, clientY: 100, button: 0 });
  DOMMatrixMock.mockReturnValue({ m41: 100, m42: 100 });
  fireEvent.pointerMove(element, { clientX: 200, clientY: 200 });
  expect(element.style.transform).toBe('translate(100px, 100px)');
  fireEvent.pointerUp(element);
  expect(element.style.transform).toBe('translate(100px, 100px)');

  rerender(<TestComponent isVisible={false} />);

  rerender(<TestComponent />);
  element = container.firstChild as HTMLDivElement;
  expect(element.style.transform).toBe('translate(100px, 100px)');
});

it('should do nothing for mouse right click', () => {
  const { container } = render(<TestComponent />);

  const element = container.firstChild as HTMLDivElement;
  fireEvent.pointerDown(element, { clientX: 100, clientY: 100, button: 2 });
  fireEvent.pointerMove(element, { clientX: 200, clientY: 200 });
  expect(element.style.transform).toBe('');
  fireEvent.pointerUp(element);
  expect(element.style.transform).toBe('');
});
