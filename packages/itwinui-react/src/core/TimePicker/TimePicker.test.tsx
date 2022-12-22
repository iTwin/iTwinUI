/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MeridiemType, TimePicker } from './TimePicker';

it('should display passed time', () => {
  const { container } = render(
    <TimePicker date={new Date(2020, 0, 5, 11, 55)} />,
  );
  expect(container.querySelector('.iui-time-picker')).toBeTruthy();
  const hour = container.querySelector(
    '.iui-time:first-child .iui-selected',
  ) as HTMLElement;
  expect(hour).toBeTruthy();
  expect(hour.textContent).toBe('11');

  const minutes = container.querySelector(
    '.iui-time:last-child .iui-selected',
  ) as HTMLElement;
  expect(minutes).toBeTruthy();
  expect(minutes.textContent).toBe('55');
});

it('should not display selected time', () => {
  const { container } = render(<TimePicker />);
  const selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime).toBeFalsy();
});

it('should return selected time (seconds)', async () => {
  const onClick = jest.fn();
  const { container, getByText } = render(
    <TimePicker
      date={new Date(2020, 5, 5, 14, 21, 33)}
      precision='seconds'
      onChange={onClick}
    />,
  );
  let selectedHours = container.querySelector(
    '.iui-time:first-child .iui-selected',
  ) as HTMLElement;
  expect(selectedHours.textContent).toBe('14');
  const newHour = getByText('17', { selector: '.iui-time:first-child li' });
  await userEvent.click(newHour);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 17, 21, 33));
  selectedHours = container.querySelector(
    '.iui-time:first-child .iui-selected',
  ) as HTMLElement;
  expect(selectedHours.textContent).toBe('17');
});

it('should return selected time (minutes)', async () => {
  const onClick = jest.fn();
  const { container, getByText } = render(
    <TimePicker
      date={new Date(2020, 5, 5, 14, 21, 33)}
      precision='minutes'
      onChange={onClick}
    />,
  );
  let selectedMinutes = container.querySelector(
    '.iui-time:last-child .iui-selected',
  ) as HTMLElement;
  expect(selectedMinutes.textContent).toBe('21');
  const newHour = getByText('43', { selector: '.iui-time:last-child li' });
  await userEvent.click(newHour);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 14, 43, 0));
  selectedMinutes = container.querySelector(
    '.iui-time:last-child .iui-selected',
  ) as HTMLElement;
  expect(selectedMinutes.textContent).toBe('43');
});

it('should return selected time (hours)', async () => {
  const onClick = jest.fn();
  const { container, getByText } = render(
    <TimePicker
      date={new Date(2020, 5, 5, 14, 21, 33)}
      precision='hours'
      onChange={onClick}
    />,
  );
  let selectedHours = container.querySelector(
    '.iui-time:first-child .iui-selected',
  ) as HTMLElement;
  expect(selectedHours.textContent).toBe('14');
  const newHour = getByText('02', { selector: '.iui-time:first-child li' });
  await userEvent.click(newHour);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 2, 0, 0));
  selectedHours = container.querySelector(
    '.iui-time:first-child .iui-selected',
  ) as HTMLElement;
  expect(selectedHours.textContent).toBe('02');
});

it('should propagate custom className and style props', () => {
  const { container } = render(
    <TimePicker
      date={new Date()}
      className='custom-class'
      style={{ color: 'hotpink', scrollBehavior: 'smooth' }}
    />,
  );

  const timePicker = container.querySelector(
    '.iui-time-picker.custom-class',
  ) as HTMLElement;
  expect(timePicker).toBeTruthy();
  expect(timePicker.style.color).toEqual('hotpink');
  expect(timePicker.style.scrollBehavior).toEqual('smooth');
});

it('should navigate with keyboard', () => {
  const onClick = jest.fn();
  const { container } = render(
    <TimePicker
      date={new Date(2020, 1, 1, 22, 11, 45)}
      onChange={onClick}
      setFocusHour
      precision='seconds'
    />,
  );
  let selectedHours = container.querySelector(
    '.iui-time:first-child .iui-selected',
  ) as HTMLElement;
  expect(selectedHours.textContent).toBe('22');
  expect(document.activeElement).toEqual(selectedHours);

  // go down
  fireEvent.keyDown(selectedHours, { key: 'ArrowDown' });
  let nextHour = selectedHours.nextElementSibling as Element;
  expect(nextHour.textContent).toBe('23');
  expect(document.activeElement).toEqual(nextHour);

  // go up
  fireEvent.keyDown(nextHour as Node, { key: 'ArrowUp' });
  expect(document.activeElement).toEqual(selectedHours);

  // go up
  fireEvent.keyDown(selectedHours, { key: 'ArrowUp' });
  nextHour = selectedHours.previousElementSibling as Element;
  expect(nextHour.textContent).toBe('21');
  expect(document.activeElement).toEqual(nextHour);

  // select
  fireEvent.keyDown(nextHour as Node, { key: 'Enter' });
  selectedHours = container.querySelector(
    '.iui-time:first-child .iui-selected',
  ) as HTMLElement;
  expect(selectedHours.textContent).toBe('21');
  expect(document.activeElement).toEqual(selectedHours);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 1, 1, 21, 11, 45));

  // go to minutes
  let selectedMinutes = container.querySelector(
    '.iui-time:nth-child(2) .iui-selected',
  ) as HTMLElement;
  selectedMinutes.focus();
  expect(selectedMinutes.textContent).toBe('11');
  expect(document.activeElement).toEqual(selectedMinutes);

  // go up
  fireEvent.keyDown(selectedMinutes, { key: 'ArrowUp' });
  let nextMinute = selectedMinutes.previousElementSibling as Element;
  expect(nextMinute.textContent).toBe('10');
  expect(document.activeElement).toEqual(nextMinute);

  // go up
  fireEvent.keyDown(nextMinute, { key: 'ArrowUp' });
  nextMinute = nextMinute.previousElementSibling as Element;
  expect(nextMinute.textContent).toBe('09');
  expect(document.activeElement).toEqual(nextMinute);

  // go down
  fireEvent.keyDown(nextMinute, { key: 'ArrowDown' });
  nextMinute = nextMinute.nextElementSibling as Element;
  expect(nextMinute.textContent).toBe('10');
  expect(document.activeElement).toEqual(nextMinute);

  // select
  fireEvent.keyDown(nextMinute, { key: ' ' });
  selectedMinutes = container.querySelector(
    '.iui-time:nth-child(2) .iui-selected',
  ) as HTMLElement;
  expect(selectedMinutes.textContent).toBe('10');
  expect(document.activeElement).toEqual(selectedMinutes);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 1, 1, 21, 10, 45));

  // go to seconds
  let selectedSeconds = container.querySelector(
    '.iui-time:last-child .iui-selected',
  ) as HTMLElement;
  selectedSeconds.focus();
  expect(selectedSeconds.textContent).toBe('45');
  expect(document.activeElement).toEqual(selectedSeconds);

  // go down
  fireEvent.keyDown(selectedSeconds, { key: 'ArrowDown' });
  const nextSecond = selectedSeconds.nextElementSibling as Element;
  expect(nextSecond.textContent).toBe('46');
  expect(document.activeElement).toEqual(nextSecond);

  // select
  fireEvent.keyDown(nextSecond, { key: ' ' });
  selectedSeconds = container.querySelector(
    '.iui-time:last-child .iui-selected',
  ) as HTMLElement;
  expect(selectedSeconds.textContent).toBe('46');
  expect(document.activeElement).toEqual(selectedSeconds);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 1, 1, 21, 10, 46));
});

it('should navigate with keyboard (12 hours)', () => {
  const onClick = jest.fn();
  const { container } = render(
    <TimePicker
      date={new Date(2020, 1, 1, 23, 22)}
      onChange={onClick}
      setFocusHour
      use12Hours
    />,
  );
  let selectedHours = container.querySelector(
    '.iui-time:first-child .iui-selected',
  ) as HTMLElement;
  expect(selectedHours.textContent).toBe('11');
  expect(document.activeElement).toEqual(selectedHours);

  // go down (already bottom, no move)
  fireEvent.keyDown(selectedHours, { key: 'ArrowDown' });
  let nextHour = selectedHours.nextElementSibling as Element;
  expect(nextHour).toBeFalsy();
  expect(document.activeElement).toEqual(selectedHours);

  // go up
  fireEvent.keyDown(selectedHours as Node, { key: 'ArrowUp' });
  nextHour = selectedHours.previousElementSibling as Element;
  expect(nextHour.textContent).toBe('10');
  expect(document.activeElement).toEqual(nextHour);

  // go up
  fireEvent.keyDown(nextHour, { key: 'ArrowUp' });
  nextHour = nextHour.previousElementSibling as Element;
  expect(nextHour.textContent).toBe('09');
  expect(document.activeElement).toEqual(nextHour);

  // select
  fireEvent.keyDown(nextHour as Node, { key: 'Enter' });
  selectedHours = container.querySelector(
    '.iui-time:first-child .iui-selected',
  ) as HTMLElement;
  expect(selectedHours.textContent).toBe('09');
  expect(document.activeElement).toEqual(selectedHours);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 1, 1, 21, 22));

  // go to minutes
  let selectedMinutes = container.querySelector(
    '.iui-time:nth-child(2) .iui-selected',
  ) as HTMLElement;
  selectedMinutes.focus();
  expect(selectedMinutes.textContent).toBe('22');
  expect(document.activeElement).toEqual(selectedMinutes);

  // go up
  fireEvent.keyDown(selectedMinutes, { key: 'ArrowUp' });
  const nextMinute = selectedMinutes.previousElementSibling as Element;
  expect(nextMinute.textContent).toBe('21');
  expect(document.activeElement).toEqual(nextMinute);

  // select
  fireEvent.keyDown(nextMinute, { key: ' ' });
  selectedMinutes = container.querySelector(
    '.iui-time:nth-child(2) .iui-selected',
  ) as HTMLElement;
  expect(selectedMinutes.textContent).toBe('21');
  expect(document.activeElement).toEqual(selectedMinutes);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 1, 1, 21, 21));

  // go to meridiem
  let selectedMeridiem = container.querySelector(
    '.iui-period .iui-selected',
  ) as HTMLElement;
  selectedMeridiem.focus();
  expect(selectedMeridiem.textContent).toBe('PM');
  expect(document.activeElement).toEqual(selectedMeridiem);

  // go up
  fireEvent.keyDown(selectedMeridiem, { key: 'ArrowUp' });
  let nextMeridiem = selectedMeridiem.previousElementSibling as Element;
  expect(nextMeridiem.textContent).toBe('AM');
  expect(document.activeElement).toEqual(nextMeridiem);

  // go up (already top, no move)
  fireEvent.keyDown(nextMeridiem, { key: 'ArrowUp' });
  expect(nextMeridiem.previousElementSibling).toBeFalsy();
  expect(document.activeElement).toEqual(nextMeridiem);

  // select
  fireEvent.keyDown(nextMeridiem, { key: 'Spacebar' });
  selectedMeridiem = container.querySelector(
    '.iui-period .iui-selected',
  ) as HTMLElement;
  expect(selectedMeridiem.textContent).toBe('AM');
  expect(document.activeElement).toEqual(selectedMeridiem);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 1, 1, 9, 21));

  // go down
  fireEvent.keyDown(selectedMeridiem, { key: 'ArrowDown' });
  nextMeridiem = selectedMeridiem.nextElementSibling as Element;
  expect(nextMeridiem.textContent).toBe('PM');
  expect(document.activeElement).toEqual(nextMeridiem);

  // select
  fireEvent.keyDown(nextMeridiem, { key: 'Spacebar' });
  selectedMeridiem = container.querySelector(
    '.iui-period .iui-selected',
  ) as HTMLElement;
  expect(selectedMeridiem.textContent).toBe('PM');
  expect(document.activeElement).toEqual(selectedMeridiem);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 1, 1, 21, 21));
});

it('should show 12 hours', async () => {
  const onClick = jest.fn();
  const { container, getByText } = render(
    <TimePicker
      date={new Date(2020, 5, 5, 14, 21, 33)}
      precision='seconds'
      onChange={onClick}
      use12Hours
    />,
  );
  expect(container.querySelectorAll('.iui-time').length).toBe(3);
  expect(container.querySelector('.iui-period')).toBeTruthy();
  expect(container.querySelectorAll('.iui-time:first-child li').length).toBe(
    12,
  );
  expect(container.querySelectorAll('.iui-time:nth-child(2) li').length).toBe(
    60,
  );
  expect(container.querySelectorAll('.iui-time:nth-child(3) li').length).toBe(
    60,
  );
  // select different meridiem
  let selectedMeridiem = container.querySelector(
    '.iui-period .iui-selected',
  ) as HTMLElement;
  expect(selectedMeridiem.textContent).toBe('PM');
  selectedMeridiem = getByText('AM');
  await userEvent.click(selectedMeridiem);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 2, 21, 33));
  // select new seconds
  let selectedSeconds = container.querySelector(
    '.iui-time:nth-child(3) .iui-selected',
  ) as HTMLElement;
  expect(selectedSeconds.textContent).toBe('33');
  selectedSeconds = getByText('11', { selector: '.iui-time:nth-child(3) li' });
  await userEvent.click(selectedSeconds);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 2, 21, 11));
  // select new minutes
  let selectedMinutes = container.querySelector(
    '.iui-time:nth-child(2) .iui-selected',
  ) as HTMLElement;
  expect(selectedMinutes.textContent).toBe('21');
  selectedMinutes = getByText('02', { selector: '.iui-time:nth-child(2) li' });
  await userEvent.click(selectedMinutes);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 2, 2, 11));
  // select new hours
  let selectedHour = container.querySelector(
    '.iui-time:first-child .iui-selected',
  ) as HTMLElement;
  expect(selectedHour.textContent).toBe('02');
  selectedHour = getByText('12', { selector: '.iui-time:first-child li' });
  await userEvent.click(selectedHour);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 0, 2, 11));
  // select different meridiem
  selectedMeridiem = container.querySelector(
    '.iui-period .iui-selected',
  ) as HTMLElement;
  expect(selectedMeridiem.textContent).toBe('AM');
  selectedMeridiem = getByText('PM');
  await userEvent.click(selectedMeridiem);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 12, 2, 11));
});

it('should show values with applied steps', async () => {
  const onClick = jest.fn();
  const { container, getByText } = render(
    <TimePicker
      date={new Date(2020, 5, 5, 9, 10, 40)}
      precision='seconds'
      onChange={onClick}
      hourStep={3}
      minuteStep={10}
      secondStep={20}
    />,
  );
  expect(container.querySelectorAll('.iui-time:first-child li').length).toBe(8);
  expect(container.querySelectorAll('.iui-time:nth-child(2) li').length).toBe(
    6,
  );
  expect(container.querySelectorAll('.iui-time:nth-child(3) li').length).toBe(
    3,
  );
  // select new hour
  let selectedHour = container.querySelector(
    '.iui-time:first-child .iui-selected',
  ) as HTMLElement;
  expect(selectedHour.textContent).toBe('09');
  selectedHour = getByText('18', { selector: '.iui-time:first-child li' });
  await userEvent.click(selectedHour);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 18, 10, 40));
  // select new seconds
  let selectedSeconds = container.querySelector(
    '.iui-time:nth-child(3) .iui-selected',
  ) as HTMLElement;
  expect(selectedSeconds.textContent).toBe('40');
  selectedSeconds = getByText('20', { selector: '.iui-time:nth-child(3) li' });
  await userEvent.click(selectedSeconds);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 18, 10, 20));
  // select new minutes
  let selectedMinutes = container.querySelector(
    '.iui-time:nth-child(2) .iui-selected',
  ) as HTMLElement;
  expect(selectedMinutes.textContent).toBe('10');
  selectedMinutes = getByText('30', { selector: '.iui-time:nth-child(2) li' });
  await userEvent.click(selectedMinutes);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 18, 30, 20));
});

it('should show values using custom renderers', () => {
  const { getByText } = render(
    <TimePicker
      date={new Date(2020, 5, 5, 9, 10, 40)}
      precision='seconds'
      use12Hours
      hourRenderer={(date: Date) => <>{`0${date.getHours()}`.slice(-2)}</>}
      minuteRenderer={(date: Date) => <>{`${date.getMinutes()}mins`}</>}
      secondRenderer={(date: Date) => <>{`${date.getSeconds()}secs`}</>}
      meridiemRenderer={(meridiem: MeridiemType) => (
        <>{meridiem === 'AM' ? 'Before' : 'After'}</>
      )}
    />,
  );
  expect(
    getByText('01', { selector: '.iui-time:first-child li' }),
  ).toBeTruthy();
  expect(
    getByText('35mins', { selector: '.iui-time:nth-child(2) li' }),
  ).toBeTruthy();
  expect(
    getByText('20secs', { selector: '.iui-time:nth-child(3) li' }),
  ).toBeTruthy();
  expect(getByText('Before', { selector: '.iui-period li' })).toBeTruthy();
  expect(getByText('After', { selector: '.iui-period li' })).toBeTruthy();
});

it('should display passed time in combined renderer', () => {
  const { container } = render(
    <TimePicker date={new Date(2020, 0, 5, 11, 55)} useCombinedRenderer />,
  );
  expect(container.querySelector('.iui-time-picker')).toBeTruthy();
  const selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime).toBeTruthy();
  expect(selectedTime.textContent).toBe('11:55');
});

it('should return selected time in combined renderer (seconds)', async () => {
  const onClick = jest.fn();
  const { container, getByText } = render(
    <TimePicker
      date={new Date(2020, 5, 5, 14, 21, 33)}
      useCombinedRenderer
      precision='seconds'
      onChange={onClick}
    />,
  );
  let selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime.textContent).toBe('14:21:33');
  const newTime = getByText('22:09:22', {
    selector: '.iui-time li',
  });
  await userEvent.click(newTime);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 22, 9, 22));
  selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime.textContent).toBe('22:09:22');
}, 100000);

it('should return selected time in combined renderer (minutes)', async () => {
  const onClick = jest.fn();
  const { container, getByText } = render(
    <TimePicker
      date={new Date(2020, 5, 5, 14, 21, 33)}
      useCombinedRenderer
      onChange={onClick}
    />,
  );
  let selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime.textContent).toBe('14:21');
  const newTime = getByText('10:45', {
    selector: '.iui-time li',
  });
  await userEvent.click(newTime);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 10, 45, 0));
  selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime.textContent).toBe('10:45');
});

it('should return selected time in combined renderer (hours)', async () => {
  const onClick = jest.fn();
  const { container, getByText } = render(
    <TimePicker
      date={new Date(2020, 5, 5, 14, 21, 33)}
      useCombinedRenderer
      precision='hours'
      onChange={onClick}
    />,
  );
  let selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime.textContent).toBe('14');
  const newTime = getByText('02', {
    selector: '.iui-time li',
  });
  await userEvent.click(newTime);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 2, 0, 0));
  selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime.textContent).toBe('02');
});

it('should navigate with keyboard in combined renderer', () => {
  const onClick = jest.fn();
  const { container } = render(
    <TimePicker
      date={new Date(2020, 1, 1, 22, 11, 45)}
      onChange={onClick}
      setFocusHour
      useCombinedRenderer
      precision='seconds'
    />,
  );
  let selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime.textContent).toBe('22:11:45');
  expect(document.activeElement).toEqual(selectedTime);

  // go down
  fireEvent.keyDown(selectedTime, { key: 'ArrowDown' });
  let nextTime = selectedTime.nextElementSibling as Element;
  expect(nextTime.textContent).toBe('22:11:46');
  expect(document.activeElement).toEqual(nextTime);

  // go up
  fireEvent.keyDown(nextTime as Node, { key: 'ArrowUp' });
  expect(document.activeElement).toEqual(selectedTime);

  // go up
  fireEvent.keyDown(selectedTime, { key: 'ArrowUp' });
  nextTime = selectedTime.previousElementSibling as Element;
  expect(nextTime.textContent).toBe('22:11:44');
  expect(document.activeElement).toEqual(nextTime);

  // select
  fireEvent.keyDown(nextTime as Node, { key: 'Enter' });
  selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime.textContent).toBe('22:11:44');
  expect(document.activeElement).toEqual(selectedTime);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 1, 1, 22, 11, 44));
});

it('should navigate with keyboard in combined renderer (12 hours)', () => {
  const onClick = jest.fn();
  const { container } = render(
    <TimePicker
      date={new Date(2020, 1, 1, 22, 11, 45)}
      onChange={onClick}
      setFocusHour
      useCombinedRenderer
      precision='seconds'
      use12Hours
    />,
  );
  let selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime.textContent).toBe('10:11:45');
  expect(document.activeElement).toEqual(selectedTime);

  // go down
  fireEvent.keyDown(selectedTime, { key: 'ArrowDown' });
  let nextTime = selectedTime.nextElementSibling as Element;
  expect(nextTime.textContent).toBe('10:11:46');
  expect(document.activeElement).toEqual(nextTime);

  // go up
  fireEvent.keyDown(nextTime as Node, { key: 'ArrowUp' });
  expect(document.activeElement).toEqual(selectedTime);

  // go up
  fireEvent.keyDown(selectedTime, { key: 'ArrowUp' });
  nextTime = selectedTime.previousElementSibling as Element;
  expect(nextTime.textContent).toBe('10:11:44');
  expect(document.activeElement).toEqual(nextTime);

  // select
  fireEvent.keyDown(nextTime as Node, { key: 'Enter' });
  selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime.textContent).toBe('10:11:44');
  expect(document.activeElement).toEqual(selectedTime);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 1, 1, 22, 11, 44));

  // go to meridiem
  let selectedMeridiem = container.querySelector(
    '.iui-period .iui-selected',
  ) as HTMLElement;
  selectedMeridiem.focus();
  expect(selectedMeridiem.textContent).toBe('PM');
  expect(document.activeElement).toEqual(selectedMeridiem);

  // go up
  fireEvent.keyDown(selectedMeridiem, { key: 'ArrowUp' });
  const meridiemAM = selectedMeridiem.previousElementSibling as Element;
  expect(meridiemAM.textContent).toBe('AM');
  expect(document.activeElement).toEqual(meridiemAM);

  // select
  fireEvent.keyDown(meridiemAM, { key: ' ' });
  selectedMeridiem = container.querySelector(
    '.iui-period .iui-selected',
  ) as HTMLElement;
  expect(meridiemAM.textContent).toBe('AM');
  expect(document.activeElement).toEqual(meridiemAM);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 1, 1, 10, 11, 44));
});

it('should show 24 hours in combined renderer (seconds)', async () => {
  const onClick = jest.fn();
  const { container, getByText } = render(
    <TimePicker
      date={new Date(2020, 5, 5, 14, 21, 33)}
      useCombinedRenderer
      precision='seconds'
      onChange={onClick}
    />,
  );
  expect(container.querySelectorAll('.iui-time').length).toBe(1);
  expect(container.querySelector('.iui-period')).toBeFalsy();
  expect(container.querySelectorAll('.iui-time li').length).toBe(24 * 60 * 60);
  // select new time
  let selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime.textContent).toBe('14:21:33');
  selectedTime = getByText('11:45:52');
  await userEvent.click(selectedTime);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 11, 45, 52));
}, 100000);

it('should show 24 hours in combined renderer (minutes)', async () => {
  const onClick = jest.fn();
  const { container, getByText } = render(
    <TimePicker
      date={new Date(2020, 5, 5, 14, 21, 33)}
      useCombinedRenderer
      onChange={onClick}
    />,
  );
  expect(container.querySelectorAll('.iui-time').length).toBe(1);
  expect(container.querySelector('.iui-period')).toBeFalsy();
  expect(container.querySelectorAll('.iui-time li').length).toBe(24 * 60);
  // select new time
  let selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime.textContent).toBe('14:21');
  selectedTime = getByText('05:09');
  await userEvent.click(selectedTime);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 5, 9, 0));
});

it('should show 24 hours in combined renderer (hours)', async () => {
  const onClick = jest.fn();
  const { container, getByText } = render(
    <TimePicker
      date={new Date(2020, 5, 5, 14, 21, 33)}
      useCombinedRenderer
      precision='hours'
      onChange={onClick}
    />,
  );
  expect(container.querySelectorAll('.iui-time').length).toBe(1);
  expect(container.querySelector('.iui-period')).toBeFalsy();
  expect(container.querySelectorAll('.iui-time li').length).toBe(24);
  // select new time
  let selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime.textContent).toBe('14');
  selectedTime = getByText('19');
  await userEvent.click(selectedTime);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 19, 0, 0));
});

it('should show 12 hours in combined renderer (seconds)', async () => {
  const onClick = jest.fn();
  const { container, getByText } = render(
    <TimePicker
      date={new Date(2020, 5, 5, 14, 21, 33)}
      useCombinedRenderer
      precision='seconds'
      onChange={onClick}
      use12Hours
    />,
  );
  expect(container.querySelectorAll('.iui-time').length).toBe(1);
  expect(container.querySelectorAll('.iui-period').length).toBe(1);
  expect(container.querySelectorAll('.iui-time li').length).toBe(12 * 60 * 60);
  expect(container.querySelectorAll('.iui-period li').length).toBe(2);
  // select different meridiem
  let selectedMeridiem = container.querySelector(
    '.iui-period .iui-selected',
  ) as HTMLElement;
  expect(selectedMeridiem.textContent).toBe('PM');
  selectedMeridiem = getByText('AM');
  await userEvent.click(selectedMeridiem);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 2, 21, 33));
  // select new time
  let selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime.textContent).toBe('02:21:33');
  selectedTime = getByText('09:30:07');
  await userEvent.click(selectedTime);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 9, 30, 7));
  // select different meridiem
  selectedMeridiem = container.querySelector(
    '.iui-period .iui-selected',
  ) as HTMLElement;
  expect(selectedMeridiem.textContent).toBe('AM');
  selectedMeridiem = getByText('PM');
  await userEvent.click(selectedMeridiem);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 21, 30, 7));
}, 100000);

it('should show 12 hours in combined renderer (minutes)', async () => {
  const onClick = jest.fn();
  const { container, getByText } = render(
    <TimePicker
      date={new Date(2020, 5, 5, 14, 21, 33)}
      useCombinedRenderer
      onChange={onClick}
      use12Hours
    />,
  );
  expect(container.querySelectorAll('.iui-time').length).toBe(1);
  expect(container.querySelectorAll('.iui-period').length).toBe(1);
  expect(container.querySelectorAll('.iui-time li').length).toBe(12 * 60);
  expect(container.querySelectorAll('.iui-period li').length).toBe(2);
  // select different meridiem
  let selectedMeridiem = container.querySelector(
    '.iui-period .iui-selected',
  ) as HTMLElement;
  expect(selectedMeridiem.textContent).toBe('PM');
  selectedMeridiem = getByText('AM');
  await userEvent.click(selectedMeridiem);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 2, 21, 0));
  // select new time
  let selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime.textContent).toBe('02:21');
  selectedTime = getByText('12:17');
  await userEvent.click(selectedTime);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 0, 17, 0));
  // select different meridiem
  selectedMeridiem = container.querySelector(
    '.iui-period .iui-selected',
  ) as HTMLElement;
  expect(selectedMeridiem.textContent).toBe('AM');
  selectedMeridiem = getByText('PM');
  await userEvent.click(selectedMeridiem);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 12, 17, 0));
});

it('should show 12 hours in combined renderer (hours)', async () => {
  const onClick = jest.fn();
  const { container, getByText } = render(
    <TimePicker
      date={new Date(2020, 5, 5, 14, 21, 33)}
      useCombinedRenderer
      precision='hours'
      onChange={onClick}
      use12Hours
    />,
  );
  expect(container.querySelectorAll('.iui-time').length).toBe(1);
  expect(container.querySelectorAll('.iui-period').length).toBe(1);
  expect(container.querySelectorAll('.iui-time li').length).toBe(12);
  expect(container.querySelectorAll('.iui-period li').length).toBe(2);
  // select different meridiem
  let selectedMeridiem = container.querySelector(
    '.iui-period .iui-selected',
  ) as HTMLElement;
  expect(selectedMeridiem.textContent).toBe('PM');
  selectedMeridiem = getByText('AM');
  await userEvent.click(selectedMeridiem);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 2, 0, 0));
  // select new time
  let selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime.textContent).toBe('02');
  selectedTime = getByText('04');
  await userEvent.click(selectedTime);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 4, 0, 0));
  // select different meridiem
  selectedMeridiem = container.querySelector(
    '.iui-period .iui-selected',
  ) as HTMLElement;
  expect(selectedMeridiem.textContent).toBe('AM');
  selectedMeridiem = getByText('PM');
  await userEvent.click(selectedMeridiem);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 16, 0, 0));
});

it('should show values with applied steps in combined renderer', async () => {
  const onClick = jest.fn();
  const { container, getByText } = render(
    <TimePicker
      date={new Date(2020, 5, 5, 9, 10, 40)}
      useCombinedRenderer
      precision='seconds'
      onChange={onClick}
      hourStep={3}
      minuteStep={10}
      secondStep={20}
    />,
  );
  expect(container.querySelectorAll('.iui-time li').length).toBe(
    (24 / 3) * (60 / 10) * (60 / 20),
  );
  // select new time
  let selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime.textContent).toBe('09:10:40');
  selectedTime = getByText('12:50:20', { selector: '.iui-time li' });
  await userEvent.click(selectedTime);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 12, 50, 20));
  // select new time
  selectedTime = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(selectedTime.textContent).toBe('12:50:20');
  selectedTime = getByText('03:40:00', { selector: '.iui-time li' });
  await userEvent.click(selectedTime);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 3, 40, 0));
  // times should not exist
  expect(
    screen.queryByText('03:40:10', { selector: '.iui-time li' }),
  ).toBeNull();
  expect(
    screen.queryByText('03:15:00', { selector: '.iui-time li' }),
  ).toBeNull();
  expect(
    screen.queryByText('11:40:00', { selector: '.iui-time li' }),
  ).toBeNull();
});

it('should show values using custom combined renderer', () => {
  const { getByText } = render(
    <TimePicker
      date={new Date(2020, 5, 5, 9, 10, 40)}
      precision='seconds'
      useCombinedRenderer
      combinedRenderer={(date: Date) => (
        <>{`${date.getHours()}h ${date.getMinutes()}m ${date.getSeconds()}s`}</>
      )}
    />,
  );
  expect(getByText('9h 10m 40s', { selector: '.iui-time li' })).toBeTruthy();
});
