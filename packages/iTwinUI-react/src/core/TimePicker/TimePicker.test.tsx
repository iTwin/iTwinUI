/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from '@testing-library/react';
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
  const time = container.querySelector(
    '.iui-time .iui-selected',
  ) as HTMLElement;
  expect(time).toBeFalsy();
});

it('should return selected time', () => {
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
  newHour.click();
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 17, 21, 33));
  selectedHours = container.querySelector(
    '.iui-time:first-child .iui-selected',
  ) as HTMLElement;
  expect(selectedHours.textContent).toBe('17');
});

it('should return selected time (minutes)', () => {
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
  newHour.click();
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 14, 43, 0));
  selectedMinutes = container.querySelector(
    '.iui-time:last-child .iui-selected',
  ) as HTMLElement;
  expect(selectedMinutes.textContent).toBe('43');
});

it('should return selected time (hours)', () => {
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
  newHour.click();
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

it('should show 12 hours', () => {
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
  selectedMeridiem.click();
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 2, 21, 33));
  // select new seconds
  let selectedSeconds = container.querySelector(
    '.iui-time:nth-child(3) .iui-selected',
  ) as HTMLElement;
  expect(selectedSeconds.textContent).toBe('33');
  selectedSeconds = getByText('11', { selector: '.iui-time:nth-child(3) li' });
  selectedSeconds.click();
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 2, 21, 11));
  // select new minutes
  let selectedMinutes = container.querySelector(
    '.iui-time:nth-child(2) .iui-selected',
  ) as HTMLElement;
  expect(selectedMinutes.textContent).toBe('21');
  selectedMinutes = getByText('02', { selector: '.iui-time:nth-child(2) li' });
  selectedMinutes.click();
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 2, 2, 11));
  // select new hours
  let selectedHour = container.querySelector(
    '.iui-time:first-child .iui-selected',
  ) as HTMLElement;
  expect(selectedHour.textContent).toBe('02');
  selectedHour = getByText('12', { selector: '.iui-time:first-child li' });
  selectedHour.click();
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 0, 2, 11));
  // select different meridiem
  selectedMeridiem = container.querySelector(
    '.iui-period .iui-selected',
  ) as HTMLElement;
  expect(selectedMeridiem.textContent).toBe('AM');
  selectedMeridiem = getByText('PM');
  selectedMeridiem.click();
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 12, 2, 11));
});

it('should show values with applied steps', () => {
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
  selectedHour.click();
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 18, 10, 40));
  // select new seconds
  let selectedSeconds = container.querySelector(
    '.iui-time:nth-child(3) .iui-selected',
  ) as HTMLElement;
  expect(selectedSeconds.textContent).toBe('40');
  selectedSeconds = getByText('20', { selector: '.iui-time:nth-child(3) li' });
  selectedSeconds.click();
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 5, 18, 10, 20));
  // select new minutes
  let selectedMinutes = container.querySelector(
    '.iui-time:nth-child(2) .iui-selected',
  ) as HTMLElement;
  expect(selectedMinutes.textContent).toBe('10');
  selectedMinutes = getByText('30', { selector: '.iui-time:nth-child(2) li' });
  selectedMinutes.click();
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
