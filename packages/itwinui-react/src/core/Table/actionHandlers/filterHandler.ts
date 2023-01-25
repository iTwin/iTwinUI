/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ActionType, TableInstance, TableState } from 'react-table';
import { TableFilterValue } from '../filters';

export const onFilterHandler = <T extends Record<string, unknown>>(
  newState: TableState<T>,
  action: ActionType,
  previousState: TableState<T>,
  currentFilter: TableFilterValue<T>[],
  instance?: TableInstance<T>,
) => {
  const previousFilter = previousState.filters.find(
    (f) => f.id === action.columnId,
  );

  if (previousFilter?.value != action.filterValue) {
    const filters = newState.filters.map((f) => {
      const column = instance?.allColumns.find((c) => c.id === f.id);
      return {
        id: f.id,
        value: f.value,
        fieldType: column?.fieldType ?? 'text',
        filterType: column?.filter ?? 'text',
      };
    }) as TableFilterValue<T>[];
    return filters;
  }
  return currentFilter;
};
