/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Hooks, IdType, Row, TableInstance } from 'react-table';
import { defaultFilterFunctions } from '../filters/defaultFilterFunctions';

export const useSubRowFiltering =
  <T extends Record<string, unknown>>(hasAnySubRows: boolean) =>
  (hooks: Hooks<T>) => {
    hooks.useInstance.push(useInstance.bind({}, hasAnySubRows));
  };

const useInstance = <T extends Record<string, unknown>>(
  hasAnySubRows: boolean,
  instance: TableInstance<T>,
) => {
  // There is a bug in react-table that filtered out sub-rows won't be shown after clearing the filter.
  // Therefore saving original sub-rows separately.
  // Related issue: https://github.com/tannerlinsley/react-table/issues/2928
  const setInitialSubRows = (rows: Row<T>[]) => {
    rows.forEach((row) => {
      if (!row.initialSubRows) {
        row.initialSubRows = row.subRows;
      }
      setInitialSubRows(row.subRows);
    });
  };
  setInitialSubRows(instance.initialRows);

  const {
    filteredRows = instance.filteredRows,
    filteredFlatRows = instance.filteredFlatRows,
    filteredRowsById = instance.filteredRowsById,
  } = React.useMemo(() => {
    if (!hasAnySubRows) {
      return {};
    }

    // Restore original sub-rows
    const setSubRows = (rows: Row<T>[]) => {
      rows.forEach((row) => {
        row.subRows = row.initialSubRows ?? [];
        setSubRows(row.subRows);
      });
    };
    setSubRows(instance.initialRows);

    let currentlyFilteredRows = [...instance.initialRows];

    instance.state.filters.forEach(({ id: columnId, value: filterValue }) => {
      const column = instance.allColumns.find((c) => c.id === columnId);
      if (!column) {
        return;
      }

      const filterTypes: Record<
        string,
        (
          rows: Row<T>[],
          columnIds: IdType<T>[],
          filterValue: unknown,
        ) => Row<T>[]
      > = {
        ...defaultFilterFunctions,
        ...instance.filterTypes,
      };
      const filterFn =
        typeof column.filter === 'function'
          ? column.filter
          : filterTypes[column.filter ?? 'text'];

      currentlyFilteredRows = currentlyFilteredRows.filter((row) =>
        handleRowFiltering(row, filterFn, columnId, filterValue),
      );
    });

    const filteredRows: Row<T>[] = [];
    const filteredFlatRows: Row<T>[] = [];
    const filteredRowsById: Record<string, Row<T>> = {};

    // Setting rows here helps to keep them ordered.
    const populateRows = (row: Row<T>) => {
      if (row.depth === 0) {
        filteredRows.push(row);
      }
      filteredFlatRows.push(row);
      filteredRowsById[row.id] = row;
      if (row.subRows.length) {
        row.subRows.forEach((r) => populateRows(r));
      }
    };
    currentlyFilteredRows.forEach((row) => populateRows(row));

    return { filteredRows, filteredFlatRows, filteredRowsById };
  }, [
    instance.allColumns,
    instance.filterTypes,
    instance.initialRows,
    instance.state.filters,
    hasAnySubRows,
  ]);

  Object.assign(instance, {
    filteredRows,
    filteredFlatRows,
    filteredRowsById,
    rows: filteredRows,
    flatRows: filteredFlatRows,
    rowsById: filteredRowsById,
  });
};

const handleRowFiltering = <T extends Record<string, unknown>>(
  row: Row<T>,
  filterFn: (
    rows: Row<T>[],
    columnIds: IdType<T>[],
    filterValue: unknown,
  ) => Row<T>[],
  columnId: IdType<T>,
  filterValue: unknown,
): boolean => {
  let hasFilteredSubRows = false;
  row.subRows = row.initialSubRows.filter((subRow) => {
    const result = handleRowFiltering(subRow, filterFn, columnId, filterValue);
    if (result) {
      hasFilteredSubRows = true;
    }
    return result;
  });

  // If row has any sub-rows that meet filter conditions,
  // then that row also needs to be shown.
  if (hasFilteredSubRows) {
    return true;
  }

  const result = filterFn([row], [columnId], filterValue);
  return !!result.length;
};
