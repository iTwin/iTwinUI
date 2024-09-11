/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { Row, TableState } from '../../../react-table/react-table.js';

export const useSubComponentVirtualizing = <T extends Record<string, unknown>>(
  hasAnySubRows: boolean,
  page: Row<T>[],
  state: TableState<T>,
) => {
  const listOfRowsAndSubComponents = React.useMemo(() => {
    const rowsAndSubComponents = [];
    for (let i = 0; i < page.length; i++) {
      rowsAndSubComponents.push('row');
      if (!hasAnySubRows && state.expanded[page[i].id]) {
        rowsAndSubComponents.push('subcomponent');
      }
    }
    return rowsAndSubComponents;
  }, [page, state.expanded, hasAnySubRows]);

  const isARow = React.useCallback(
    (index: number) => {
      return listOfRowsAndSubComponents[index] === 'row';
    },
    [listOfRowsAndSubComponents],
  );

  /**
   * Returns index with respect to (page|virtualizer).
   * Index of subcomponent is retrieved from the current expanded main row subtracted by the number of expanded contents before.*/
  const getRowIndexFromVirtualizerIndex = React.useCallback(
    (index: number) => {
      let expandedRowsBefore = 0;
      for (let i = 0; i < index; i++) {
        if (listOfRowsAndSubComponents[i] === 'subcomponent') {
          expandedRowsBefore++;
        }
      }
      const rowIndex = index - expandedRowsBefore;
      if (isARow(index)) {
        return rowIndex;
      } else {
        return rowIndex - 1;
      }
    },
    [isARow, listOfRowsAndSubComponents],
  );

  return {
    listOfRowsAndSubComponents,
    getRowIndexFromVirtualizerIndex,
    isARow,
  };
};
