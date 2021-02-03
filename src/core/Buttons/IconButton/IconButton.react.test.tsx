import { render } from '@testing-library/react';
import React from 'react';
import { SvgAdd } from '@bentley/icons-generic-react';

import { IconButton } from './IconButton';

it('renders icon button correctly', () => {
  const onClickMock = jest.fn();
  const { container } = render(
    <IconButton onClick={onClickMock}>
      <SvgAdd />
    </IconButton>,
  );

  const button = container.querySelector(
    '.iui-buttons-no-label',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  button.click();
  expect(onClickMock).toHaveBeenCalled();
  const icon = container.querySelector('.iui-buttons-icon');
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
    '.iui-buttons-no-label.iui-buttons-active',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  button.click();
  expect(onClickMock).toHaveBeenCalled();
  const icon = container.querySelector('.iui-buttons-icon');
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
    '.iui-buttons-no-label.iui-buttons-default-small',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.disabled).toBe(true);
  button.click();
  expect(onClickMock).not.toHaveBeenCalled();
  const icon = container.querySelector('.iui-buttons-icon');
  expect(icon).toBeTruthy();
});
