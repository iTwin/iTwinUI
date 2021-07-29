/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { Breadcrumbs, BreadcrumbsProps } from './Breadcrumbs';
import { Button } from '../Buttons';
import { SvgChevronRight } from '@itwin/itwinui-icons-react';

const renderComponent = (props?: Partial<BreadcrumbsProps>) => {
  return render(
    <Breadcrumbs {...props}>
      {[...Array(3)].map((_, index) => (
        <Button key={index}>Item {index}</Button>
      ))}
    </Breadcrumbs>,
  );
};

const assertBaseElement = (
  container: HTMLElement,
  { itemsLength = 3, currentIndex = 2 } = {},
) => {
  expect(container.querySelector('.iui-breadcrumbs')).toBeTruthy();
  expect(container.querySelector('.iui-breadcrumbs-list')).toBeTruthy();

  // breadcrumb items
  const breadcrumbs = container.querySelectorAll('.iui-breadcrumbs-item');
  expect(breadcrumbs.length).toEqual(itemsLength);
  breadcrumbs.forEach((breadcrumb, index) => {
    expect(breadcrumb.textContent).toEqual(`Item ${index}`);

    const item = breadcrumb.firstElementChild;
    expect(item).toBeTruthy();

    if (index === currentIndex) {
      expect(breadcrumb.classList).toContain('iui-current');
      expect(item?.getAttribute('aria-current')).toEqual('location');
    } else {
      expect(breadcrumb.classList).not.toContain('iui-current');
      expect(item?.getAttribute('aria-current')).toBeFalsy();
    }
  });
};

it('should render all elements in default state', () => {
  const { container } = renderComponent();
  assertBaseElement(container);

  const { container: chevron } = render(<SvgChevronRight />); // default separator

  const separators = container.querySelectorAll('.iui-breadcrumbs-separator');
  expect(separators.length).toEqual(2);
  separators.forEach((separator) => {
    expect(separator.getAttribute('aria-hidden')).toBeTruthy();
    expect(separator.firstElementChild).toEqual(chevron.firstChild);
  });
});

it('should render custom separators', () => {
  const { container } = renderComponent({ separator: '>' });
  expect(container.querySelector('.iui-breadcrumbs')).toBeTruthy();
  expect(container.querySelector('.iui-breadcrumbs-list')).toBeTruthy();
  expect(container.querySelectorAll('.iui-breadcrumbs-item').length).toEqual(3);

  const separators = container.querySelectorAll('.iui-breadcrumbs-separator');
  expect(separators.length).toEqual(2);
  separators.forEach((separator) => {
    expect(separator.getAttribute('aria-hidden')).toBeTruthy();
    expect(separator.textContent).toEqual('>');
  });
});

it('should accept currentIndex prop', () => {
  const { container } = renderComponent({ currentIndex: 1 });
  assertBaseElement(container, { currentIndex: 1 });
});

it('should overflow when there is not enough space', () => {
  const scrollWidthSpy = jest
    .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
    .mockReturnValueOnce(250)
    .mockReturnValue(200);
  const offsetWidthSpy = jest
    .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
    .mockReturnValue(200);

  const { container } = renderComponent();

  expect(container.querySelector('.iui-breadcrumbs')).toBeTruthy();
  expect(container.querySelector('.iui-breadcrumbs-list')).toBeTruthy();

  const breadcrumbs = container.querySelectorAll('.iui-breadcrumbs-item');
  expect(breadcrumbs.length).toEqual(3);
  expect(breadcrumbs[0].textContent).toEqual('Item 0');
  expect(breadcrumbs[1].textContent).toEqual('…');
  expect(breadcrumbs[1].firstElementChild?.classList).toContain('iui-ellipsis');
  expect(breadcrumbs[2].textContent).toEqual('Item 2');

  scrollWidthSpy.mockRestore();
  offsetWidthSpy.mockRestore();
});

it('should restore hidden items when there is enough space again', () => {
  const scrollWidthSpy = jest
    .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
    .mockReturnValueOnce(250)
    .mockReturnValue(200);
  const offsetWidthSpy = jest
    .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
    .mockReturnValue(200);

  const { container, rerender } = renderComponent();

  expect(container.querySelector('.iui-breadcrumbs')).toBeTruthy();
  expect(container.querySelectorAll('.iui-breadcrumbs-item')).toHaveLength(3);
  expect(container.querySelector('.iui-ellipsis')?.textContent).toEqual('…');

  scrollWidthSpy.mockReturnValue(250);
  offsetWidthSpy.mockReturnValue(250);

  rerender(
    <Breadcrumbs>
      {[...Array(3)].map((_, index) => (
        <Button key={index}>Item {index}</Button>
      ))}
    </Breadcrumbs>,
  );

  expect(container.querySelector('.iui-ellipsis')).toBeFalsy();
  assertBaseElement(container);

  scrollWidthSpy.mockRestore();
  offsetWidthSpy.mockRestore();
});

it('should hide first item on very small widths', () => {
  const scrollWidthSpy = jest
    .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
    .mockReturnValueOnce(250)
    .mockReturnValueOnce(150)
    .mockReturnValue(100);
  const offsetWidthSpy = jest
    .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
    .mockReturnValue(100);

  const { container } = renderComponent();

  expect(container.querySelector('.iui-breadcrumbs')).toBeTruthy();
  expect(container.querySelector('.iui-breadcrumbs-list')).toBeTruthy();

  const breadcrumbs = container.querySelectorAll('.iui-breadcrumbs-item');
  expect(breadcrumbs.length).toEqual(2);
  expect(breadcrumbs[0].textContent).toEqual('…');
  expect(breadcrumbs[0].firstElementChild?.classList).toContain('iui-ellipsis');
  expect(breadcrumbs[1].textContent).toEqual('Item 2');

  scrollWidthSpy.mockRestore();
  offsetWidthSpy.mockRestore();
});
