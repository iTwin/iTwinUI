/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useTheme, ClassNameProps, StylingProps } from '../utils';
import '@itwin/itwinui-css/css/time-picker.css';

const isSameHour = (
  date1: Date,
  date2: Date | undefined,
  meridiem?: MeridiemType,
) => {
  const adjustedHours = meridiem
    ? formatHourFrom12(date1.getHours(), meridiem)
    : date1.getHours();
  if (!!meridiem) {
    return !!date2 && adjustedHours % 12 === date2.getHours() % 12;
  }
  return !!date2 && adjustedHours === date2.getHours();
};

const isSameMinute = (date1: Date, date2: Date | undefined) => {
  return !!date2 && date1.getMinutes() === date2.getMinutes();
};

const isSameSecond = (date1: Date, date2: Date | undefined) => {
  return !!date2 && date1.getSeconds() === date2.getSeconds();
};

const isSameTime = (
  date1: Date,
  date2: Date | undefined,
  precision: Precision,
  meridiem?: MeridiemType,
) => {
  let isSameTime = true;
  switch (precision) {
    case 'seconds':
      isSameTime = isSameSecond(date1, date2);
      if (!isSameTime) {
        break;
      }
    case 'minutes':
      isSameTime = isSameMinute(date1, date2);
      if (!isSameTime) {
        break;
      }
    case 'hours':
      isSameTime = isSameHour(date1, date2, meridiem);
  }
  return isSameTime;
};

const isSameMeridiem = (meridiem: MeridiemType, date: Date | undefined) => {
  return (
    !!date && (meridiem === 'AM' ? date.getHours() < 12 : date.getHours() >= 12)
  );
};

const formatHourFrom12 = (hour: number, meridiem: MeridiemType | undefined) => {
  const adjustedHour = hour % 12;
  return meridiem === 'PM' ? adjustedHour + 12 : adjustedHour;
};

const setHours = (hour: number, date: Date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hour,
    date.getMinutes(),
    date.getSeconds(),
  );
};

const defaultCombinedRenderer = (date: Date, precision: Precision) => {
  let dateString = '';
  switch (precision) {
    case 'seconds':
      dateString =
        ':' +
        date
          .getSeconds()
          .toLocaleString(undefined, { minimumIntegerDigits: 2 });
    case 'minutes':
      dateString =
        ':' +
        date
          .getMinutes()
          .toLocaleString(undefined, { minimumIntegerDigits: 2 }) +
        dateString;
    case 'hours':
      dateString =
        date.getHours().toLocaleString(undefined, { minimumIntegerDigits: 2 }) +
        dateString;
  }
  return dateString;
};

export type MeridiemType = 'AM' | 'PM';
export type Precision = 'hours' | 'minutes' | 'seconds';

export type TimePickerProps = {
  /**
   * Selected date. Only time is used from Date object.
   */
  date?: Date;
  /**
   * Callback when time is changed.
   */
  onChange?: (date: Date) => void;
  /**
   * Format of the time. 12h or 24h.
   * @default false
   */
  use12Hours?: boolean;
  /**
   * Precision of the time.
   * @default 'minutes'
   */
  precision?: Precision;
  /**
   * Change step of the hours displayed.
   * @default 1
   */
  hourStep?: number;
  /**
   * Change step of the minutes displayed.
   * @default 1
   */
  minuteStep?: number;
  /**
   * Change step of the seconds displayed.
   * @default 1
   */
  secondStep?: number;
  /**
   * Set focus on hour.
   * @default false
   */
  setFocusHour?: boolean;
  /**
   * Custom hour cell renderer.
   * @default (date: Date) => date.getHours().toLocaleString(undefined, { minimumIntegerDigits: 2 })
   */
  hourRenderer?: (date: Date) => React.ReactNode;
  /**
   * Custom minute cell renderer.
   * @default (date: Date) => date.getMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 })
   */
  minuteRenderer?: (date: Date) => React.ReactNode;
  /**
   * Custom second cell renderer.
   * @default (date: Date) => date.getSeconds().toLocaleString(undefined, { minimumIntegerDigits: 2 })
   */
  secondRenderer?: (date: Date) => React.ReactNode;
  /**
   * Custom AM/PM cell renderer.
   * @default (meridiem: MeridiemType) => meridiem
   */
  meridiemRenderer?: (meridiem: MeridiemType) => React.ReactNode;
  /**
   * Use combined time renderer. Combines hour, minute, and seconds into one column.
   * **WARNING**: Using the combined renderer with a `precision` of 'seconds' along with
   * small time steps (`hourStep`, `minuteStep`, and especially `secondStep`) can result in slow performance!
   * @default false
   */
  useCombinedRenderer?: boolean;
  /**
   * Custom combined time renderer.
   * Default returns time in `HH:MM:SS` format
   * @default (date: Date, precision: Precision) => {
   *   let dateString = '';
   *   switch (precision) {
   *     case 'seconds':
   *        dateString = ':' + date.getSeconds().toLocaleString(undefined, { minimumIntegerDigits: 2 });
   *      case 'minutes':
   *        dateString = ':' + date.getMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 }) + dateString;
   *      case 'hours':
   *        dateString = date.getHours().toLocaleString(undefined, { minimumIntegerDigits: 2 }) + dateString;
   *    }
   *    return dateString;
   *   }
   */
  combinedRenderer?: (date: Date, precision: Precision) => React.ReactNode;
} & StylingProps;

/**
 * Time picker component
 * @example
 * <TimePicker date={new Date()} onChange={(e) => console.log('New time value: ' + e)} />
 */
export const TimePicker = (props: TimePickerProps): JSX.Element => {
  const {
    date,
    onChange,
    use12Hours = false,
    precision = 'minutes',
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
    setFocusHour = false,
    hourRenderer = (date: Date) =>
      date.getHours().toLocaleString(undefined, { minimumIntegerDigits: 2 }),
    minuteRenderer = (date: Date) =>
      date.getMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 }),
    secondRenderer = (date: Date) =>
      date.getSeconds().toLocaleString(undefined, { minimumIntegerDigits: 2 }),
    meridiemRenderer = (meridiem: MeridiemType) => meridiem,
    useCombinedRenderer = false,
    combinedRenderer = defaultCombinedRenderer,
    className,
    ...rest
  } = props;

  useTheme();

  const [selectedTime, setSelectedTime] = React.useState(date);
  const [focusedTime, setFocusedTime] = React.useState(
    selectedTime ?? new Date(),
  );
  const [meridiem, setMeridiem] = React.useState<MeridiemType | undefined>(
    use12Hours ? (focusedTime?.getHours() > 11 ? 'PM' : 'AM') : undefined,
  );

  React.useEffect(() => {
    setFocusedTime(date ?? new Date());
    setSelectedTime(date);
  }, [date]);

  const onHourClick = (date: Date) => {
    const adjustedHour = use12Hours
      ? formatHourFrom12(date.getHours(), meridiem)
      : date.getHours();
    const adjustedSelectedTime = setHours(
      adjustedHour,
      selectedTime ?? new Date(),
    );
    updateCurrentTime(adjustedSelectedTime);
  };

  const onTimeClick = (date: Date) => {
    const adjustedHour = use12Hours
      ? formatHourFrom12(date.getHours(), meridiem)
      : date.getHours();
    const adjustedSelectedTime = setHours(adjustedHour, date);
    updateCurrentTime(adjustedSelectedTime);
  };

  const onMeridiemClick = (value: MeridiemType) => {
    let adjustedSelectedTime = selectedTime ?? new Date();
    const currentHours = adjustedSelectedTime.getHours();
    setMeridiem(value);
    if (value === 'AM' && currentHours > 11) {
      adjustedSelectedTime = setHours(currentHours - 12, adjustedSelectedTime);
    }
    if (value === 'PM' && currentHours <= 12) {
      adjustedSelectedTime = setHours(currentHours + 12, adjustedSelectedTime);
    }
    updateCurrentTime(adjustedSelectedTime);
  };

  const updateCurrentTime = (time: Date) => {
    let adjustedTime = time;
    // Nullify other values, according to precision
    if (precision === 'hours') {
      adjustedTime = new Date(
        time.getFullYear(),
        time.getMonth(),
        time.getDate(),
        time.getHours(),
        0,
        0,
      );
    }
    if (precision === 'minutes') {
      adjustedTime = new Date(
        time.getFullYear(),
        time.getMonth(),
        time.getDate(),
        time.getHours(),
        time.getMinutes(),
        0,
      );
    }
    setFocusedTime(adjustedTime);
    setSelectedTime(adjustedTime);
    onChange?.(adjustedTime);
  };

  const onHourFocus = (date: Date) => {
    const adjustedHour = use12Hours
      ? formatHourFrom12(date.getHours(), meridiem)
      : date.getHours();
    setFocusedTime(setHours(adjustedHour, focusedTime));
  };

  const onTimeFocus = (date: Date) => {
    const adjustedHour = use12Hours
      ? formatHourFrom12(date.getHours(), meridiem)
      : date.getHours();
    setFocusedTime(setHours(adjustedHour, date));
  };

  const onMeridiemFocus = (value: MeridiemType) => {
    let adjustedSelectedTime = selectedTime ?? new Date();
    const currentHours = adjustedSelectedTime.getHours();
    if (value === 'AM' && currentHours > 11) {
      setMeridiem(value);
      adjustedSelectedTime = setHours(currentHours - 12, adjustedSelectedTime);
    }
    if (value === 'PM' && currentHours <= 12) {
      setMeridiem(value);
      adjustedSelectedTime = setHours(currentHours + 12, adjustedSelectedTime);
    }
    setFocusedTime(adjustedSelectedTime);
  };

  const generateDataList = (
    size: number,
    value: (index: number) => Date,
    step: number,
  ) => {
    const data = [];
    for (let i = 0; i < size; i++) {
      if (i % step === 0) {
        data.push(value(i));
      }
    }
    return data;
  };

  const time = React.useMemo(() => {
    const time = selectedTime ?? new Date();
    const data: Date[] = [];
    const hoursArray = Array.from(Array(use12Hours ? 12 : 24).keys())
      .filter((i) => i % hourStep === 0)
      .map((i) => (use12Hours && i === 0 ? 12 : i));
    const minutesArray = Array.from(Array(60).keys()).filter(
      (i) => i % minuteStep === 0,
    );
    const secondsArray = Array.from(Array(60).keys()).filter(
      (i) => i % secondStep === 0,
    );

    hoursArray.forEach((hour) => {
      if (precision === 'hours') {
        data.push(
          new Date(
            time.getFullYear(),
            time.getMonth(),
            time.getDate(),
            hour,
            time.getMinutes(),
            time.getSeconds(),
          ),
        );
      } else {
        minutesArray.forEach((minute) => {
          if (precision === 'minutes') {
            data.push(
              new Date(
                time.getFullYear(),
                time.getMonth(),
                time.getDate(),
                hour,
                minute,
                time.getSeconds(),
              ),
            );
          } else {
            secondsArray.forEach((second) => {
              data.push(
                new Date(
                  time.getFullYear(),
                  time.getMonth(),
                  time.getDate(),
                  hour,
                  minute,
                  second,
                ),
              );
            });
          }
        });
      }
    });

    return data;
  }, [hourStep, minuteStep, secondStep, selectedTime, use12Hours, precision]);

  const hours = React.useMemo(() => {
    const time = selectedTime ?? new Date();
    return generateDataList(
      use12Hours ? 12 : 24,
      (i: number) =>
        new Date(
          time.getFullYear(),
          time.getMonth(),
          time.getDate(),
          use12Hours && i === 0 ? 12 : i,
          time.getMinutes(),
          time.getSeconds(),
        ),
      hourStep,
    );
  }, [hourStep, selectedTime, use12Hours]);

  const minutes = React.useMemo(() => {
    const time = selectedTime ?? new Date();
    return generateDataList(
      60,
      (i: number) =>
        new Date(
          time.getFullYear(),
          time.getMonth(),
          time.getDate(),
          time.getHours(),
          i,
          time.getSeconds(),
        ),
      minuteStep,
    );
  }, [minuteStep, selectedTime]);

  const seconds = React.useMemo(() => {
    const time = selectedTime ?? new Date();
    return generateDataList(
      60,
      (i: number) =>
        new Date(
          time.getFullYear(),
          time.getMonth(),
          time.getDate(),
          time.getHours(),
          time.getMinutes(),
          i,
        ),
      secondStep,
    );
  }, [secondStep, selectedTime]);

  return (
    <div className={cx('iui-time-picker', className)} {...rest}>
      {useCombinedRenderer ? (
        <TimePickerColumn
          data={time}
          isSameFocused={(val) =>
            isSameTime(
              val,
              focusedTime,
              precision,
              use12Hours ? meridiem : undefined,
            )
          }
          isSameSelected={(val) =>
            isSameTime(
              val,
              selectedTime,
              precision,
              use12Hours ? meridiem : undefined,
            )
          }
          onFocusChange={onTimeFocus}
          onSelectChange={onTimeClick}
          setFocus={setFocusHour}
          precision={precision}
          valueRenderer={combinedRenderer}
        />
      ) : (
        <>
          <TimePickerColumn
            data={hours}
            isSameFocused={(val) =>
              isSameHour(val, focusedTime, use12Hours ? meridiem : undefined)
            }
            isSameSelected={(val) =>
              isSameHour(val, selectedTime, use12Hours ? meridiem : undefined)
            }
            onFocusChange={onHourFocus}
            onSelectChange={onHourClick}
            setFocus={setFocusHour}
            valueRenderer={hourRenderer}
          />
          {precision !== 'hours' && (
            <TimePickerColumn
              data={minutes}
              isSameFocused={(val) => isSameMinute(val, focusedTime)}
              isSameSelected={(val) => isSameMinute(val, selectedTime)}
              onFocusChange={(date) => setFocusedTime(date)}
              onSelectChange={(date) => updateCurrentTime(date)}
              valueRenderer={minuteRenderer}
            />
          )}
          {precision === 'seconds' && (
            <TimePickerColumn
              data={seconds}
              isSameFocused={(val) => isSameSecond(val, focusedTime)}
              isSameSelected={(val) => isSameSecond(val, selectedTime)}
              onFocusChange={(date) => setFocusedTime(date)}
              onSelectChange={(date) => updateCurrentTime(date)}
              valueRenderer={secondRenderer}
            />
          )}
        </>
      )}
      {use12Hours && (
        <TimePickerColumn<MeridiemType>
          data={['AM', 'PM']}
          isSameFocused={(val) => isSameMeridiem(val, focusedTime)}
          isSameSelected={(val) => isSameMeridiem(val, selectedTime)}
          onFocusChange={(date) => onMeridiemFocus(date)}
          onSelectChange={(value) => onMeridiemClick(value)}
          valueRenderer={meridiemRenderer}
          className='iui-period'
        />
      )}
    </div>
  );
};

type TimePickerColumnProps<T = Date> = {
  /**
   * Data to render in column.
   */
  data: T[];
  /**
   * Compare function for focus.
   */
  isSameFocused: (value: T) => boolean;
  /**
   * Compare function for select.
   */
  isSameSelected: (value: T) => boolean;
  /**
   * Callback when focus is changed.
   */
  onFocusChange: (value: T) => void;
  /**
   * Callback when date is changed.
   */
  onSelectChange: (value: T) => void;
  /**
   * Set initial focus.
   */
  setFocus?: boolean;
  /**
   * What value to display in every cell.
   */
  valueRenderer: (value: T, precision?: Precision) => React.ReactNode;
  /**
   * Precision of the time.
   * @default 'minutes'
   */
  precision?: Precision;
} & ClassNameProps;

const TimePickerColumn = <T,>(props: TimePickerColumnProps<T>): JSX.Element => {
  const {
    data,
    onFocusChange,
    onSelectChange,
    isSameFocused,
    isSameSelected,
    setFocus = false,
    valueRenderer,
    precision = 'minutes',
    className = 'iui-time',
  } = props;
  const needFocus = React.useRef(setFocus);

  // Used to focus row only when changed (keyboard navigation)
  // e.g. without this on every rerender it would be focused
  React.useEffect(() => {
    if (needFocus.current) {
      needFocus.current = false;
    }
  });

  const scrollIntoView = (ref: HTMLLIElement | null, isSame: boolean) => {
    isSame && ref?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  const handleTimeKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    maxValue: number,
    onFocus: (value: number) => void,
    onSelect: (value: number) => void,
    currentValue: number,
  ) => {
    switch (event.key) {
      case 'ArrowDown':
        if (currentValue + 1 > maxValue) {
          break;
        }
        onFocus(currentValue + 1);
        needFocus.current = true;
        event.preventDefault();
        break;
      case 'ArrowUp':
        if (currentValue - 1 < 0) {
          break;
        }
        onFocus(currentValue - 1);
        needFocus.current = true;
        event.preventDefault();
        break;
      case 'Enter':
      case ' ':
      case 'Spacebar':
        onSelect(currentValue);
        event.preventDefault();
        break;
    }
  };

  return (
    <div className={className}>
      <ol>
        {data.map((value, index) => {
          const isSameFocus = isSameFocused(value);
          return (
            <li
              onKeyDown={(event) => {
                handleTimeKeyDown(
                  event,
                  data.length - 1,
                  (index) => onFocusChange(data[index]),
                  (index) => onSelectChange(data[index]),
                  index,
                );
              }}
              className={cx({
                'iui-selected': isSameSelected(value),
              })}
              key={index}
              tabIndex={isSameFocus ? 0 : undefined}
              ref={(ref) => {
                scrollIntoView(ref, isSameFocus);
                needFocus.current && isSameFocus && ref?.focus();
              }}
              onClick={() => {
                onSelectChange(value);
              }}
            >
              {valueRenderer(value, precision)}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default TimePicker;
