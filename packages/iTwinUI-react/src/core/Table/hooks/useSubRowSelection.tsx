/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Hooks, IdType, Row, TableInstance } from 'react-table';

export const useSubRowSelection = <T extends Record<string, unknown>>(
  hooks: Hooks<T>,
) => {
  hooks.useInstance.push(useInstance);
};

const useInstance = <T extends Record<string, unknown>>(
  instance: TableInstance<T>,
) => {
  const selectedFlatRows = React.useMemo(() => {
    const selectedFlatRows: Row<T>[] = [];
    const setSelectionState = (
      row: Row<T>,
      selectedRowIds: Record<IdType<T>, boolean>,
    ) => {
      let isSomeSubRowsSelected = false;
      row.subRows.forEach((subRow) => {
        setSelectionState(subRow, selectedRowIds);
        if (subRow.isSelected || subRow.isSomeSelected) {
          isSomeSubRowsSelected = true;
        }
      });

      if (selectedRowIds[row.id]) {
        row.isSelected = true;
        row.isSomeSelected = false;
        selectedFlatRows.push(row);
      } else {
        row.isSelected = false;
        row.isSomeSelected = isSomeSubRowsSelected;
      }
    };
    instance.rows.forEach((row) =>
      setSelectionState(row, instance.state.selectedRowIds),
    );
    return selectedFlatRows;
  }, [instance.rows, instance.state.selectedRowIds]);

  Object.assign(instance, {
    selectedFlatRows,
  });
};
