/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import {
  DateRangeFilter,
  DateRangeTranslation,
} from './DateRangeFilter/DateRangeFilter';
import { FilterButtonBarTranslation } from './FilterButtonBar';
import {
  NumberRangeTranslation,
  NumberRangeFilterProps,
  NumberRangeFilter,
} from './NumberRangeFilter/NumberRangeFilter';
import { TextFilter } from './TextFilter/TextFilter';
import { TableFilterProps } from './types';

export type DateRangeFilterOptions = {
  /**
   * Function that formats selected date into a `string` that is shown inside the input.
   */
  formatDate?: (date: Date) => string;
  /**
   * Function that parses user input string into a `Date`.
   * If string is invalid, return invalid `Date` object (`new Date('')`)
   * Recommended to use pattern matching in order to parse string when date is fully entered.
   */
  parseInput?: (text: string) => Date;
  /**
   * Placeholder shown in input field. It is recommended to show date format.
   */
  placeholder?: string;
  /**
   * Translated filter labels.
   */
  translatedLabels?: DateRangeTranslation & FilterButtonBarTranslation;
};

export const tableFilters = {
  /**
   * Basic filter with a single input field.
   * @param translatedLabels Translated filter labels.
   */
  TextFilter:
    (translatedLabels?: FilterButtonBarTranslation) =>
    <T extends Record<string, unknown>>(props: TableFilterProps<T>) =>
      <TextFilter {...props} translatedLabels={translatedLabels} />,
  /**
   * Date range filter.
   *
   * By default it handles user input in `en-us` date format. If you want to use other format
   * please provide `formatDate`, `parseInput` and `placeholder`.
   *
   * It only works with `Date` type object properties.
   * If your data is different type e.g. `string`, you can use `accessor` property in column description:
   * `accessor: (rowData) => new Date(rowData.date)`.
   */
  DateRangeFilter:
    (options?: DateRangeFilterOptions) =>
    <T extends Record<string, unknown>>(props: TableFilterProps<T>) =>
      <DateRangeFilter {...props} {...options} />,
  /**
   * Number range filter.
   *
   * It only works with `number` type object properties.
   * If your data is different type e.g. `string`, you can use `accessor` property in column description:
   * `accessor: (rowData) => Number(rowData.numberProp)`.
   * @param translatedLabels Translated filter labels.
   */
  NumberRangeFilter:
    (translatedLabels?: NumberRangeTranslation & FilterButtonBarTranslation) =>
    <T extends Record<string, unknown>>(props: NumberRangeFilterProps<T>) =>
      <NumberRangeFilter {...props} translatedLabels={translatedLabels} />,
};
