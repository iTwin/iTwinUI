/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Popover, SvgCalendar } from '../../../utils';
import { LabeledInput, LabeledInputProps } from '../../../LabeledInput';
import { DatePicker } from '../../../DatePicker';
import { IconButton } from '../../../Buttons';

export type DatePickerInputProps = {
  date?: Date;
  onChange: (date?: Date) => void;
  parseInput: (text: string) => Date;
  formatDate: (date: Date) => string;
} & Omit<LabeledInputProps, 'value' | 'onChange' | 'svgIcon' | 'displayStyle'>;

const DatePickerInput = (props: DatePickerInputProps) => {
  const { onChange, date, parseInput, formatDate, ...rest } = props;

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
      content={<DatePicker date={date} onChange={onDateSelected} setFocus />}
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
