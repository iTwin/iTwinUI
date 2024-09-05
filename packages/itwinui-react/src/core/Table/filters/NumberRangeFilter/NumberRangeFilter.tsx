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
import { LabeledInput } from '../../../LabeledInput/LabeledInput.js';

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

  useGlobals();

  const translatedStrings = { ...defaultStrings, ...translatedLabels };

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const [from, setFrom] = React.useState<string | undefined>(
    column.filterValue?.[0] ?? '',
  );
  const [to, setTo] = React.useState<string | undefined>(
    column.filterValue?.[1] ?? '',
  );

  const parseInputValue = (value: string | undefined) => {
    return !value || isNaN(Number(value)) ? undefined : Number(value);
  };

  return (
    <BaseFilter
      onSubmit={() => setFilter([parseInputValue(from), parseInputValue(to)])}
    >
      <LabeledInput
        ref={inputRef}
        label={translatedStrings.from}
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        type='number'
        displayStyle='inline'
      />
      <LabeledInput
        label={translatedStrings.to}
        value={to}
        onChange={(e) => setTo(e.target.value)}
        type='number'
        displayStyle='inline'
      />
      <FilterButtonBar
        clearFilter={clearFilter}
        translatedLabels={translatedLabels}
      />
    </BaseFilter>
  );
};
