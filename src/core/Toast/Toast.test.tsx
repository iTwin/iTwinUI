/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgErrorHollow from '@bentley/icons-generic-react/cjs/icons/status/ErrorHollow';
import SvgInfoHollow from '@bentley/icons-generic-react/cjs/icons/InfoHollow';
import SvgSuccessHollow from '@bentley/icons-generic-react/cjs/icons/status/SuccessHollow';
import { act, render, RenderResult } from '@testing-library/react';
import React from 'react';
import Toast, { ToastCategory } from './Toast';

it('renders the category classes & icons correctly', () => {
  const categories: Array<ToastCategory> = [
    'negative',
    'informational',
    'positive',
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

    expect(container.querySelector(`.iui-toast-${category}`)).toBeTruthy();

    let expectedIcon: RenderResult = {} as RenderResult;
    if (category === 'negative') {
      expectedIcon = render(
        <SvgErrorHollow className='iui-toast-status-icon' />,
      );
    } else if (category === 'informational') {
      expectedIcon = render(
        <SvgInfoHollow className='iui-toast-status-icon' />,
      );
    } else if (category === 'positive') {
      expectedIcon = render(
        <SvgSuccessHollow className='iui-toast-status-icon' />,
      );
    }
    const icon = container.querySelector('.iui-toast-status-icon');
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

it('renders a report message Link correctly', () => {
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

  const link = container.querySelector('.iui-toast-link > a') as HTMLElement;
  expect(link.textContent).toBe('View Message Function');
  link.click();
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
    container.querySelector('.iui-toast-close-icon-container'),
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

  expect(container.querySelector('.iui-toast-close-icon-container')).toBeNull();
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
    container.querySelector('.iui-toast-close-icon-container'),
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
  jest.runAllTimers();

  expect(mockedFn).toHaveBeenCalledTimes(1);
  expect(container.querySelector('.iui-toast-all')).toBeFalsy();

  jest.useRealTimers();
});
