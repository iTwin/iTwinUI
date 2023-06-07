/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, fireEvent, render } from '@testing-library/react';
import * as React from 'react';

import { OldTooltip } from './Tooltip.js';

it('should toggle the visibility of OldTooltip on hover', () => {
  jest.useFakeTimers();
  const { getByText, queryByText } = render(
    <OldTooltip content='some text'>
      <div>Hover Here</div>
    </OldTooltip>,
  );

  expect(queryByText('some text')).toBeNull();

  fireEvent.mouseEnter(getByText('Hover Here'));
  getByText('some text');

  fireEvent.mouseLeave(getByText('Hover Here'));
  act(() => void jest.runAllTimers());
  expect(queryByText('some text')).not.toBeInTheDocument();

  jest.useRealTimers();
});

it('should be visible', () => {
  const { getByText } = render(
    <OldTooltip content='some text' visible>
      <div>Visible!</div>
    </OldTooltip>,
  );

  getByText('some text');
});

it('should not be visible', () => {
  const { queryByText } = render(
    <OldTooltip content='some text' visible={false}>
      <div>Visible!</div>
    </OldTooltip>,
  );

  expect(queryByText('some text')).toBeNull();
});

it('should allow button clicks and hovers', () => {
  const clickHandler = jest.fn();
  const mouseEnterHandler = jest.fn();
  const mouseLeaveHandler = jest.fn();

  const { getByText } = render(
    <OldTooltip content='OldTooltip!'>
      <button
        onClick={(event) => {
          clickHandler(event.clientX, event.clientY);
        }}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        Click me!
      </button>
    </OldTooltip>,
  );

  fireEvent.click(getByText('Click me!'), {
    clientX: 10,
    clientY: 20,
  });
  fireEvent.mouseEnter(getByText('Click me!'));
  fireEvent.mouseLeave(getByText('Click me!'));

  expect(clickHandler).toBeCalledWith(10, 20);
  expect(mouseEnterHandler).toBeCalledTimes(1);
  expect(mouseLeaveHandler).toBeCalledTimes(1);
});

it('should override title attribute', () => {
  const { getByText } = render(
    <OldTooltip content='some text' visible>
      <div title='should override'>child</div>
    </OldTooltip>,
  );

  getByText('some text');
  expect(getByText('child').getAttribute('title')).toBeNull();
});
