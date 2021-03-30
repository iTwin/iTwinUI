/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { DatePicker } from './DatePicker';

const defaultMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

it('should display passed date', () => {
  const { container, getByText } = render(
    <DatePicker date={new Date(2020, 0, 5)} onChange={jest.fn()} />,
  );
  getByText('January 2020');
  const day = container.querySelector(
    '.iui-date-picker-calendar-week-selector.iui-selected',
  ) as HTMLElement;
  expect(day).toBeTruthy();
  expect(day.textContent).toBe('5');
  expect(document.activeElement).toEqual(document.body);
});

it('should display today', () => {
  const today = new Date();
  const { container, getByText } = render(<DatePicker onChange={jest.fn()} />);
  getByText(`${defaultMonths[today.getMonth()]} ${today.getFullYear()}`);
  const day = container.querySelector(
    '.iui-date-picker-calendar-week-selector.iui-today',
  ) as HTMLElement;
  expect(day).toBeTruthy();
  expect(day.textContent).toBe(today.getDate().toString());
});

it('should return selected date', () => {
  const onClick = jest.fn();
  const { container, getByText } = render(
    <DatePicker date={new Date(2020, 5, 5)} onChange={onClick} />,
  );
  getByText('June 2020');
  let selectedDay = container.querySelector(
    '.iui-date-picker-calendar-week-selector.iui-selected',
  ) as HTMLElement;
  expect(selectedDay.textContent).toBe('5');
  const day = getByText('15');
  day.click();
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 15));
  selectedDay = container.querySelector(
    '.iui-date-picker-calendar-week-selector.iui-selected',
  ) as HTMLElement;
  expect(selectedDay.textContent).toBe('15');
});

it('should navigate between months', () => {
  const date = new Date(2020, 1, 10);
  const onClick = jest.fn();
  const { container, getByText } = render(
    <DatePicker date={new Date(2020, 1, 10)} onChange={onClick} />,
  );
  getByText('February 2020');
  const day = container.querySelector(
    '.iui-date-picker-calendar-week-selector.iui-selected',
  ) as HTMLElement;
  expect(day).toBeTruthy();
  expect(day.textContent).toBe(date.getDate().toString());

  const arrowImages = container.querySelectorAll(
    '.iui-date-picker-calendar-header-content svg',
  ) as NodeListOf<HTMLElement>;
  expect(arrowImages.length).toBe(2);
  const arrowLeft = arrowImages[0];
  const arrowRight = arrowImages[1];

  // go back
  fireEvent.click(arrowLeft);
  date.setMonth(date.getMonth() - 1);
  getByText('January 2020');
  // go back
  fireEvent.click(arrowLeft);
  date.setMonth(date.getMonth() - 1);
  getByText('December 2019');
  // go forward
  fireEvent.click(arrowRight);
  date.setMonth(date.getMonth() + 1);
  getByText('January 2020');
});

it('should show localized string', () => {
  const months = [
    'January-custom',
    'February-custom',
    'March-custom',
    'April-custom',
    'May-custom',
    'June-custom',
    'July-custom',
    'August-custom',
    'September-custom',
    'October-custom',
    'November-custom',
    'December-custom',
  ];
  const shortDays = [
    'Su-custom',
    'Mo-custom',
    'Tu-custom',
    'We-custom',
    'Th-custom',
    'Fr-custom',
    'Sa-custom',
  ];
  const days = [
    'Sunday-custom',
    'Monday-custom',
    'Tuesday-custom',
    'Wednesday-custom',
    'Thursday-custom',
    'Friday-custom',
    'Saturday-custom',
  ];
  const { getByText, container } = render(
    <DatePicker
      date={new Date(2020, 0, 10)}
      localizedNames={{ months, shortDays, days }}
    />,
  );
  shortDays.forEach((day, ind) => {
    const displayedDay = getByText(day);
    expect(displayedDay.title).toBe(days[ind]);
  });
  const nextButton = container.querySelectorAll(
    '.iui-date-picker-calendar-header-content svg',
  )[1];
  months.forEach((month) => {
    getByText(`${month} 2020`);
    fireEvent.click(nextButton);
  });
});

it('should switch to other month if day selected from other month', () => {
  const { container, getByText, getAllByText } = render(
    <DatePicker date={new Date(2020, 0, 10)} />,
  );
  getByText('January 2020');
  let day = container.querySelector(
    '.iui-date-picker-calendar-week-selector.iui-selected',
  ) as HTMLElement;
  expect(day).toBeTruthy();
  expect(day.textContent).toBe('10');

  const days = getAllByText('30');
  days[0].click();
  getByText('December 2019');
  day = container.querySelector(
    '.iui-date-picker-calendar-week-selector.iui-selected',
  ) as HTMLElement;
  expect(day).toBeTruthy();
  expect(day.textContent).toBe('30');
});

it('should apply custom class and style', () => {
  const { container } = render(
    <DatePicker
      date={new Date(2020, 0, 10)}
      className='my-class'
      style={{ width: 300 }}
    />,
  );
  const picker = container.querySelector(
    '.iui-date-picker.my-class',
  ) as HTMLElement;
  expect(picker).toBeTruthy();
  picker.style.width = '300px';
});

it('should navigate with keyboard', () => {
  const onClick = jest.fn();
  const { container, getByText, getAllByText } = render(
    <DatePicker date={new Date(2020, 1, 1)} onChange={onClick} setFocus />,
  );
  getByText('February 2020');
  let day = container.querySelector(
    '.iui-date-picker-calendar-week-selector.iui-selected',
  ) as HTMLElement;
  expect(day.textContent).toBe('1');
  expect(document.activeElement).toEqual(day);

  // go left
  const calendar = container.querySelector(
    '.iui-date-picker-calendar-month',
  ) as HTMLElement;
  fireEvent.keyDown(calendar, { key: 'ArrowLeft' });
  getByText('January 2020');
  day = getAllByText('31').find(
    (el) => !el.className.includes('iui-outside-month'),
  ) as HTMLDivElement;
  expect(day).toBeTruthy();
  expect(document.activeElement).toEqual(day);

  // go right
  fireEvent.keyDown(calendar, { key: 'ArrowRight' });
  getByText('February 2020');
  day = container.querySelector(
    '.iui-date-picker-calendar-week-selector.iui-selected',
  ) as HTMLElement;
  expect(day.textContent).toBe('1');
  expect(document.activeElement).toEqual(day);

  // go up
  fireEvent.keyDown(calendar, { key: 'ArrowUp' });
  getByText('January 2020');
  day = getAllByText('25').find(
    (el) => !el.className.includes('iui-outside-month'),
  ) as HTMLDivElement;
  expect(day).toBeTruthy();
  expect(document.activeElement).toEqual(day);

  // go down
  fireEvent.keyDown(calendar, { key: 'ArrowDown' });
  getByText('February 2020');
  day = container.querySelector(
    '.iui-date-picker-calendar-week-selector.iui-selected',
  ) as HTMLElement;
  expect(day.textContent).toBe('1');
  expect(document.activeElement).toEqual(day);

  // go right and select with enter
  fireEvent.keyDown(calendar, { key: 'ArrowRight' });
  getByText('February 2020');
  day = getAllByText('2').find(
    (el) => !el.className.includes('iui-outside-month'),
  ) as HTMLDivElement;
  expect(day).toBeTruthy();
  expect(document.activeElement).toEqual(day);
  fireEvent.keyDown(calendar, { key: 'Enter' });
  day = container.querySelector(
    '.iui-date-picker-calendar-week-selector.iui-selected',
  ) as HTMLElement;
  expect(day.textContent).toBe('2');
  expect(onClick).toHaveBeenCalledTimes(1);

  // go right and select with space
  fireEvent.keyDown(calendar, { key: 'ArrowRight' });
  getByText('February 2020');
  day = getAllByText('3').find(
    (el) => !el.className.includes('iui-outside-month'),
  ) as HTMLDivElement;
  expect(day).toBeTruthy();
  expect(document.activeElement).toEqual(day);
  fireEvent.keyDown(calendar, { key: ' ' });
  day = container.querySelector(
    '.iui-date-picker-calendar-week-selector.iui-selected',
  ) as HTMLElement;
  expect(day.textContent).toBe('3');
  expect(onClick).toHaveBeenCalledTimes(2);
});
