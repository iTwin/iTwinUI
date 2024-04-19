/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import * as React from 'react';

import { IdeasButton } from './IdeasButton.js';

const assertBaseElement = (container: HTMLElement) => {
  const button = container.querySelector('.iui-button') as HTMLButtonElement;

  expect(button).toBeTruthy();
  expect(button.classList).toContain('iui-button-idea');
  expect(button).toHaveAttribute('data-iui-variant', 'high-visibility');
  expect(button.type).toBe('button');

  return button;
};

it('renders ideas button correctly', () => {
  const onClickMock = vi.fn();
  const { container, getByText } = render(
    <IdeasButton onClick={onClickMock} />,
  );

  const button = assertBaseElement(container);
  button.click();
  expect(onClickMock).toHaveBeenCalled();
  expect(container.querySelector('.iui-button-icon')).toBeTruthy();
  getByText('Feedback');
});

it('takes localized label', () => {
  const onClickMock = vi.fn();
  const { container, getByText } = render(
    <IdeasButton feedbackLabel='my-feedback' onClick={onClickMock} />,
  );

  const button = assertBaseElement(container);
  button.click();
  expect(onClickMock).toHaveBeenCalled();
  expect(container.querySelector('.iui-button-icon')).toBeTruthy();
  getByText('my-feedback');
});
