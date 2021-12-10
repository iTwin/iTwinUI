/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';
import SvgAdd from '@itwin/itwinui-icons-react/cjs/icons/Add';

import { IconButton } from './IconButton';

it('renders icon button correctly', () => {
  const onClickMock = jest.fn();
  const { container } = render(
    <IconButton onClick={onClickMock}>
      <SvgAdd />
    </IconButton>,
  );

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  expect(button).toBeTruthy();
  button.click();
  expect(onClickMock).toHaveBeenCalled();
  const icon = container.querySelector('.iui-button-icon');
  expect(icon).toBeTruthy();
});

it('renders active icon button correctly', () => {
  const onClickMock = jest.fn();
  const { container } = render(
    <IconButton isActive onClick={onClickMock}>
      <SvgAdd />
    </IconButton>,
  );

  const button = container.querySelector(
    '.iui-button.iui-active',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  button.click();
  expect(onClickMock).toHaveBeenCalled();
  const icon = container.querySelector('.iui-button-icon');
  expect(icon).toBeTruthy();
});

it('renders disabled small icon button correctly', () => {
  const onClickMock = jest.fn();
  const { container } = render(
    <IconButton disabled size='small' onClick={onClickMock}>
      <SvgAdd />
    </IconButton>,
  );

  const button = container.querySelector(
    '.iui-button.iui-small',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.disabled).toBe(true);
  button.click();
  expect(onClickMock).not.toHaveBeenCalled();
  const icon = container.querySelector('.iui-button-icon');
  expect(icon).toBeTruthy();
});

it('should render borderless button correctly', () => {
  const { container } = render(
    <IconButton styleType='borderless'>
      <SvgAdd />
    </IconButton>,
  );

  expect(container.querySelector('.iui-button.iui-borderless')).toBeTruthy();
});
