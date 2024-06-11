/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type {
  ColumnInstance,
  Hooks,
} from '../../../react-table/react-table.js';
import { SelectionColumn, SELECTION_CELL_ID } from '../columns/index.js';

export const useSelectionCell =
  <T extends Record<string, unknown>>(
    isSelectable: boolean,
    selectionMode: 'multi' | 'single',
    isRowDisabled?: (rowData: T) => boolean,
    density: 'default' | 'condensed' | 'extra-condensed' = 'default',
  ) =>
  (hooks: Hooks<T>) => {
    if (!isSelectable) {
      return;
    }

    hooks.allColumns.push((columns: ColumnInstance<T>[]) =>
      selectionMode === 'single' ||
      columns.find((c) => c.id === SELECTION_CELL_ID)
        ? columns
        : [
            SelectionColumn({ isDisabled: isRowDisabled, density: density }),
            ...columns,
          ],
    );
  };
