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
import { LabeledInput } from '../../../LabeledInput';

export type NumberRangeTranslation = {
  from: string;
  to: string;
};

const defaultStrings: NumberRangeTranslation = {
  from: 'From',
  to: 'To',
};

export type NumberRangeFilterProps<T extends Record<string, unknown>> =
  TableFilterProps<T> & {
    translatedLabels?: NumberRangeTranslation & FilterButtonBarTranslation;
  };

export const NumberRangeFilter = <T extends Record<string, unknown>>(
  props: NumberRangeFilterProps<T>,
) => {
  const { column, translatedLabels, setFilter, clearFilter } = props;

  useTheme();

  const translatedStrings = { ...defaultStrings, ...translatedLabels };

  const [from, setFrom] = React.useState<string | undefined>(
    column.filterValue?.[0] ?? '',
  );
  const [to, setTo] = React.useState<string | undefined>(
    column.filterValue?.[1] ?? '',
  );

  const parseInputValue = (value: string | undefined) => {
    return !value || isNaN(Number(value)) ? undefined : Number(value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      setFilter([parseInputValue(from), parseInputValue(to)]);
    }
  };

  return (
    <BaseFilter>
      <LabeledInput
        label={translatedStrings.from}
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        onKeyDown={onKeyDown}
        type='number'
        displayStyle='inline'
        setFocus
      />
      <LabeledInput
        label={translatedStrings.to}
        value={to}
        onChange={(e) => setTo(e.target.value)}
        type='number'
        displayStyle='inline'
        onKeyDown={onKeyDown}
      />
      <FilterButtonBar
        setFilter={() =>
          setFilter([parseInputValue(from), parseInputValue(to)])
        }
        clearFilter={clearFilter}
        translatedLabels={translatedLabels}
      />
    </BaseFilter>
  );
};
