/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import {
  useTheme,
  SvgChevronLeft,
  SvgChevronRight,
  SvgChevronLeftDouble,
  SvgChevronRightDouble,
} from '../utils';
import '@itwin/itwinui-css/css/date-picker.css';
import { IconButton } from '../Buttons/IconButton';
import { TimePicker, TimePickerProps } from '../TimePicker';

const isSameDay = (a: Date | undefined, b: Date | undefined) => {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

const isInDateRange = (
  date: Date | undefined,
  startDate: Date | undefined,
  endDate: Date | undefined,
) => {
  if (!date || !startDate || !endDate) {
    return false;
  }
  const minDate = new Date(startDate);
  const maxDate = new Date(endDate);
  const testDate = new Date(date);
  testDate && testDate.setHours(0, 0, 0, 0);
  minDate && minDate.setHours(0, 0, 0, 0);
  maxDate && maxDate.setHours(0, 0, 0, 0);
  return testDate > minDate && testDate < maxDate;
};

// compares to see if one date is earlier than another
const isBefore = (
  beforeDate: Date | undefined,
  afterDate: Date | undefined,
) => {
  if (!beforeDate || !afterDate) {
    return false;
  }
  const firstDate = new Date(beforeDate);
  const secondDate = new Date(afterDate);
  firstDate && firstDate.setHours(0, 0, 0, 0);
  secondDate && secondDate.setHours(0, 0, 0, 0);
  return firstDate < secondDate;
};

// Type guard for multiple did not work
const isSingleOnChange = (
  onChange:
    | (((date: Date) => void) | undefined)
    | (((startDate: Date, endDate: Date) => void) | undefined),
  enableRangeSelect: boolean,
): onChange is ((date: Date) => void) | undefined => {
  return !enableRangeSelect;
};

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

const defaultShortDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const defaultLongDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

/**
 * Generate localized months and days strings using `Intl.DateTimeFormat` for passed locale to use in DatePicker component.
 * If locale is not passed, browser locale will be used.
 */
export const generateLocalizedStrings = (
  locale?: string,
): { [key in 'months' | 'shortDays' | 'days']: string[] } => {
  const shortWeekDayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
  });
  const longWeekDayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
  });
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'long' });

  const months = [
    monthFormatter.format(new Date(2020, 0, 1)),
    monthFormatter.format(new Date(2020, 1, 1)),
    monthFormatter.format(new Date(2020, 2, 1)),
    monthFormatter.format(new Date(2020, 3, 1)),
    monthFormatter.format(new Date(2020, 4, 1)),
    monthFormatter.format(new Date(2020, 5, 1)),
    monthFormatter.format(new Date(2020, 6, 1)),
    monthFormatter.format(new Date(2020, 7, 1)),
    monthFormatter.format(new Date(2020, 8, 1)),
    monthFormatter.format(new Date(2020, 9, 1)),
    monthFormatter.format(new Date(2020, 10, 1)),
    monthFormatter.format(new Date(2020, 11, 1)),
  ];

  const days = [
    longWeekDayFormatter.format(new Date(2020, 10, 1)),
    longWeekDayFormatter.format(new Date(2020, 10, 2)),
    longWeekDayFormatter.format(new Date(2020, 10, 3)),
    longWeekDayFormatter.format(new Date(2020, 10, 4)),
    longWeekDayFormatter.format(new Date(2020, 10, 5)),
    longWeekDayFormatter.format(new Date(2020, 10, 6)),
    longWeekDayFormatter.format(new Date(2020, 10, 7)),
  ];

  const shortDays = [
    shortWeekDayFormatter.format(new Date(2020, 10, 1)).slice(0, 2),
    shortWeekDayFormatter.format(new Date(2020, 10, 2)).slice(0, 2),
    shortWeekDayFormatter.format(new Date(2020, 10, 3)).slice(0, 2),
    shortWeekDayFormatter.format(new Date(2020, 10, 4)).slice(0, 2),
    shortWeekDayFormatter.format(new Date(2020, 10, 5)).slice(0, 2),
    shortWeekDayFormatter.format(new Date(2020, 10, 6)).slice(0, 2),
    shortWeekDayFormatter.format(new Date(2020, 10, 7)).slice(0, 2),
  ];

  return {
    months,
    shortDays,
    days,
  };
};
export type DateRangePickerProps =
  | {
      /**
       * Enable date range support.
       * @default false
       */
      enableRangeSelect?: false;
      /**
       * Selected start date
       */
      startDate?: undefined;
      /**
       * Selected end date
       */
      endDate?: undefined;
      /**
       * Callback when date is changed.
       */
      onChange?: (date: Date) => void;
    }
  | {
      enableRangeSelect: true;
      startDate: Date;
      endDate: Date;
      onChange?: (startDate: Date, endDate: Date) => void;
    };

export type DatePickerProps = {
  /**
   * Selected date.
   */
  date?: Date;
  /**
   * Pass localized week days (start from sunday) and months.
   * Use helper function `generateLocalizedStrings` to generate strings using `Intl.DateTimeFormat`.
   */
  localizedNames?: { [key in 'months' | 'shortDays' | 'days']: string[] };
  /**
   * Set focus on selected day or today.
   * @default false
   */
  setFocus?: boolean;
  /**
   * Show time picker near the calendar.
   * @default false
   */
  showTime?: boolean;
  /**
   * Show additional buttons to select year.
   * @default false
   */
  showYearSelection?: boolean;
} & DateRangePickerProps &
  Omit<TimePickerProps, 'date' | 'onChange' | 'setFocusHour'>;

/**
 * Date picker component
 * @example
 * <DatePicker date={new Date()} onChange={(e) => console.log('New date value: ' + e)} />
 */
export const DatePicker = (props: DatePickerProps): JSX.Element => {
  const {
    date,
    onChange,
    localizedNames,
    className,
    style,
    setFocus = false,
    showTime = false,
    use12Hours = false,
    precision,
    hourStep,
    minuteStep,
    secondStep,
    useCombinedRenderer,
    combinedRenderer,
    hourRenderer,
    minuteRenderer,
    secondRenderer,
    meridiemRenderer,
    showYearSelection = false,
    enableRangeSelect = false,
    startDate,
    endDate,
    ...rest
  } = props;

  useTheme();

  const monthNames = localizedNames?.months ?? defaultMonths;
  const shortDays = localizedNames?.shortDays ?? defaultShortDays;
  const longDays = localizedNames?.days ?? defaultLongDays;

  const [selectedDay, setSelectedDay] = React.useState(date);
  const [selectedStartDay, setSelectedStartDay] = React.useState(startDate);
  const [selectedEndDay, setSelectedEndDay] = React.useState(endDate);
  const [focusedDay, setFocusedDay] = React.useState(
    selectedStartDay ?? selectedDay ?? new Date(),
  );
  const [displayedMonthIndex, setDisplayedMonthIndex] = React.useState(
    selectedStartDay?.getMonth() ??
      selectedDay?.getMonth() ??
      new Date().getMonth(),
  );
  const [displayedYear, setDisplayedYear] = React.useState(
    selectedStartDay?.getFullYear() ??
      selectedDay?.getFullYear() ??
      new Date().getFullYear(),
  );
  // boolean that toggles between the user picking the start date and end date for date range
  const [isSelectingStartDate, setIsSelectingStartDate] = React.useState(true);

  // Used to focus days only when days are changed
  // e.g. without this, when changing months day would be focused
  const needFocus = React.useRef(setFocus);

  React.useEffect(() => {
    if (needFocus.current) {
      needFocus.current = false;
    }
  });

  const setMonthAndYear = React.useCallback(
    (newMonth: number, newYear: number) => {
      setDisplayedMonthIndex(newMonth);
      setDisplayedYear(newYear);
    },
    [],
  );

  React.useEffect(() => {
    const currentDate = new Date();
    setSelectedDay(date);
    setSelectedStartDay(startDate);
    setSelectedEndDay(endDate);
    if (!enableRangeSelect) {
      setFocusedDay(date ?? currentDate);
    }
    setMonthAndYear(
      startDate?.getMonth() ?? date?.getMonth() ?? currentDate.getMonth(),

      startDate?.getFullYear() ??
        date?.getFullYear() ??
        currentDate.getFullYear(),
    );
  }, [date, setMonthAndYear, startDate, endDate, enableRangeSelect]);

  const days = React.useMemo(() => {
    let offsetToFirst = new Date(
      displayedYear,
      displayedMonthIndex,
      1,
    ).getDay();

    // if its sunday, show one week before
    if (0 === offsetToFirst) {
      offsetToFirst = 7;
    }

    const daysInMonth: Date[] = [];
    // generate 6 weeks of dates
    for (let i = 1; i <= 42; i++) {
      const adjustedDay = i - offsetToFirst;
      daysInMonth.push(
        new Date(displayedYear, displayedMonthIndex, adjustedDay),
      );
    }
    return daysInMonth;
  }, [displayedMonthIndex, displayedYear]);

  const weeks = React.useMemo(() => {
    const weeksInMonth = [];
    const weekCount = Math.ceil(days.length / 7);
    for (let i = 0; i < weekCount; i++) {
      weeksInMonth.push(days.slice(i * 7, (i + 1) * 7));
    }
    return weeksInMonth;
  }, [days]);

  const getNewFocusedDate = (newYear: number, newMonth: number) => {
    const currentDate = selectedStartDay ?? selectedDay ?? new Date();
    const newDate = new Date(
      newYear,
      newMonth,
      currentDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds(),
    );
    return newDate;
  };

  const handleMoveToPreviousYear = () => {
    const newYear = displayedYear - 1;
    setMonthAndYear(displayedMonthIndex, newYear);
    setFocusedDay(getNewFocusedDate(newYear, displayedMonthIndex));
  };

  const handleMoveToNextYear = () => {
    const newYear = displayedYear + 1;
    setMonthAndYear(displayedMonthIndex, newYear);
    setFocusedDay(getNewFocusedDate(newYear, displayedMonthIndex));
  };

  const handleMoveToPreviousMonth = () => {
    const newMonth = displayedMonthIndex !== 0 ? displayedMonthIndex - 1 : 11;
    const newYear =
      displayedMonthIndex !== 0 ? displayedYear : displayedYear - 1;
    setMonthAndYear(newMonth, newYear);
    setFocusedDay(getNewFocusedDate(newYear, newMonth));
  };

  const handleMoveToNextMonth = () => {
    const newMonth = displayedMonthIndex !== 11 ? displayedMonthIndex + 1 : 0;
    const newYear =
      displayedMonthIndex !== 11 ? displayedYear : displayedYear + 1;
    setMonthAndYear(newMonth, newYear);
    setFocusedDay(getNewFocusedDate(newYear, newMonth));
  };

  const onDayClick = (day: Date) => {
    // single date selection
    if (!enableRangeSelect) {
      if (day.getMonth() !== selectedDay?.getMonth()) {
        setMonthAndYear(day.getMonth(), day.getFullYear());
      }
      const currentDate = selectedDay ?? new Date();
      const newDate = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds(),
      );
      setSelectedDay(newDate);
      setFocusedDay(newDate);
      isSingleOnChange(onChange, enableRangeSelect) && onChange?.(newDate);
    }
    // start date selection (date range only)
    else if (isSelectingStartDate) {
      if (day.getMonth() !== selectedStartDay?.getMonth()) {
        setMonthAndYear(day.getMonth(), day.getFullYear());
      }
      const currentStartDate = selectedStartDay ?? new Date();
      const newStartDate = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        currentStartDate.getHours(),
        currentStartDate.getMinutes(),
        currentStartDate.getSeconds(),
      );
      setSelectedStartDay(newStartDate);
      setFocusedDay(newStartDate);
      // if the start date is after the end date or the end date is undefined, reset the end date
      if (!isBefore(newStartDate, selectedEndDay)) {
        setSelectedEndDay(newStartDate);
        onChange?.(newStartDate, newStartDate);
      } else {
        selectedEndDay && onChange?.(newStartDate, selectedEndDay);
      }
      setIsSelectingStartDate(false);
    }
    // end date selection (date range only)
    else {
      if (day.getMonth() !== selectedEndDay?.getMonth()) {
        setMonthAndYear(day.getMonth(), day.getFullYear());
      }
      const currentEndDate = selectedEndDay ?? new Date();
      const newEndDate = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        currentEndDate.getHours(),
        currentEndDate.getMinutes(),
        currentEndDate.getSeconds(),
      );
      setFocusedDay(newEndDate);
      // if the end date is before the start date, move back the start date and still have user select end date
      if (!isBefore(newEndDate, selectedStartDay)) {
        setSelectedEndDay(newEndDate);
        selectedStartDay && onChange?.(selectedStartDay, newEndDate);
        setIsSelectingStartDate(true);
      } else {
        setSelectedStartDay(newEndDate);
        selectedEndDay && onChange?.(newEndDate, selectedEndDay);
      }
    }
  };

  const handleCalendarKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (!focusedDay) {
      return;
    }
    const adjustedFocusedDay = new Date(focusedDay);
    switch (event.key) {
      case 'ArrowDown':
        adjustedFocusedDay.setDate(focusedDay.getDate() + 7);
        if (adjustedFocusedDay.getMonth() !== displayedMonthIndex) {
          handleMoveToNextMonth();
        }
        setFocusedDay(adjustedFocusedDay);
        needFocus.current = true;
        event.preventDefault();
        break;
      case 'ArrowUp':
        adjustedFocusedDay.setDate(focusedDay.getDate() - 7);
        if (adjustedFocusedDay.getMonth() !== displayedMonthIndex) {
          handleMoveToPreviousMonth();
        }
        setFocusedDay(adjustedFocusedDay);
        needFocus.current = true;
        event.preventDefault();
        break;
      case 'ArrowLeft':
        adjustedFocusedDay.setDate(focusedDay.getDate() - 1);
        if (adjustedFocusedDay.getMonth() !== displayedMonthIndex) {
          handleMoveToPreviousMonth();
        }
        setFocusedDay(adjustedFocusedDay);
        needFocus.current = true;
        event.preventDefault();
        break;
      case 'ArrowRight':
        adjustedFocusedDay.setDate(focusedDay.getDate() + 1);
        if (adjustedFocusedDay.getMonth() !== displayedMonthIndex) {
          handleMoveToNextMonth();
        }
        setFocusedDay(adjustedFocusedDay);
        needFocus.current = true;
        event.preventDefault();
        break;
      case 'Enter':
      case ' ':
      case 'Spacebar':
        onDayClick(focusedDay);
        event.preventDefault();
        break;
    }
  };

  const getDayClass = (day: Date) => {
    if (day.getMonth() !== displayedMonthIndex) {
      return 'iui-calendar-day-outside-month';
    }

    let dayClass = 'iui-calendar-day';

    const isSelectedDay =
      isSameDay(day, selectedDay) ||
      (isSameDay(day, selectedStartDay) && isSameDay(day, selectedEndDay));

    if (isSelectedDay) {
      dayClass += '-selected';
    } else if (isSameDay(day, selectedStartDay)) {
      dayClass += '-range-start';
    } else if (isSameDay(day, selectedEndDay)) {
      dayClass += '-range-end';
    }

    // adds range class to dates between start and end date
    if (
      selectedStartDay &&
      selectedEndDay &&
      isInDateRange(day, selectedStartDay, selectedEndDay)
    ) {
      dayClass += '-range';
    }

    if (isSameDay(day, new Date())) {
      dayClass += '-today';
    }

    return dayClass;
  };

  return (
    <div className={cx('iui-date-picker', className)} style={style} {...rest}>
      <div>
        <div className='iui-calendar-month-year'>
          {showYearSelection && (
            <IconButton
              styleType='borderless'
              onClick={handleMoveToPreviousYear}
              aria-label='Previous year'
              size='small'
            >
              <SvgChevronLeftDouble />
            </IconButton>
          )}
          <IconButton
            styleType='borderless'
            onClick={handleMoveToPreviousMonth}
            aria-label='Previous month'
            size='small'
          >
            <SvgChevronLeft />
          </IconButton>
          <span aria-live='polite'>
            <span
              className='iui-calendar-month'
              title={monthNames[displayedMonthIndex]}
            >
              {monthNames[displayedMonthIndex]}
            </span>
            &nbsp;{displayedYear}
          </span>
          <IconButton
            styleType='borderless'
            onClick={handleMoveToNextMonth}
            aria-label='Next month'
            size='small'
          >
            <SvgChevronRight />
          </IconButton>
          {showYearSelection && (
            <IconButton
              styleType='borderless'
              onClick={handleMoveToNextYear}
              aria-label='Next year'
              size='small'
            >
              <SvgChevronRightDouble />
            </IconButton>
          )}
        </div>
        <div className='iui-calendar-weekdays'>
          {shortDays.map((day, index) => (
            <div key={day} title={longDays[index]}>
              {day}
            </div>
          ))}
        </div>
        <div onKeyDown={handleCalendarKeyDown} role='listbox'>
          {weeks.map((weekDays, weekIndex) => {
            return (
              <div
                key={`week-${displayedMonthIndex}-${weekIndex}`}
                className='iui-calendar-week'
              >
                {weekDays.map((weekDay, dayIndex) => {
                  const dateValue = weekDay.getDate();
                  return (
                    <div
                      key={`day-${displayedMonthIndex}-${dayIndex}`}
                      className={getDayClass(weekDay)}
                      onClick={() => onDayClick(weekDay)}
                      role='option'
                      tabIndex={isSameDay(weekDay, focusedDay) ? 0 : -1}
                      ref={(element) =>
                        isSameDay(weekDay, focusedDay) &&
                        needFocus.current &&
                        element?.focus()
                      }
                    >
                      {dateValue}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {showTime && (
        <TimePicker
          date={selectedStartDay ?? selectedDay}
          use12Hours={use12Hours}
          precision={precision}
          hourStep={hourStep}
          minuteStep={minuteStep}
          secondStep={secondStep}
          useCombinedRenderer={useCombinedRenderer}
          combinedRenderer={combinedRenderer}
          hourRenderer={hourRenderer}
          minuteRenderer={minuteRenderer}
          secondRenderer={secondRenderer}
          meridiemRenderer={meridiemRenderer}
          onChange={(date) =>
            isSingleOnChange(onChange, enableRangeSelect)
              ? onChange?.(date)
              : onChange?.(
                  new Date(
                    selectedStartDay?.getFullYear() ?? date.getFullYear(),
                    selectedStartDay?.getMonth() ?? date.getMonth(),
                    selectedStartDay?.getDate() ?? date.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds(),
                  ),
                  new Date(
                    selectedEndDay?.getFullYear() ?? date.getFullYear(),
                    selectedEndDay?.getMonth() ?? date.getMonth(),
                    selectedEndDay?.getDate() ?? date.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds(),
                  ),
                )
          }
        />
      )}
    </div>
  );
};

export default DatePicker;
