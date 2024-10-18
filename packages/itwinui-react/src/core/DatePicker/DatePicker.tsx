/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import {
  SvgChevronLeft,
  SvgChevronRight,
  SvgChevronLeftDouble,
  SvgChevronRightDouble,
  isBefore,
  Box,
  useId,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { IconButton } from '../Buttons/IconButton.js';
import { TimePicker } from '../TimePicker/TimePicker.js';
import type { TimePickerProps } from '../TimePicker/TimePicker.js';
import { PopoverInitialFocusContext } from '../Popover/Popover.js';

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

export type DatePickerLocalizedNames = {
  [key in 'months' | 'shortDays' | 'days']: string[];
};

/**
 * Generate localized months and days strings using `Intl.DateTimeFormat` for passed locale to use in DatePicker component.
 * If locale is not passed, browser locale will be used.
 */
export const generateLocalizedStrings = (
  locale?: string,
): DatePickerLocalizedNames => {
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

type DatePickerProps = {
  /**
   * Selected date.
   */
  date?: Date;
  /**
   * Pass localized week days (start from sunday) and months.
   * Use helper function `generateLocalizedStrings` to generate strings using `Intl.DateTimeFormat`.
   */
  localizedNames?: DatePickerLocalizedNames;
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
  /**
   * Allows props to be passed for calendar month year, referring to the div that wraps around the month/year and the next/previous buttons.
   */
  monthYearProps?: React.ComponentProps<'div'>;
  /**
   * Allows props to be passed for only month, referring to span that wraps around the month title.
   */
  monthProps?: React.ComponentProps<'span'>;
  /**
   * Allows props to be passed for week days, referring to div that wraps around the week day title.
   */
  weekDayProps?: React.ComponentProps<'div'>;
  /**
   * Allows props to be passed for individual day , referring to div element the wraps around single day number.
   */
  dayProps?: React.ComponentProps<'div'>;
  /**
   * Allows props to be passed for calendar, referring to div that is used for listbox for wraping days and weeks.
   */
  calendarProps?: React.ComponentProps<'div'>;
  /**
   * Allows props to be passed for weeks, referring to div that wraps around weeks.
   */
  weekProps?: React.ComponentProps<'div'>;
  /**
   * Will disable dates for which this function returns true.
   * Disabled dates cannot be selected.
   */
  isDateDisabled?: (date: Date) => boolean;
  /**
   * Whether there is a background, border, shadow, etc.
   *
   * Should be set to true if used in a popover that doesn't have its own background,
   * or set to false if the popover has its own background or embedding within a page.
   *
   * @default true
   */
  applyBackground?: boolean;
  /**
   * Whether dates outside the current month should be displayed (in a muted text style).
   *
   * It is recommended to set this to false. Currently it defaults to true for backward compatibility.
   *
   * @default true
   */
  showDatesOutsideMonth?: boolean;
} & DateRangePickerProps &
  Omit<TimePickerProps, 'date' | 'onChange' | 'setFocusHour'>;

/**
 * Date picker component
 * @example
 * <DatePicker date={new Date()} onChange={(e) => console.log('New date value: ' + e)} />
 */
export const DatePicker = React.forwardRef((props, forwardedRef) => {
  const {
    date,
    onChange,
    localizedNames,
    className,
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
    monthYearProps,
    calendarProps,
    monthProps,
    weekDayProps,
    dayProps,
    weekProps,
    isDateDisabled,
    applyBackground = true,
    showDatesOutsideMonth = true,
    ...rest
  } = props;

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

  const popoverInitialFocusContext = React.useContext(
    PopoverInitialFocusContext,
  );
  React.useLayoutEffect(() => {
    // If setFocus and the DatePicker is in a Popover, tell Popover to not focus anything since we handle focus.
    if (setFocus && popoverInitialFocusContext) {
      popoverInitialFocusContext.setInitialFocus(-1);
    }
  }, [popoverInitialFocusContext, setFocus]);

  const days = React.useMemo(() => {
    let offsetToFirst = new Date(
      displayedYear,
      displayedMonthIndex,
      1,
    ).getDay();

    // If it's sunday, show one week before, but only if dates outside month are shown.
    // (We do not want empty space at the top if dates outside month are not shown.)
    if (0 === offsetToFirst && showDatesOutsideMonth) {
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
  }, [displayedMonthIndex, displayedYear, showDatesOutsideMonth]);

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
    if (event.altKey) {
      return;
    }

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
        if (!isDateDisabled?.(focusedDay)) {
          onDayClick(focusedDay);
        }
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

  const dateTableId = useId();

  return (
    <Box
      className={cx(
        'iui-date-picker',
        { 'iui-popover-surface': applyBackground },
        className,
      )}
      ref={forwardedRef as React.Ref<HTMLDivElement>}
      {...rest}
    >
      <div>
        <Box
          as='div'
          {...monthYearProps}
          className={cx('iui-calendar-month-year', monthYearProps?.className)}
        >
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
            <Box
              as='span'
              id={dateTableId}
              title={monthNames[displayedMonthIndex]}
              {...monthProps}
              className={cx('iui-calendar-month', monthProps?.className)}
            >
              {monthNames[displayedMonthIndex]}
            </Box>
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
        </Box>
        <Box
          as='div'
          {...weekDayProps}
          className={cx('iui-calendar-weekdays', weekDayProps?.className)}
        >
          {shortDays.map((day, index) => (
            <div key={day} title={longDays[index]}>
              {day}
            </div>
          ))}
        </Box>
        <div
          onKeyDown={handleCalendarKeyDown}
          role='listbox'
          aria-labelledby={dateTableId}
          {...calendarProps}
        >
          {weeks.map((weekDays, weekIndex) => {
            return (
              <Box
                as='div'
                key={`week-${displayedMonthIndex}-${weekIndex}`}
                {...weekProps}
                className={cx('iui-calendar-week', weekProps?.className)}
              >
                {weekDays.map((weekDay, dayIndex) => {
                  const dateValue = weekDay.getDate();
                  const isDisabled = isDateDisabled?.(weekDay);
                  const isOutsideMonth =
                    weekDay.getMonth() !== displayedMonthIndex;

                  if (isOutsideMonth && !showDatesOutsideMonth) {
                    return (
                      <Box
                        key={`day-${displayedMonthIndex}-${dayIndex}`}
                        className={cx(
                          getDayClass(weekDay),
                          dayProps?.className,
                        )}
                        aria-hidden
                      />
                    );
                  }

                  return (
                    <Box
                      as='div'
                      key={`day-${displayedMonthIndex}-${dayIndex}`}
                      onClick={() => !isDisabled && onDayClick(weekDay)}
                      role='option'
                      tabIndex={isSameDay(weekDay, focusedDay) ? 0 : -1}
                      aria-disabled={isDisabled ? 'true' : undefined}
                      ref={(element) => {
                        if (
                          isSameDay(weekDay, focusedDay) &&
                          needFocus.current
                        ) {
                          // Wait for DateRangeFilter's portaling to finish before focusing
                          // See: https://github.com/iTwin/iTwinUI/pull/2297
                          setTimeout(() => {
                            element?.focus();
                          });
                        }
                      }}
                      {...dayProps}
                      className={cx(getDayClass(weekDay), dayProps?.className)}
                    >
                      {dateValue}
                    </Box>
                  );
                })}
              </Box>
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
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', DatePickerProps>;
if (process.env.NODE_ENV === 'development') {
  DatePicker.displayName = 'DatePicker';
}
