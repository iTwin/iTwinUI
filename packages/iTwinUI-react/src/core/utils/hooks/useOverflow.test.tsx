/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, render, waitFor } from '@testing-library/react';
import React from 'react';
import { useOverflow } from './useOverflow';
import * as UseResizeObserver from './useResizeObserver';

const MockComponent = ({
  children,
  disableOverflow = false,
  orientation = 'horizontal',
}: {
  children: React.ReactNode[] | string;
  disableOverflow?: boolean;
  orientation?: 'horizontal' | 'vertical';
}) => {
  const [overflowRef, visibleCount] = useOverflow(
    children,
    disableOverflow,
    orientation,
  );
  return <div ref={overflowRef}>{children.slice(0, visibleCount)}</div>;
};

afterEach(() => {
  jest.restoreAllMocks();
});

it.each(['horizontal', 'vertical'] as const)(
  'should overflow when there is not enough space (%s)',
  async (orientation) => {
    const dimension = orientation === 'horizontal' ? 'Width' : 'Height';
    jest
      .spyOn(HTMLDivElement.prototype, `scroll${dimension}`, 'get')
      .mockReturnValueOnce(120)
      .mockReturnValue(100);
    jest
      .spyOn(HTMLDivElement.prototype, `offset${dimension}`, 'get')
      .mockReturnValue(100);
    jest
      .spyOn(HTMLSpanElement.prototype, `offset${dimension}`, 'get')
      .mockReturnValue(25);

    const { container } = render(
      <MockComponent orientation={orientation}>
        {[...Array(5)].map((_, i) => (
          <span key={i}>Test {i}</span>
        ))}
      </MockComponent>,
    );

    await waitFor(() => {
      expect(container.querySelectorAll('span')).toHaveLength(4);
    });
  },
);

it('should overflow when there is not enough space  (string)', async () => {
  jest
    .spyOn(HTMLDivElement.prototype, 'scrollWidth', 'get')
    .mockReturnValueOnce(50)
    .mockReturnValue(28);
  jest
    .spyOn(HTMLDivElement.prototype, 'offsetWidth', 'get')
    .mockReturnValue(28);

  // 20 symbols (default value taken), 50 width
  // avg 2.5px per symbol
  const { container } = render(
    <MockComponent>This is a very long text.</MockComponent>,
  );

  // have 28px of a place
  // 11 symbols can fit
  await waitFor(() => {
    expect(container.textContent).toBe('This is a v');
  });
});

it('should overflow when there is not enough space but container fits 30 items', async () => {
  jest
    .spyOn(HTMLDivElement.prototype, 'scrollWidth', 'get')
    .mockReturnValueOnce(300)
    .mockReturnValueOnce(600)
    .mockReturnValue(300);
  jest
    .spyOn(HTMLDivElement.prototype, 'offsetWidth', 'get')
    .mockReturnValue(300);
  jest
    .spyOn(HTMLSpanElement.prototype, 'offsetWidth', 'get')
    .mockReturnValue(10);

  const { container } = render(
    <MockComponent>
      {[...Array(100)].map((_, i) => (
        <span key={i}>Test {i}</span>
      ))}
    </MockComponent>,
  );

  await waitFor(() => {
    expect(container.querySelectorAll('span')).toHaveLength(30);
  });
});

it('should restore hidden items when space is available again', async () => {
  let onResizeFn: (size: DOMRectReadOnly) => void = jest.fn();
  jest
    .spyOn(UseResizeObserver, 'useResizeObserver')
    .mockImplementation((onResize) => {
      onResizeFn = onResize;
      return [
        jest.fn(),
        { disconnect: jest.fn() } as unknown as ResizeObserver,
      ];
    });
  const scrollWidthSpy = jest
    .spyOn(HTMLDivElement.prototype, 'scrollWidth', 'get')
    .mockReturnValueOnce(120)
    .mockReturnValue(100);
  const offsetWidthSpy = jest
    .spyOn(HTMLDivElement.prototype, 'offsetWidth', 'get')
    .mockReturnValue(100);
  jest
    .spyOn(HTMLSpanElement.prototype, 'offsetWidth', 'get')
    .mockReturnValue(25);

  const { container, rerender } = render(
    <MockComponent>
      {[...Array(5)].map((_, i) => (
        <span key={i}>Test {i}</span>
      ))}
    </MockComponent>,
  );

  await waitFor(() => {
    expect(container.querySelectorAll('span')).toHaveLength(4);
  });

  scrollWidthSpy.mockReturnValue(125);
  offsetWidthSpy.mockReturnValue(125);
  rerender(
    <MockComponent>
      {[...Array(5)].map((_, i) => (
        <span key={i}>Test {i}</span>
      ))}
    </MockComponent>,
  );

  act(() => onResizeFn({ width: 125 } as DOMRectReadOnly));

  await waitFor(() => {
    expect(container.querySelectorAll('span')).toHaveLength(5);
  });
});

it('should not overflow when disabled', () => {
  jest
    .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
    .mockReturnValueOnce(120)
    .mockReturnValue(100);
  jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(100);

  const { container } = render(
    <MockComponent disableOverflow>
      {[...Array(50)].map((_, i) => (
        <span key={i}>Test {i}</span>
      ))}
    </MockComponent>,
  );

  expect(container.querySelectorAll('span')).toHaveLength(50);
});

it('should hide items and then show them all when overflow is disabled', async () => {
  jest
    .spyOn(HTMLDivElement.prototype, 'scrollWidth', 'get')
    .mockReturnValueOnce(300)
    .mockReturnValueOnce(600)
    .mockReturnValue(300);
  jest
    .spyOn(HTMLDivElement.prototype, 'offsetWidth', 'get')
    .mockReturnValue(300);
  jest
    .spyOn(HTMLSpanElement.prototype, 'offsetWidth', 'get')
    .mockReturnValue(10);

  const { container, rerender } = render(
    <MockComponent>
      {[...Array(100)].map((_, i) => (
        <span key={i}>Test {i}</span>
      ))}
    </MockComponent>,
  );

  await waitFor(() => {
    expect(container.querySelectorAll('span')).toHaveLength(30);
  });

  rerender(
    <MockComponent disableOverflow>
      {[...Array(100)].map((_, i) => (
        <span key={i}>Test {i}</span>
      ))}
    </MockComponent>,
  );

  await waitFor(() => {
    expect(container.querySelectorAll('span')).toHaveLength(100);
  });
});
