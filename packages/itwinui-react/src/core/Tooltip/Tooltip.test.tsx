/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { Tooltip } from './Tooltip.js';

it('should toggle the visibility of tooltip on hover', async () => {
  jest.useFakeTimers();

  const { getByText, queryByText } = render(
    <Tooltip content='some text'>
      <div>Hover Here</div>
    </Tooltip>,
  );

  expect(queryByText('some text')).not.toBeVisible();

  fireEvent.mouseEnter(getByText('Hover Here'));
  act(() => void jest.advanceTimersByTime(50));
  expect(getByText('some text')).toBeVisible();

  fireEvent.mouseLeave(getByText('Hover Here'));
  act(() => void jest.advanceTimersByTime(250));

  expect(queryByText('some text')).not.toBeVisible();

  jest.useRealTimers();
});

it('should be visible', () => {
  const { getByText } = render(
    <Tooltip content='some text' visible>
      <div>Visible!</div>
    </Tooltip>,
  );

  getByText('some text');
});

it('should respect visible prop', () => {
  const { queryByText, rerender } = render(
    <Tooltip content='some text' visible={false}>
      <div>Visible!</div>
    </Tooltip>,
  );

  expect(queryByText('some text')).not.toBeVisible();

  rerender(
    <Tooltip content='some text' visible>
      <div>Not visible!</div>
    </Tooltip>,
  );

  expect(queryByText('some text')).toBeVisible();
});

it('should allow button clicks and hovers', () => {
  const clickHandler = jest.fn();
  const mouseEnterHandler = jest.fn();
  const mouseLeaveHandler = jest.fn();

  const { getByText } = render(
    <Tooltip content='Tooltip!'>
      <button
        onClick={(event) => {
          clickHandler(event.clientX, event.clientY);
        }}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        Click me!
      </button>
    </Tooltip>,
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

it.each(['description', 'label', 'none'] as const)(
  'should respect ariaStrategy=%s',
  (strategy) => {
    const { getByText } = render(
      <Tooltip content='some text' ariaStrategy={strategy}>
        <button>hi</button>
      </Tooltip>,
    );

    const trigger = getByText('hi');

    if (strategy === 'description') {
      expect(trigger).toHaveAccessibleName('hi');
      expect(trigger).toHaveAccessibleDescription('some text');
    } else if (strategy === 'label') {
      expect(trigger).toHaveAccessibleName('some text');
      expect(trigger).not.toHaveAccessibleDescription();
    } else {
      expect(trigger).toHaveAccessibleName('hi');
      expect(trigger).not.toHaveAccessibleDescription();
    }
  },
);
