/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';
import { useOverflow } from './useOverflow';

const MockComponent = ({
  children,
  disableOverflow = false,
}: {
  children: React.ReactNode[];
  disableOverflow?: boolean;
}) => {
  const [overflowRef, visibleCount] = useOverflow(children, disableOverflow);
  return <div ref={overflowRef}>{children.slice(0, visibleCount)}</div>;
};

it('should overflow when there is not enough space', () => {
  const scrollWidthSpy = jest
    .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
    .mockReturnValueOnce(120)
    .mockReturnValue(100);
  const offsetWidthSpy = jest
    .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
    .mockReturnValue(100);

  const { container } = render(
    <MockComponent>
      {[...Array(5)].map((_, i) => (
        <span key={i}>Test {i}</span>
      ))}
    </MockComponent>,
  );

  expect(container.querySelectorAll('span')).toHaveLength(4);

  scrollWidthSpy.mockRestore();
  offsetWidthSpy.mockRestore();
});

it('should restore hidden items when space is available again', () => {
  const scrollWidthSpy = jest
    .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
    .mockReturnValueOnce(120)
    .mockReturnValueOnce(100);
  const offsetWidthSpy = jest
    .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
    .mockReturnValueOnce(100)
    .mockReturnValueOnce(100);

  const { container, rerender } = render(
    <MockComponent>
      {[...Array(5)].map((_, i) => (
        <span key={i}>Test {i}</span>
      ))}
    </MockComponent>,
  );

  expect(container.querySelectorAll('span')).toHaveLength(4);

  scrollWidthSpy.mockReturnValue(120);
  offsetWidthSpy.mockReturnValue(120);
  rerender(
    <MockComponent>
      {[...Array(5)].map((_, i) => (
        <span key={i}>Test {i}</span>
      ))}
    </MockComponent>,
  );

  expect(container.querySelectorAll('span')).toHaveLength(5);

  scrollWidthSpy.mockRestore();
  offsetWidthSpy.mockRestore();
});

it('should not overflow when disabled', () => {
  const scrollWidthSpy = jest
    .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
    .mockReturnValueOnce(120)
    .mockReturnValue(100);
  const offsetWidthSpy = jest
    .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
    .mockReturnValue(100);

  const { container } = render(
    <MockComponent disableOverflow>
      {[...Array(5)].map((_, i) => (
        <span key={i}>Test {i}</span>
      ))}
    </MockComponent>,
  );

  expect(container.querySelectorAll('span')).toHaveLength(5);

  scrollWidthSpy.mockRestore();
  offsetWidthSpy.mockRestore();
});
