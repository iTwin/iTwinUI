/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IdType, Row } from 'react-table';

const isValidDate = (date: Date | undefined) =>
  !!date && !isNaN(date.valueOf());

/**
 * Filters dates.
 * @param rows Table rows
 * @param ids Property names of data object to use for filtering
 * @param filterValue Filter value
 * @returns Filtered rows
 */
const betweenDate = <T extends Record<string, unknown>>(
  rows: Row<T>[],
  ids: IdType<T>[],
  filterValue: [Date?, Date?] | undefined,
) => {
  const [min, max] = filterValue || [];

  const MAX_DATE_VALUE = 8640000000000000;
  const minValue = (isValidDate(min) ? min : new Date(-MAX_DATE_VALUE)) as Date;
  const maxValue = (isValidDate(max) ? max : new Date(MAX_DATE_VALUE)) as Date;

  return rows.filter((row) => {
    return ids.some((id) => {
      const rowValue = row.values[id] as Date;
      return (
        rowValue.valueOf() >= minValue.valueOf() &&
        rowValue.valueOf() <= maxValue.valueOf()
      );
    });
  });
};

/**
 * Filter is not being set if filter value is invalid.
 */
betweenDate.autoRemove = (val: [Date?, Date?] | undefined) => {
  return !val || (!isValidDate(val[0]) && !isValidDate(val[1]));
};

export const customFilterFunctions = {
  betweenDate,
};
