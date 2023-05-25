/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Popover, SvgCalendar, isBefore } from '../../../utils/index.js';
import { LabeledInput } from '../../../LabeledInput/index.js';
import { DatePicker } from '../../../DatePicker/index.js';
import { IconButton } from '../../../Buttons/index.js';

export type DatePickerInputProps = {
  date?: Date;
  onChange: (date?: Date) => void;
  parseInput: (text: string) => Date;
  formatDate: (date: Date) => string;
  /**
   * Decides if this component is used for the 'from' or 'to' date
   */
  isFromOrTo?: 'from' | 'to';
  /**
   * The 'to' date for the 'from' DatePickerInput or the 'from' date for the 'to' DatePickerInput
   */
  selectedDate?: Date;
} & Omit<
  React.ComponentProps<typeof LabeledInput>,
  'value' | 'onChange' | 'svgIcon' | 'displayStyle'
>;

const DatePickerInput = (props: DatePickerInputProps) => {
  const {
    onChange,
    date,
    parseInput,
    formatDate,
    isFromOrTo,
    selectedDate,
    ...rest
  } = props;

  const isDateDisabled = (date: Date) => {
    if (isFromOrTo === 'to') {
      return isBefore(date, selectedDate);
    } else {
      return isBefore(selectedDate, date);
    }
  };

  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const [inputValue, setInputValue] = React.useState('');
  React.useEffect(() => {
    if (date && !isNaN(date.valueOf())) {
      setInputValue(formatDate(date));
    }
  }, [date, formatDate]);

  const [isVisible, setIsVisible] = React.useState(false);
  const close = React.useCallback(() => setIsVisible(false), []);

  const onDateSelected = React.useCallback(
    (date?: Date) => {
      onChange(date);
      close();
      buttonRef.current?.focus();
    },
    [close, onChange],
  );

  const onInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);
      if (!value) {
        onChange(undefined);
      }

      const parsedDate = parseInput(value);
      if (parsedDate && !isNaN(parsedDate.valueOf())) {
        onChange(parsedDate);
      }
    },
    [onChange, parseInput],
  );

  return (
    <Popover
      content={
        <DatePicker
          date={date}
          onChange={onDateSelected}
          setFocus
          isDateDisabled={isDateDisabled}
        />
      }
      placement='bottom'
      visible={isVisible}
      onClickOutside={(_, e) => {
        if (!buttonRef.current?.contains(e.target as Node)) {
          close();
        }
      }}
      appendTo='parent'
    >
      <LabeledInput
        displayStyle='inline'
        value={inputValue}
        onChange={onInputChange}
        onClick={close}
        svgIcon={
          <IconButton
            styleType='borderless'
            onClick={() => setIsVisible((v) => !v)}
            ref={buttonRef}
          >
            <SvgCalendar />
          </IconButton>
        }
        {...rest}
      />
    </Popover>
  );
};

export default DatePickerInput;
