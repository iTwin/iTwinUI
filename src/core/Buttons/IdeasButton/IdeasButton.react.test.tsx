import { render } from '@testing-library/react';
import React from 'react';

import { IdeasButton } from './IdeasButton';

it('renders ideas button correctly', () => {
  const onClickMock = jest.fn();
  const { container, getByText } = render(
    <IdeasButton onClick={onClickMock} />,
  );

  const button = container.querySelector(
    '.iui-buttons-idea',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.type).toBe('button');
  button.click();
  expect(onClickMock).toHaveBeenCalled();
  expect(container.querySelector('.iui-buttons-icon')).toBeTruthy();
  getByText('Feedback');
});

it('takes localized label', () => {
  const onClickMock = jest.fn();
  const { container, getByText } = render(
    <IdeasButton feedbackLabel='my-feedback' onClick={onClickMock} />,
  );

  const button = container.querySelector(
    '.iui-buttons-idea',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.type).toBe('button');
  button.click();
  expect(onClickMock).toHaveBeenCalled();
  expect(container.querySelector('.iui-buttons-icon')).toBeTruthy();
  getByText('my-feedback');
});
