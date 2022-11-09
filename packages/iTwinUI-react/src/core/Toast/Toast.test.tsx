/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, render, RenderResult } from '@testing-library/react';
import React from 'react';
import Toast, { ToastCategory } from './Toast';
import {
  SvgInfoCircular,
  SvgStatusError,
  SvgStatusSuccess,
  SvgStatusWarning,
} from '../utils';
import userEvent from '@testing-library/user-event';

it('renders the category classes & icons correctly', () => {
  const categories: Array<ToastCategory> = [
    'negative',
    'informational',
    'positive',
    'warning',
  ];
  categories.forEach((category) => {
    const { container } = render(
      <Toast
        isVisible={true}
        type='persisting'
        content='Job Processing Completed'
        category={category}
        id={1}
      />,
    );

    expect(container.querySelector(`.iui-toast.iui-${category}`)).toBeTruthy();

    let expectedIcon: RenderResult = {} as RenderResult;
    if (category === 'negative') {
      expectedIcon = render(
        <SvgStatusError className='iui-icon' aria-hidden />,
      );
    } else if (category === 'informational') {
      expectedIcon = render(
        <SvgInfoCircular className='iui-icon' aria-hidden />,
      );
    } else if (category === 'positive') {
      expectedIcon = render(
        <SvgStatusSuccess className='iui-icon' aria-hidden />,
      );
    } else if (category === 'warning') {
      expectedIcon = render(
        <SvgStatusWarning className='iui-icon' aria-hidden />,
      );
    }
    const icon = container.querySelector('.iui-icon');
    expect(expectedIcon.container.firstChild).toEqual(icon);
  });
});

it('renders the message correctly', () => {
  const { getByText } = render(
    <Toast
      isVisible={true}
      type='persisting'
      content='Job Processing Completed'
      category='positive'
      id={1}
    />,
  );

  getByText('Job Processing Completed');
});

it('renders a report message Link correctly', async () => {
  const mockedFn = jest.fn();
  const { container } = render(
    <Toast
      isVisible={true}
      type='persisting'
      content='Job Processing Completed'
      category='positive'
      link={{
        title: 'View Message Function',
        onClick: mockedFn,
      }}
      id={1}
    />,
  );

  const link = container.querySelector('.iui-toast-anchor') as HTMLElement;
  expect(link.textContent).toBe('View Message Function');
  await userEvent.click(link);
  expect(mockedFn).toHaveBeenCalled();
});

it('renders the close icon correctly', () => {
  const { container } = render(
    <Toast
      isVisible={true}
      type='persisting'
      content='Job Processing Completed'
      category='positive'
      id={1}
    />,
  );

  expect(
    container.querySelector('.iui-button[data-iui-variant="borderless"]'),
  ).toBeTruthy();
});

it('not render close icon in temporary', () => {
  const { container } = render(
    <Toast
      isVisible={true}
      type='temporary'
      content='Job Processing Completed'
      category='positive'
      id={1}
    />,
  );

  expect(
    container.querySelector('.iui-button[data-iui-variant="borderless"]'),
  ).toBeNull();
});

it('renders the close icon when hasCloseButton', () => {
  const { container } = render(
    <Toast
      isVisible={true}
      hasCloseButton={true}
      type='temporary'
      content='Job Processing Completed'
      category='positive'
      id={1}
    />,
  );

  expect(
    container.querySelector('.iui-button[data-iui-variant="borderless"]'),
  ).toBeTruthy();
});

it('should close temporary toast after 7s', () => {
  jest.useFakeTimers();

  const mockedFn = jest.fn();
  const { container } = render(
    <Toast
      isVisible={true}
      type='temporary'
      content='Job Processing Completed'
      category='informational'
      id={1}
      onRemove={mockedFn}
    />,
  );

  expect(container.querySelector('.iui-toast-all')).toBeTruthy();

  act(() => {
    jest.advanceTimersByTime(7300);
  });

  act(() => {
    jest.runAllTimers();
  });

  expect(mockedFn).toHaveBeenCalledTimes(1);
  expect(container.querySelector('.iui-toast-all')).toBeFalsy();

  jest.useRealTimers();
});
