/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useTheme } from '../../../utils';
import {
  FilterButtonBar,
  FilterButtonBarTranslation,
} from '../FilterButtonBar';
import { BaseFilter } from '../BaseFilter';
import { TableFilterProps } from '../types';
import '@itwin/itwinui-css/css/table.css';
import DatePickerInput from './DatePickerInput';

export type DateRangeTranslation = {
  from: string;
  to: string;
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
  };

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
  } = props;

  useTheme();

  const translatedStrings = { ...defaultStrings, ...translatedLabels };

  const [from, setFrom] = React.useState<Date | undefined>(
    column.filterValue?.[0] ? new Date(column.filterValue?.[0]) : undefined,
  );
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
    if (event.key === 'Enter') {
      setFilter([from, to]);
    }
  };

  return (
    <BaseFilter>
      <DatePickerInput
        label={translatedStrings.from}
        date={from}
        onChange={onFromChange}
        formatDate={formatDate}
        parseInput={parseInput}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        setFocus
      />
      <DatePickerInput
        label={translatedStrings.to}
        date={to}
        onChange={onToChange}
        formatDate={formatDate}
        parseInput={parseInput}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
      <FilterButtonBar
        setFilter={() => setFilter([from, to])}
        clearFilter={clearFilter}
        translatedLabels={translatedLabels}
      />
    </BaseFilter>
  );
};
