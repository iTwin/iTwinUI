/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ActionType, Row, TableInstance, TableState } from 'react-table';

/**
 * Handles subrow selection and validation.
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

  const newSelectedRowIds = {} as Record<string, boolean>;

  const handleRow = (row: Row<T>) => {
    if (isRowDisabled?.(row.original)) {
      return false;
    }

    let isAllSubSelected = true;
    row.initialSubRows.forEach((subRow) => {
      const result = handleRow(subRow);
      if (!result) {
        isAllSubSelected = false;
      }
    });

    // If `selectSubRows` is false, then no need to select sub-rows and just check current selection state.
    // If a row doesn't have sub-rows then check its selection state.
    // If it has sub-rows then check whether all of them are selected.
    if (
      (!instance.selectSubRows && newState.selectedRowIds[row.id]) ||
      (!row.initialSubRows.length && newState.selectedRowIds[row.id]) ||
      (row.initialSubRows.length && isAllSubSelected)
    ) {
      newSelectedRowIds[row.id] = true;
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

  // If ctrl + shift click, do not lose previous selection
  // If shift click, start new selection
  const selectedRowIds: Record<string, boolean> = !!action.ctrlPressed
    ? state.selectedRowIds
    : {};

  // 1. Select all rows between start and end
  instance.flatRows
    .slice(startIndex, endIndex + 1)
    .forEach((r) => (selectedRowIds[r.id] = true));

  // 2. Select all children of the last row (endIndex)
  // Since lastRow's children come after endIndex + 1 (not selected in step 1)
  const handleRow = (row: Row<T>) => {
    selectedRowIds[row.id] = true;
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
