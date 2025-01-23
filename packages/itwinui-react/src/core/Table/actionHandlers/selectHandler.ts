/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type {
  ActionType,
  Row,
  TableInstance,
  TableState,
  IdType,
} from '../../../react-table/react-table.js';
import { iuiId } from '../Table.js';

/**
 * Handles subrow selection and validation.
 * - Calls onSelect() with selected data
 * - Subrow selection: Selecting a row and calling this method automatically selects all the subrows that can be selected
 * - Validation: Ensures that any disabled/unselectable row/subrow is not selected
 */
const onSelectHandler = <T extends Record<string, unknown>>(
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

  const newSelectedRowIds = {} as Record<IdType<T>, boolean>;

  const handleRow = (row: Row<T>) => {
    if (isRowDisabled?.(row.original)) {
      return false;
    }

    // In case when sub-rows are not present but sub-components are,
    // the length of sub-rows for each row is 1 (because a sub-component is a sub-row).
    // Therefore, we also need to check for sub-components whenever checking for sub-rows.
    const hasSubComponents = !!row.initialSubRows[0]?.original[iuiId as any];
    const hasSubRows = row.subRows.length > 0 && !hasSubComponents;
    let isAllSubSelected = true;

    if (hasSubRows) {
      row.initialSubRows.forEach((subRow) => {
        const result = handleRow(subRow);
        if (!result) {
          isAllSubSelected = false;
        }
      });
    }

    // A row is considered selected if it satisfies one of the following:
    // - Case 1: If the row is directly selected, AND one of the following:
    //   + `selectSubRows` is false, OR
    //   + the row has no sub-rows.
    // - Case 2: If the row is not directly selected,
    // check if it has sub-rows and all of them are selected.

    const isRowSelected = newState.selectedRowIds[row.id];
    const case1 = isRowSelected && (!instance.selectSubRows || !hasSubRows);
    const case2 = hasSubRows && isAllSubSelected;

    if (case1 || case2) {
      newSelectedRowIds[row.id as IdType<T>] = true;
    }

    return !!newSelectedRowIds[row.id];
  };
  instance.initialRows.forEach((row) => handleRow(row));

  const selectedData = getSelectedData(newSelectedRowIds, instance);

  newState.selectedRowIds = newSelectedRowIds;
  onSelect?.(selectedData, newState);
};

/**
 * Handles selection when toggling a row (Ctrl click or checkbox click)
 */
export const onToggleHandler = <T extends Record<string, unknown>>(
  newState: TableState<T>,
  action: ActionType,
  instance?: TableInstance<T>,
  onSelect?: (
    selectedData: T[] | undefined,
    tableState?: TableState<T>,
  ) => void,
  isRowDisabled?: (rowData: T) => boolean,
) => {
  onSelectHandler(newState, instance, onSelect, isRowDisabled);

  // Toggling a row (ctrl click or checkbox click) updates the lastSelectedRowId
  newState.lastSelectedRowId = action.id;
};

/**
 * Handles selection when clicked on a row.
 */
export const onSingleSelectHandler = <T extends Record<string, unknown>>(
  state: TableState<T>,
  action: ActionType,
  instance?: TableInstance<T>,
  onSelect?: (
    selectedData: T[] | undefined,
    tableState?: TableState<T>,
  ) => void,
  isRowDisabled?: (rowData: T) => boolean,
) => {
  const selectedRowIds = { [action.id]: true } as Record<string, boolean>;
  if (instance?.selectSubRows) {
    const handleRow = (row: Row<T>) => {
      selectedRowIds[row.id] = true;
      row.subRows.forEach((r) => handleRow(r));
    };
    handleRow(instance.rowsById[action.id]);
  }

  const newState = {
    ...state,
    lastSelectedRowId: action.id,
    selectedRowIds,
  };
  // Passing to `onSelectHandler` to handle filtered sub-rows
  onSelectHandler(newState, instance, onSelect, isRowDisabled);

  return newState;
};

/**
 * Handles selection when clicked on a row while shift key is pressed.
 */
export const onShiftSelectHandler = <T extends Record<string, unknown>>(
  state: TableState<T>,
  action: ActionType,
  instance?: TableInstance<T>,
  onSelect?: (
    selectedData: T[] | undefined,
    tableState?: TableState<T>,
  ) => void,
  isRowDisabled?: (rowData: T) => boolean,
) => {
  if (instance == null) {
    return state;
  }

  let startIndex = Math.max(
    0,
    instance.flatRows.findIndex((row) => row.id === state.lastSelectedRowId),
  );
  let endIndex = Math.max(
    0,
    instance.flatRows.findIndex((row) => row.id === action.id),
  );

  if (startIndex > endIndex) {
    const temp = startIndex;
    startIndex = endIndex;
    endIndex = temp;
  }

  const isLastSelectedRowIdSelected =
    state.lastSelectedRowId == null || // When no row is selected before shift click, start selecting from first row to clicked row
    !!state.selectedRowIds[state.lastSelectedRowId];

  // If ctrl + shift click, do not lose previous selection
  // If shift click, start new selection
  const selectedRowIds: Record<string, boolean> = !!action.ctrlPressed
    ? { ...state.selectedRowIds }
    : {};

  // 1. All rows between start and end are assigned the state of the last selected row
  instance.flatRows
    .slice(startIndex, endIndex + 1)
    .forEach((r) => (selectedRowIds[r.id] = isLastSelectedRowIdSelected));

  // 2. All children of the last row (endIndex) also are assigned the state of the last selected row
  // Since lastRow's children come after endIndex + 1 (not selected in step 1)
  const handleRow = (row: Row<T>) => {
    selectedRowIds[row.id] = isLastSelectedRowIdSelected;
    row.subRows.forEach((r) => handleRow(r));
  };
  handleRow(instance.flatRows[endIndex]);

  const newState = {
    ...state,
    selectedRowIds,
  };

  // 3.1 Deselect all selected disabled rows and their children
  // 3.2 Convert all partially selected rows marked with tick mark to horizontal line
  onSelectHandler(newState, instance, onSelect, isRowDisabled);

  return newState;
};

const getSelectedData = <T extends Record<string, unknown>>(
  selectedRowIds: Record<string, boolean>,
  instance?: TableInstance<T>,
) => {
  const selectedData: T[] = [];
  const setSelectedData = (row: Row<T>) => {
    if (selectedRowIds[row.id]) {
      selectedData.push(row.original);
    }
    row.initialSubRows.forEach((subRow) => setSelectedData(subRow));
  };
  instance?.initialRows.forEach((row) => setSelectedData(row));

  return selectedData;
};
