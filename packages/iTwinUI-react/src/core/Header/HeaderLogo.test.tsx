/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SvgMore as SvgPlaceholder } from '../utils';

import HeaderLogo from './HeaderLogo';

it('renders default correctly', () => {
  const { container } = render(
    <HeaderLogo logo={<SvgPlaceholder />}>Application</HeaderLogo>,
  );

  const root = container.querySelector('.iui-header-brand') as HTMLDivElement;
  expect(root).toBeTruthy();
  expect(root.getAttribute('role')).toBeNull();

  const {
    container: { firstChild: placeholderIcon },
  } = render(<SvgPlaceholder className='iui-header-brand-icon' />);
  expect(container.querySelector('.iui-header-brand-icon')).toEqual(
    placeholderIcon,
  );

  const label = container.querySelector(
    '.iui-header-brand-label',
  ) as HTMLSpanElement;
  expect(label.textContent).toEqual('Application');
});

it('renders with onClick correctly', () => {
  const onClickMock = jest.fn();
  const { container } = render(
    <HeaderLogo logo={<SvgPlaceholder />} onClick={onClickMock}>
      Application
    </HeaderLogo>,
  );

  const root = container.querySelector('.iui-header-brand') as HTMLDivElement;
  expect(root).toBeTruthy();
  expect(root.getAttribute('role')).toBe('button');
  root.click();

  expect(onClickMock).toHaveBeenCalled();
});

it('handles keypress with onClick correctly', () => {
  const onClickMock = jest.fn();
  const { container } = render(
    <HeaderLogo logo={<SvgPlaceholder />} onClick={onClickMock}>
      Application
    </HeaderLogo>,
  );

  const root = container.querySelector('.iui-header-brand') as HTMLDivElement;
  expect(root).toBeTruthy();
  expect(root.getAttribute('role')).toBe('button');

  fireEvent.keyDown(root, { key: 'Enter' });
  expect(onClickMock).toHaveBeenCalledTimes(1);

  fireEvent.keyDown(root, { key: ' ' });
  expect(onClickMock).toHaveBeenCalledTimes(2);

  fireEvent.keyDown(root, { key: 'a' });
  expect(onClickMock).toHaveBeenCalledTimes(2);
});

it('renders with no children correctly', () => {
  const { container } = render(<HeaderLogo logo={<SvgPlaceholder />} />);

  const logo = container.querySelector(
    '.iui-header-brand-icon:only-child',
  ) as HTMLDivElement;
  expect(logo).toBeTruthy();

  const label = container.querySelector(
    '.iui-header-brand-label',
  ) as HTMLSpanElement;
  expect(label).toBeNull();
});

it('trashes wrong logo type (JS only)', () => {
  const { container } = render(
    <HeaderLogo logo={'myLogo' as unknown as JSX.Element}>
      Application
    </HeaderLogo>,
  );

  const root = container.querySelector('.iui-header-brand') as HTMLDivElement;
  expect(root).toBeTruthy();

  const label = container.querySelector(
    '.iui-header-brand-label:only-child',
  ) as HTMLSpanElement;
  expect(label).toBeTruthy();
});
