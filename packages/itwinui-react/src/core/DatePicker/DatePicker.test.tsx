/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { DatePicker } from './DatePicker.js';

const selectedDaySelector = '.iui-calendar-day-selected';
const outsideDayClassName = 'iui-calendar-day-outside-month';

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

const assertMonthYear = (
  container: HTMLElement,
  expectedMonth: string,
  expectedYear: string,
) => {
  const month = container.querySelector('.iui-calendar-month') as HTMLElement;
  expect(month.textContent).toBe(expectedMonth);
  const year = container.querySelector(
    '.iui-calendar-month-year > span',
  ) as HTMLElement;
  expect(year.textContent).toBe(
    `${expectedMonth}${String.fromCharCode(160)}${expectedYear}`,
  );
};

it('should display passed date', () => {
  const { container } = render(
    <DatePicker date={new Date(2020, 0, 5)} onChange={vi.fn()} />,
  );
  assertMonthYear(container, 'January', '2020');
  const day = container.querySelector(selectedDaySelector) as HTMLElement;
  expect(day).toBeTruthy();
  expect(day.textContent).toBe('5');
  expect(document.activeElement).toEqual(document.body);
});

it('should display today', () => {
  const today = new Date();
  const { container } = render(<DatePicker onChange={vi.fn()} />);
  assertMonthYear(
    container,
    `${defaultMonths[today.getMonth()]}`,
    `${today.getFullYear()}`,
  );
  const day = container.querySelector('.iui-calendar-day-today') as HTMLElement;
  expect(day).toBeTruthy();
  expect(day.textContent).toBe(today.getDate().toString());
});

it('should apply all custom props', () => {
  const { container } = render(
    <DatePicker
      date={new Date(2020, 0, 5)}
      onChange={vi.fn()}
      monthYearProps={{ className: 'some-calendar' }}
      monthProps={{ className: 'some-month' }}
      weekDayProps={{ className: 'some-day-of-week' }}
      weekProps={{ className: 'some-week' }}
      calendarProps={{ className: 'some-listbox' }}
      dayProps={{ className: 'some-day' }}
    />,
  );
  assertMonthYear(container, 'January', '2020');
  expect(
    container.querySelector('.iui-calendar-month-year.some-calendar'),
  ).toBeTruthy();
  expect(
    container.querySelector('.iui-calendar-month.some-month'),
  ).toBeTruthy();
  expect(
    container.querySelector('.iui-calendar-weekdays.some-day-of-week'),
  ).toBeTruthy();
  expect(container.querySelector('.iui-calendar-week.some-week')).toBeTruthy();
  expect(container.querySelector('.some-listbox')).toBeTruthy();
  expect(container.querySelector('.some-day')).toBeTruthy();
});

it('should return selected date', async () => {
  const onClick = vi.fn();
  const { container, getByText } = render(
    <DatePicker date={new Date(2020, 5, 5)} onChange={onClick} />,
  );
  assertMonthYear(container, 'June', '2020');
  let selectedDay = container.querySelector(selectedDaySelector) as HTMLElement;
  expect(selectedDay.textContent).toBe('5');
  const day = getByText('15');
  await userEvent.click(day);
  expect(onClick).toHaveBeenCalledWith(new Date(2020, 5, 15));
  selectedDay = container.querySelector(selectedDaySelector) as HTMLElement;
  expect(selectedDay.textContent).toBe('15');
});

it('should navigate between months', () => {
  const date = new Date(2020, 1, 10);
  const onClick = vi.fn();
  const { container } = render(
    <DatePicker date={new Date(2020, 1, 10)} onChange={onClick} />,
  );
  assertMonthYear(container, 'February', '2020');
  const day = container.querySelector(selectedDaySelector) as HTMLElement;
  expect(day).toBeTruthy();
  expect(day.textContent).toBe(date.getDate().toString());

  const arrowImages = container.querySelectorAll(
    '.iui-calendar-month-year svg',
  ) as NodeListOf<HTMLElement>;
  expect(arrowImages.length).toBe(2);
  const arrowLeft = arrowImages[0];
  const arrowRight = arrowImages[1];

  // go back
  fireEvent.click(arrowLeft);
  date.setMonth(date.getMonth() - 1);
  assertMonthYear(container, 'January', '2020');
  // go back
  fireEvent.click(arrowLeft);
  date.setMonth(date.getMonth() - 1);
  assertMonthYear(container, 'December', '2019');
  // go forward
  fireEvent.click(arrowRight);
  date.setMonth(date.getMonth() + 1);
  assertMonthYear(container, 'January', '2020');
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
    '.iui-calendar-month-year svg',
  )[1];
  months.forEach((month) => {
    assertMonthYear(container, `${month}`, '2020');
    fireEvent.click(nextButton);
  });
});

it('should switch to other month if day selected from other month', async () => {
  const { container, getAllByText } = render(
    <DatePicker date={new Date(2020, 0, 10)} />,
  );
  assertMonthYear(container, 'January', '2020');
  let day = container.querySelector(selectedDaySelector) as HTMLElement;
  expect(day).toBeTruthy();
  expect(day.textContent).toBe('10');

  const days = getAllByText('30');
  await userEvent.click(days[0]);
  assertMonthYear(container, 'December', '2019');
  day = container.querySelector(selectedDaySelector) as HTMLElement;
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
  const onClick = vi.fn();
  const { container, getAllByText, getByRole } = render(
    <DatePicker date={new Date(2020, 1, 1)} onChange={onClick} setFocus />,
  );
  assertMonthYear(container, 'February', '2020');
  let day = container.querySelector(selectedDaySelector) as HTMLElement;
  expect(day.textContent).toBe('1');
  expect(document.activeElement).toEqual(day);

  // go left
  const calendar = getByRole('listbox') as HTMLElement;
  fireEvent.keyDown(calendar, { key: 'ArrowLeft' });
  assertMonthYear(container, 'January', '2020');
  day = getAllByText('31').find(
    (el) => !el.className.includes(outsideDayClassName),
  ) as HTMLDivElement;
  expect(day).toBeTruthy();
  expect(document.activeElement).toEqual(day);

  // go right
  fireEvent.keyDown(calendar, { key: 'ArrowRight' });
  assertMonthYear(container, 'February', '2020');
  day = container.querySelector(selectedDaySelector) as HTMLElement;
  expect(day.textContent).toBe('1');
  expect(document.activeElement).toEqual(day);

  // go up
  fireEvent.keyDown(calendar, { key: 'ArrowUp' });
  assertMonthYear(container, 'January', '2020');
  day = getAllByText('25').find(
    (el) => !el.className.includes(outsideDayClassName),
  ) as HTMLDivElement;
  expect(day).toBeTruthy();
  expect(document.activeElement).toEqual(day);

  // go down
  fireEvent.keyDown(calendar, { key: 'ArrowDown' });
  assertMonthYear(container, 'February', '2020');
  day = container.querySelector(selectedDaySelector) as HTMLElement;
  expect(day.textContent).toBe('1');
  expect(document.activeElement).toEqual(day);

  // go right and select with enter
  fireEvent.keyDown(calendar, { key: 'ArrowRight' });
  assertMonthYear(container, 'February', '2020');
  day = getAllByText('2').find(
    (el) => !el.className.includes(outsideDayClassName),
  ) as HTMLDivElement;
  expect(day).toBeTruthy();
  expect(document.activeElement).toEqual(day);
  fireEvent.keyDown(calendar, { key: 'Enter' });
  day = container.querySelector(selectedDaySelector) as HTMLElement;
  expect(day.textContent).toBe('2');
  expect(onClick).toHaveBeenCalledTimes(1);

  // go right and select with space
  fireEvent.keyDown(calendar, { key: 'ArrowRight' });
  assertMonthYear(container, 'February', '2020');
  day = getAllByText('3').find(
    (el) => !el.className.includes(outsideDayClassName),
  ) as HTMLDivElement;
  expect(day).toBeTruthy();
  expect(document.activeElement).toEqual(day);
  fireEvent.keyDown(calendar, { key: ' ' });
  day = container.querySelector(selectedDaySelector) as HTMLElement;
  expect(day.textContent).toBe('3');
  expect(onClick).toHaveBeenCalledTimes(2);
});

it('should show time selection', () => {
  const { container } = render(
    <DatePicker date={new Date(2020, 0, 10)} showTime />,
  );
  expect(container.querySelector('.iui-date-picker')).toBeTruthy();
  expect(container.querySelector('.iui-time')).toBeTruthy();
});

it('should navigate between years', () => {
  const date = new Date(2020, 1, 10);
  const onClick = vi.fn();
  const { container } = render(
    <DatePicker
      date={new Date(2020, 1, 10)}
      onChange={onClick}
      showYearSelection
    />,
  );
  assertMonthYear(container, 'February', '2020');

  const yearLeft = container.querySelector(
    'button[aria-label="Previous year"]',
  ) as HTMLButtonElement;
  expect(yearLeft).toBeTruthy();
  const yearRight = container.querySelector(
    'button[aria-label="Next year"]',
  ) as HTMLButtonElement;
  expect(yearRight).toBeTruthy();

  // go left
  fireEvent.click(yearLeft);
  date.setFullYear(date.getFullYear() - 1);
  assertMonthYear(container, 'February', '2019');
  // go left
  fireEvent.click(yearLeft);
  date.setMonth(date.getFullYear() - 1);
  assertMonthYear(container, 'February', '2018');
  // go right
  fireEvent.click(yearRight);
  date.setMonth(date.getFullYear() + 1);
  assertMonthYear(container, 'February', '2019');
});

it('should return selected date range', () => {
  const onClick = vi.fn();
  const { container, getByText } = render(
    <DatePicker
      startDate={new Date(2021, 7, 10)}
      endDate={new Date(2021, 7, 15)}
      onChange={onClick}
      enableRangeSelect
    />,
  );
  assertMonthYear(container, 'August', '2021');
  let selectedStartDay = container.querySelector(
    '.iui-calendar-day-range-start',
  ) as HTMLElement;
  let selectedRange = container.querySelectorAll('.iui-calendar-day-range');
  let selectedEndDay = container.querySelector(
    '.iui-calendar-day-range-end',
  ) as HTMLElement;
  expect(selectedStartDay.textContent).toBe('10');
  expect(selectedRange).toHaveLength(4);
  expect(selectedEndDay.textContent).toBe('15');

  const startDay = getByText('5');
  const endDay = getByText('20');
  fireEvent.click(startDay);
  expect(onClick).toHaveBeenCalledWith(
    new Date(2021, 7, 5),
    new Date(2021, 7, 15),
  );
  fireEvent.click(endDay);
  expect(onClick).toHaveBeenCalledWith(
    new Date(2021, 7, 5),
    new Date(2021, 7, 20),
  );

  selectedStartDay = container.querySelector(
    '.iui-calendar-day-range-start',
  ) as HTMLElement;
  selectedRange = container.querySelectorAll('.iui-calendar-day-range');
  selectedEndDay = container.querySelector(
    '.iui-calendar-day-range-end',
  ) as HTMLElement;
  expect(selectedStartDay.textContent).toBe('5');
  expect(selectedRange).toHaveLength(14);
  expect(selectedEndDay.textContent).toBe('20');
});

it('should update start/end date when selecting a start/end date value that is in the range', () => {
  const onClick = vi.fn();
  const { container, getByText } = render(
    <DatePicker
      startDate={new Date(2021, 7, 5)}
      endDate={new Date(2021, 7, 20)}
      onChange={onClick}
      enableRangeSelect
    />,
  );
  assertMonthYear(container, 'August', '2021');

  const startDay = getByText('10');
  fireEvent.click(startDay);
  expect(onClick).toHaveBeenCalledWith(
    new Date(2021, 7, 10),
    new Date(2021, 7, 20),
  );

  const endDay = getByText('15');
  fireEvent.click(endDay);
  expect(onClick).toHaveBeenCalledWith(
    new Date(2021, 7, 10),
    new Date(2021, 7, 15),
  );
});

it('should update startDate when selecting an endDate value that is before startDate', () => {
  const onClick = vi.fn();
  const { container, getByText } = render(
    <DatePicker
      startDate={new Date(2021, 7, 5)}
      endDate={new Date(2021, 7, 20)}
      onChange={onClick}
      enableRangeSelect
    />,
  );
  assertMonthYear(container, 'August', '2021');

  const startDay = getByText('15');
  const endDay = getByText('10');
  fireEvent.click(startDay);
  expect(onClick).toHaveBeenCalledWith(
    new Date(2021, 7, 15),
    new Date(2021, 7, 20),
  );
  fireEvent.click(endDay);
  expect(onClick).toHaveBeenCalledWith(
    new Date(2021, 7, 10),
    new Date(2021, 7, 20),
  );
});

it('should update endDate when selecting a startDate value that is after endDate', () => {
  const onClick = vi.fn();
  const { container, getByText } = render(
    <DatePicker
      startDate={new Date(2021, 7, 5)}
      endDate={new Date(2021, 7, 10)}
      onChange={onClick}
      enableRangeSelect
    />,
  );
  assertMonthYear(container, 'August', '2021');

  const startDay = getByText('15');
  fireEvent.click(startDay);
  expect(onClick).toHaveBeenCalledWith(
    new Date(2021, 7, 15),
    new Date(2021, 7, 15),
  );

  const selectedDay = container.querySelector(
    selectedDaySelector,
  ) as HTMLElement;
  const selectedStartDay = container.querySelector(
    '.iui-calendar-day-range-start',
  ) as HTMLElement;
  const selectedRange = container.querySelectorAll('.iui-calendar-day-range');
  const selectedEndDay = container.querySelector(
    '.iui-calendar-day-range-end',
  ) as HTMLElement;
  expect(selectedDay.textContent).toBe('15');
  expect(selectedStartDay).toBeNull();
  expect(selectedRange).toHaveLength(0);
  expect(selectedEndDay).toBeNull();
});

it('should prevent selecting disabled dates', async () => {
  const onClick = vi.fn();
  const { container, getByText } = render(
    <DatePicker
      date={new Date(2020, 5, 5)}
      onChange={onClick}
      showYearSelection
      isDateDisabled={(date) => {
        // disable June 12th onwards
        if (
          date.getFullYear() > 2020 ||
          (date.getFullYear() === 2020 &&
            (date.getMonth() > 5 ||
              (date.getMonth() === 5 && date.getDate() >= 12)))
        ) {
          return true;
        }
        return false;
      }}
    />,
  );

  // click 12
  const day12 = getByText('12');
  await userEvent.click(day12);
  expect(onClick).not.toHaveBeenCalled();

  // click 13
  const day13 = getByText('13');
  await userEvent.click(day13);
  expect(onClick).not.toHaveBeenCalled();

  expect(container.querySelector(selectedDaySelector)).toHaveTextContent('5');

  // navigate to 12, then press Enter
  await userEvent.keyboard('{ArrowDown}');
  expect(document.activeElement).toEqual(day12);
  expect(day12).toHaveAttribute('aria-disabled', 'true');
  await userEvent.keyboard('{Enter}');
  expect(onClick).not.toHaveBeenCalled();

  // navigate to 13, then press Enter
  await userEvent.keyboard('{ArrowRight}');
  expect(document.activeElement).toEqual(day13);
  expect(day13).toHaveAttribute('aria-disabled', 'true');
  await userEvent.keyboard('{Enter}');
  expect(onClick).not.toHaveBeenCalled();

  // next month/year button should be enabled, but should not allow to choose the day
  const nextYearButton = screen.getByLabelText('Next year');
  expect(nextYearButton).toBeEnabled();
  await userEvent.click(nextYearButton);
  assertMonthYear(container, 'June', '2021');
  await userEvent.click(getByText('22'));
  expect(onClick).not.toHaveBeenCalled();

  const nextMonthButton = screen.getByLabelText('Next month');
  expect(nextMonthButton).toBeEnabled();
  await userEvent.click(nextMonthButton);
  assertMonthYear(container, 'July', '2021');
  await userEvent.click(getByText('11'));
  expect(onClick).not.toHaveBeenCalled();

  const previousYearButton = screen.getByLabelText('Previous year');
  expect(previousYearButton).toBeEnabled();
  await userEvent.click(previousYearButton);
  assertMonthYear(container, 'July', '2020');
  await userEvent.click(getByText('10'));
  expect(onClick).not.toHaveBeenCalled();

  const previousMonthButton = screen.getByLabelText('Previous month');
  expect(previousMonthButton).toBeEnabled();
  await userEvent.click(previousMonthButton);
  assertMonthYear(container, 'June', '2020');
  await userEvent.click(getByText('24'));
  expect(onClick).not.toHaveBeenCalled();
});

it.each([true, false])('should respect `applyBackground`', (value) => {
  const { container } = render(<DatePicker applyBackground={value} />);
  if (value) {
    expect(container.querySelector('div')).toHaveClass('iui-popover-surface');
  } else {
    expect(container.querySelector('div')).not.toHaveClass(
      'iui-popover-surface',
    );
  }
});

it('should support the showDatesOutsideMonth prop', () => {
  const { container } = render(
    <DatePicker date={new Date(2020, 0, 5)} showDatesOutsideMonth={false} />,
  );
  expect(
    container.querySelector(`.${outsideDayClassName}`),
  ).toBeEmptyDOMElement();
});
