/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { CellProps, Row, TableInstance, TableState } from 'react-table';
import { useIntersection, useMergedRefs, WithCSSTransition } from '../utils';
import { TableCell } from './TableCell';

/**
 * Memoization is needed to avoid unnecessary re-renders of all rows when additional data is added when lazy-loading.
 * Using `isLast` here instead of passing data length to avoid re-renders of all rows when more data is added. Now only the last row re-renders.
 * Although state is not used it is needed for `React.memo` to check state that changes row state e.g. selection.
 * When adding new features check whether it changes state that affects row. If it does then add equality check to `React.memo`.
 */
export const TableRow = <T extends Record<string, unknown>>(props: {
  row: Row<T>;
  rowProps?: (row: Row<T>) => React.ComponentPropsWithRef<'div'>;
  isLast: boolean;
  onRowInViewport: React.MutableRefObject<((rowData: T) => void) | undefined>;
  onBottomReached: React.MutableRefObject<(() => void) | undefined>;
  intersectionMargin: number;
  state: TableState<T>; // Needed for explicitly checking selection and expansion changes
  onClick?: (event: React.MouseEvent, row: Row<T>) => void;
  subComponent?: (row: Row<T>) => React.ReactNode;
  isDisabled: boolean;
  tableHasSubRows: boolean;
  tableInstance: TableInstance<T>;
  expanderCell?: (cellProps: CellProps<T>) => React.ReactNode;
}) => {
  const {
    row,
    rowProps,
    isLast,
    onRowInViewport,
    onBottomReached,
    intersectionMargin,
    onClick,
    subComponent,
    isDisabled,
    tableHasSubRows,
    tableInstance,
    expanderCell,
  } = props;

  const onIntersect = React.useCallback(() => {
    onRowInViewport.current?.(row.original);
    isLast && onBottomReached.current?.();
  }, [isLast, onBottomReached, onRowInViewport, row.original]);

  const rowRef = useIntersection(onIntersect, {
    rootMargin: `${intersectionMargin}px`,
  });

  const userRowProps = rowProps?.(row);
  const mergedProps = {
    ...row.getRowProps({ style: { flex: `0 0 auto`, minWidth: '100%' } }),
    ...userRowProps,
    ...{
      className: cx(
        'iui-row',
        {
          'iui-selected': row.isSelected,
          'iui-row-expanded': row.isExpanded && subComponent,
          'iui-disabled': isDisabled,
        },
        userRowProps?.className,
      ),
    },
  };

  const refs = useMergedRefs(rowRef, mergedProps.ref);

  return (
    <>
      <div
        {...mergedProps}
        ref={refs}
        onClick={(event) => {
          mergedProps?.onClick?.(event);
          onClick?.(event, row);
        }}
      >
        {row.cells.map((cell, index) => {
          return (
            <TableCell
              key={cell.getCellProps().key}
              cell={cell}
              cellIndex={index}
              isDisabled={isDisabled}
              tableHasSubRows={tableHasSubRows}
              tableInstance={tableInstance}
              expanderCell={expanderCell}
            />
          );
        })}
      </div>
      {subComponent && (
        <WithCSSTransition in={row.isExpanded}>
          <div
            className={cx('iui-row', 'iui-expanded-content', {
              'iui-disabled': isDisabled,
            })}
          >
            {subComponent(row)}
          </div>
        </WithCSSTransition>
      )}
    </>
  );
};

const hasAnySelectedSubRow = <T extends Record<string, unknown>>(
  row: Row<T>,
  selectedRowIds?: Record<string, boolean>,
): boolean => {
  if (selectedRowIds?.[row.id]) {
    return true;
  }
  return row.subRows.some((subRow) =>
    hasAnySelectedSubRow(subRow, selectedRowIds),
  );
};

export const TableRowMemoized = React.memo(
  TableRow,
  (prevProp, nextProp) =>
    prevProp.isLast === nextProp.isLast &&
    prevProp.state.hiddenColumns?.length ===
      nextProp.state.hiddenColumns?.length &&
    !!prevProp.state.hiddenColumns?.every(
      (column, index) => nextProp.state.hiddenColumns?.[index] === column,
    ) &&
    prevProp.onRowInViewport === nextProp.onRowInViewport &&
    prevProp.onBottomReached === nextProp.onBottomReached &&
    prevProp.onClick === nextProp.onClick &&
    prevProp.row.original === nextProp.row.original &&
    prevProp.state.selectedRowIds?.[prevProp.row.id] ===
      nextProp.state.selectedRowIds?.[nextProp.row.id] &&
    // Check if sub-rows selection has changed and whether to show indeterminate state or not
    prevProp.row.subRows.some((subRow) =>
      hasAnySelectedSubRow(subRow, prevProp.state.selectedRowIds),
    ) ===
      nextProp.row.subRows.some((subRow) =>
        hasAnySelectedSubRow(subRow, nextProp.state.selectedRowIds),
      ) &&
    prevProp.state.expanded?.[prevProp.row.id] ===
      nextProp.state.expanded?.[nextProp.row.id] &&
    prevProp.subComponent === nextProp.subComponent &&
    prevProp.row.cells.every(
      (cell, index) => nextProp.row.cells[index].column === cell.column,
    ) &&
    prevProp.isDisabled === nextProp.isDisabled &&
    prevProp.rowProps === nextProp.rowProps &&
    prevProp.expanderCell === nextProp.expanderCell &&
    prevProp.tableHasSubRows === nextProp.tableHasSubRows &&
    prevProp.state.columnOrder === nextProp.state.columnOrder &&
    !nextProp.state.columnResizing.isResizingColumn &&
    prevProp.state.isTableResizing === nextProp.state.isTableResizing,
) as typeof TableRow;
