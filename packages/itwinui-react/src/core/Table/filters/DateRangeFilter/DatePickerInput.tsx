/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SvgCalendar, isBefore, useId } from '../../../../utils/index.js';
import type { LabeledInput } from '../../../LabeledInput/LabeledInput.js';
import type { PolymorphicForwardRefComponent } from '../../../../utils/index.js';
import { DatePicker } from '../../../DatePicker/DatePicker.js';
import { InputGrid } from '../../../InputGrid/InputGrid.js';
import { Label } from '../../../Label/Label.js';
import { InputWithDecorations } from '../../../InputWithDecorations/InputWithDecorations.js';
import type { DatePickerLocalizedNames } from '../../../DatePicker/DatePicker.js';
import { Popover } from '../../../Popover/Popover.js';

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
  /**
   * Months, short days and days localized names for DatePicker
   */
  localizedNames?: DatePickerLocalizedNames;
} & Omit<
  React.ComponentProps<typeof LabeledInput>,
  'value' | 'onChange' | 'svgIcon' | 'displayStyle'
> &
  Pick<React.ComponentProps<typeof DatePicker>, 'showYearSelection'>;

export const DatePickerInput = React.forwardRef((props, forwardedRef) => {
  const uid = useId();
  const {
    onChange,
    date,
    parseInput,
    formatDate,
    label,
    required,
    disabled,
    isFromOrTo,
    selectedDate,
    wrapperProps,
    labelProps,
    inputWrapperProps,
    id = uid,
    localizedNames,
    showYearSelection,
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
    <InputGrid labelPlacement='inline' {...wrapperProps}>
      <Label
        as='label'
        required={required}
        disabled={disabled}
        htmlFor={id}
        {...labelProps}
      >
        {label}
      </Label>
      <InputWithDecorations {...inputWrapperProps}>
        <InputWithDecorations.Input
          id={id}
          value={inputValue}
          onChange={onInputChange}
          required={required}
          disabled={disabled}
          ref={forwardedRef}
          {...rest}
        />
        <Popover
          content={
            <DatePicker
              date={date}
              onChange={onDateSelected}
              setFocus
              isDateDisabled={isDateDisabled}
              localizedNames={localizedNames}
              applyBackground={false}
              showDatesOutsideMonth={false}
              showYearSelection={showYearSelection}
            />
          }
          placement='bottom-end'
          visible={isVisible}
          onVisibleChange={setIsVisible}
          closeOnOutsideClick
          applyBackground
        >
          <InputWithDecorations.Button aria-label='Date picker' ref={buttonRef}>
            <SvgCalendar />
          </InputWithDecorations.Button>
        </Popover>
      </InputWithDecorations>
    </InputGrid>
  );
}) as PolymorphicForwardRefComponent<'input', DatePickerInputProps>;
