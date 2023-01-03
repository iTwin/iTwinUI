/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ActionType, TableState } from 'react-table';

export const onTableResizeStart = <T extends Record<string, unknown>>(
  state: TableState<T>,
) => {
  return { ...state, isTableResizing: true };
};
export const onTableResizeEnd = <T extends Record<string, unknown>>(
  state: TableState<T>,
  action: ActionType,
) => {
  return {
    ...state,
    isTableResizing: false,
    columnResizing: {
      ...state.columnResizing,
      columnWidths: {
        ...action.columnWidths,
      },
    },
  };
};
