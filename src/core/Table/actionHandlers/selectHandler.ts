/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { TableInstance, TableState } from 'react-table';

export const onSelectHandler = <T extends Record<string, unknown>>(
  newState: TableState<T>,
  instance?: TableInstance<T>,
  onSelect?: (
    selectedData: T[] | undefined,
    tableState?: TableState<T>,
  ) => void,
  isRowDisabled?: (rowData: T) => boolean,
) => {
  if (!instance?.rows.length) {
    onSelect?.([], newState);
    return;
  }

  const selectedData: T[] = [];
  const newSelectedRowIds = {} as Record<string, boolean>;
  instance.initialRows.forEach((row) => {
    if (newState.selectedRowIds[row.id] && !isRowDisabled?.(row.original)) {
      newSelectedRowIds[row.id] = true;
      selectedData.push(row.original);
    }
  });
  newState.selectedRowIds = newSelectedRowIds;
  onSelect?.(selectedData, newState);
};
