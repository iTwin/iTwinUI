/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgChevronLeft from '@itwin/itwinui-icons-react/cjs/icons/ChevronLeft';
import SvgChevronRight from '@itwin/itwinui-icons-react/cjs/icons/ChevronRight';
import cx from 'classnames';
import React from 'react';
import { CommonProps } from '../utils/props';
import { useTheme } from '../utils/hooks/useTheme';
import '@itwin/itwinui-css/css/date-picker.css';

const isSameDay = (a: Date | undefined, b: Date | undefined) => {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
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

export type DatePickerProps = {
  /**
   * Selected date.
   */
  date?: Date;
  /**
   * Callback when date is changed.
   */
  onChange?: (date?: Date) => void;
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
} & Omit<CommonProps, 'title'>;

/**
 * Date picker component
 * @example
 * <DatePicker date={new Date()} onChange={(e) => console.log('New date value: ' + e)} />
 */
export const DatePicker = ({
  date,
  onChange,
  localizedNames,
  className,
  style,
  setFocus = false,
  ...rest
}: DatePickerProps): JSX.Element => {
  useTheme();

  const monthNames = localizedNames?.months ?? defaultMonths;
  const shortDays = localizedNames?.shortDays ?? defaultShortDays;
  const longDays = localizedNames?.days ?? defaultLongDays;

  const [selectedDay, setSelectedDay] = React.useState(date);
  const [focusedDay, setFocusedDay] = React.useState(selectedDay ?? new Date());
  const [displayedMonthIndex, setDisplayedMonthIndex] = React.useState(
    selectedDay ? selectedDay.getMonth() : new Date().getMonth(),
  );
  const [displayedYear, setDisplayedYear] = React.useState(
    selectedDay ? selectedDay.getFullYear() : new Date().getFullYear(),
  );
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
    setFocusedDay(date ?? currentDate);
    setMonthAndYear(
      date ? date.getMonth() : currentDate.getMonth(),
      date ? date.getFullYear() : currentDate.getFullYear(),
    );
  }, [date, setMonthAndYear]);

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
    return selectedDay?.getMonth() === newMonth &&
      selectedDay?.getFullYear() === newYear
      ? selectedDay
      : new Date(newYear, newMonth, 1);
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
    if (day.getMonth() !== selectedDay?.getMonth()) {
      setMonthAndYear(day.getMonth(), day.getFullYear());
    }
    setSelectedDay(day);
    setFocusedDay(day);
    onChange?.(day);
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

  const onPreviousMonthKeyClick = (event: React.KeyboardEvent<SVGElement>) => {
    if (
      event.key === 'Enter' ||
      event.key === ' ' ||
      event.key === 'Spacebar'
    ) {
      handleMoveToPreviousMonth();
    }
  };

  const onNextMonthKeyClick = (event: React.KeyboardEvent<SVGElement>) => {
    if (
      event.key === 'Enter' ||
      event.key === ' ' ||
      event.key === 'Spacebar'
    ) {
      handleMoveToNextMonth();
    }
  };

  return (
    <div className={cx('iui-date-picker', className)} style={style} {...rest}>
      <div
        className='iui-date-picker-calendar'
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          position: 'initial',
        }}
      >
        <div className='iui-date-picker-calendar-header'>
          <div className='iui-date-picker-calendar-header-content'>
            <SvgChevronLeft
              onClick={handleMoveToPreviousMonth}
              onKeyDown={onPreviousMonthKeyClick}
              tabIndex={0}
            />
            <span>
              {monthNames[displayedMonthIndex]} {displayedYear}
            </span>
            <SvgChevronRight
              onClick={handleMoveToNextMonth}
              onKeyDown={onNextMonthKeyClick}
              tabIndex={0}
            />
          </div>
          <div className='iui-date-picker-calendar-header-weekdays'>
            {shortDays.map((day, index) => (
              <div key={day} title={longDays[index]}>
                {day}
              </div>
            ))}
          </div>
        </div>
        <div
          className='iui-date-picker-calendar-month'
          onKeyDown={handleCalendarKeyDown}
          role='listbox'
        >
          {weeks.map((weekDays, weekIndex) => {
            return (
              <div
                key={`week-${displayedMonthIndex}-${weekIndex}`}
                className='iui-date-picker-calendar-week'
              >
                {weekDays.map((weekDay, dayIndex) => {
                  const dateValue = weekDay.getDate();
                  return (
                    <div
                      key={`day-${displayedMonthIndex}-${dayIndex}`}
                      className={cx('iui-date-picker-calendar-week-selector', {
                        'iui-outside-month':
                          weekDay.getMonth() !== displayedMonthIndex,
                        'iui-today': isSameDay(weekDay, new Date()),
                        'iui-selected': isSameDay(weekDay, selectedDay),
                      })}
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
    </div>
  );
};

export default DatePicker;
