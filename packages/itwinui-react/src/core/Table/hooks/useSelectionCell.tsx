/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ColumnInstance, Hooks } from 'react-table';
import { SelectionColumn, SELECTION_CELL_ID } from '../columns';

export const useSelectionCell =
  <T extends Record<string, unknown>>(
    isSelectable: boolean,
    selectionMode: 'multi' | 'single',
    isRowDisabled?: (rowData: T) => boolean,
  ) =>
  (hooks: Hooks<T>) => {
    if (!isSelectable) {
      return;
    }

    hooks.allColumns.push((columns: ColumnInstance<T>[]) =>
      selectionMode === 'single' ||
      columns.find((c) => c.id === SELECTION_CELL_ID)
        ? columns
        : [SelectionColumn({ isDisabled: isRowDisabled }), ...columns],
    );
  };
