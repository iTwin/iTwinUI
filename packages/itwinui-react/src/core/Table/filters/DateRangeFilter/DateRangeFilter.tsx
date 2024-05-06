/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useGlobals } from '../../../../utils/index.js';
import { FilterButtonBar } from '../FilterButtonBar.js';
import type { FilterButtonBarTranslation } from '../FilterButtonBar.js';
import { BaseFilter } from '../BaseFilter.js';
import type { TableFilterProps } from '../types.js';
import { DatePickerInput } from './DatePickerInput.js';
import type { DatePickerLocalizedNames } from '../../../DatePicker/DatePicker.js';

export type DateRangeTranslation = {
  from: string;
  to: string;
  datePicker?: DatePickerLocalizedNames;
};

const defaultStrings: DateRangeTranslation = {
  from: 'From',
  to: 'To',
};

const defaultFormatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en-us', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return formatter.format(date);
};

const defaultParseInput = (text: string) => {
  // Checks whether date is in correct format e.g. Feb 11, 2021
  if (/^[a-z]{3}\s\d{1,2},\s\d{4}$/gi.test(text)) {
    return new Date(text);
  }
  return new Date('');
};

export type DateRangeFilterProps<T extends Record<string, unknown>> =
  TableFilterProps<T> & {
    formatDate?: (date: Date) => string;
    parseInput?: (text: string) => Date;
    placeholder?: string;
    translatedLabels?: DateRangeTranslation & FilterButtonBarTranslation;
  } & Pick<React.ComponentProps<typeof DatePickerInput>, 'showYearSelection'>;

export const DateRangeFilter = <T extends Record<string, unknown>>(
  props: DateRangeFilterProps<T>,
) => {
  const {
    column,
    translatedLabels,
    setFilter,
    clearFilter,
    formatDate = defaultFormatDate,
    parseInput = defaultParseInput,
    placeholder = 'MMM dd, yyyy',
    showYearSelection,
  } = props;

  useGlobals();

  const translatedStrings = { ...defaultStrings, ...translatedLabels };

  const [from, setFrom] = React.useState<Date | undefined>(
    column.filterValue?.[0] ? new Date(column.filterValue?.[0]) : undefined,
  );
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onFromChange = React.useCallback((date?: Date) => {
    setFrom((prevDate) => {
      if (prevDate || !date) {
        return date;
      }
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0,
        0,
      );
    });
  }, []);

  const [to, setTo] = React.useState<Date | undefined>(
    column.filterValue?.[1] ? new Date(column.filterValue?.[1]) : undefined,
  );

  const onToChange = React.useCallback((date?: Date) => {
    setTo((prevDate) => {
      if (prevDate || !date) {
        return date;
      }
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59,
        999,
      );
    });
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey) {
      return;
    }

    if (event.key === 'Enter') {
      setFilter([from, to]);
    }
  };

  return (
    <BaseFilter>
      <DatePickerInput
        ref={inputRef}
        label={translatedStrings.from}
        date={from}
        onChange={onFromChange}
        formatDate={formatDate}
        parseInput={parseInput}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        selectedDate={to}
        isFromOrTo='from'
        localizedNames={translatedStrings.datePicker}
        showYearSelection={showYearSelection}
      />
      <DatePickerInput
        label={translatedStrings.to}
        date={to}
        onChange={onToChange}
        formatDate={formatDate}
        parseInput={parseInput}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        selectedDate={from}
        isFromOrTo='to'
        localizedNames={translatedStrings.datePicker}
        showYearSelection={showYearSelection}
      />
      <FilterButtonBar
        setFilter={() => setFilter([from, to])}
        clearFilter={clearFilter}
        translatedLabels={translatedLabels}
      />
    </BaseFilter>
  );
};
