/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { Tooltip } from './Tooltip.js';

it('should toggle the visibility of tooltip on hover', () => {
  const onVisibleChange = vi.fn();

  const { getByText } = render(
    <Tooltip content='some text' onVisibleChange={onVisibleChange}>
      <div>Hover Here</div>
    </Tooltip>,
  );

  const trigger = getByText('Hover Here');
  expect(trigger).toHaveAccessibleDescription('some text');

  const tooltip = getByText('some text');
  expect(tooltip).not.toBeVisible();
  expect(tooltip).toHaveAttribute('popover');

  fireEvent.mouseEnter(trigger);
  expect(tooltip).toBeVisible();
  expect(onVisibleChange).toBeCalledWith(true);

  fireEvent.mouseLeave(trigger);
  expect(tooltip).not.toBeVisible();
  expect(onVisibleChange).toBeCalledWith(false);
});

it('should toggle the visibility of tooltip on focus', async () => {
  vi.useFakeTimers();
  const onVisibleChange = vi.fn();

  const { getByText } = render(
    <Tooltip content='some text' onVisibleChange={onVisibleChange}>
      <button>focus here</button>
    </Tooltip>,
  );

  const trigger = getByText('focus here');
  expect(trigger).toHaveAccessibleDescription('some text');

  const tooltip = getByText('some text');
  expect(tooltip).not.toBeVisible();
  expect(tooltip).toHaveAttribute('popover');

  fireEvent.focus(trigger);
  act(() => void vi.advanceTimersByTime(50));
  expect(tooltip).toBeVisible();
  expect(onVisibleChange).toBeCalledWith(true);

  fireEvent.blur(trigger);
  act(() => void vi.advanceTimersByTime(250));
  expect(tooltip).not.toBeVisible();
  expect(onVisibleChange).toBeCalledWith(false);

  vi.useRealTimers();
});

it('should respect visible prop', () => {
  const { queryByText, rerender } = render(
    <Tooltip content='some text' visible={false}>
      <div>Not visible!</div>
    </Tooltip>,
  );

  expect(queryByText('some text')).not.toBeVisible();

  rerender(
    <Tooltip content='some text' visible>
      <div>Visible!</div>
    </Tooltip>,
  );

  expect(queryByText('some text')).toBeVisible();
});

it('should allow button clicks and hovers', () => {
  const clickHandler = vi.fn();
  const mouseEnterHandler = vi.fn();
  const mouseLeaveHandler = vi.fn();

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

it('should work with reference prop', async () => {
  vi.useFakeTimers();

  const TestComp = () => {
    const [reference, setReference] = React.useState<HTMLElement | null>(null);
    return (
      <>
        <button ref={setReference}>trigger</button>
        <Tooltip content='some text' reference={reference} />
      </>
    );
  };
  const { getByText } = render(<TestComp />);

  const trigger = getByText('trigger');
  expect(trigger).toHaveAccessibleDescription('some text');

  const tooltip = getByText('some text');
  expect(tooltip).not.toBeVisible();

  fireEvent.mouseEnter(trigger);
  expect(tooltip).toBeVisible();

  fireEvent.mouseLeave(trigger);
  expect(tooltip).not.toBeVisible();

  fireEvent.focus(trigger);
  act(() => void vi.advanceTimersByTime(50));
  expect(tooltip).toBeVisible();

  fireEvent.blur(trigger);
  act(() => void vi.advanceTimersByTime(250));
  expect(tooltip).not.toBeVisible();

  vi.useRealTimers();
});
