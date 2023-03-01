/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Cell, CellProps, CellRendererProps, TableInstance } from 'react-table';
import cx from 'classnames';
import { getCellStyle, getStickyStyle } from './utils';
import { SubRowExpander } from './SubRowExpander';
import { SELECTION_CELL_ID } from './columns';
import { DefaultCell } from './cells';

export type TableCellProps<T extends Record<string, unknown>> = {
  cell: Cell<T>;
  cellIndex: number;
  isDisabled: boolean;
  tableHasSubRows: boolean;
  tableInstance: TableInstance<T>;
  expanderCell?: (cellProps: CellProps<T>) => React.ReactNode;
  density?: 'default' | 'condensed' | 'extra-condensed';
};

export const TableCell = <T extends Record<string, unknown>>(
  props: TableCellProps<T>,
) => {
  const {
    cell,
    cellIndex,
    isDisabled,
    tableHasSubRows,
    tableInstance,
    expanderCell,
    density,
  } = props;

  const hasSubRowExpander =
    cellIndex ===
    cell.row.cells.findIndex((c) => c.column.id !== SELECTION_CELL_ID);

  const getSubRowStyle = (): React.CSSProperties | undefined => {
    if (!tableHasSubRows || !hasSubRowExpander) {
      return undefined;
    }
    // If it doesn't have sub-rows then shift by another level to align with expandable rows on the same depth
    const dynamicMargin = cell.row.depth + (cell.row.canExpand ? 0 : 1);

    let cellPadding = 16;
    let expanderMargin = 8;

    if (density === 'condensed') {
      cellPadding = 12;
      expanderMargin = 8;
    } else if (density === 'extra-condensed') {
      cellPadding = 8;
      expanderMargin = 8;
    }

    const multiplier = 26 + expanderMargin; // 26 = expander width

    return {
      paddingLeft: cellPadding + dynamicMargin * multiplier,
    };
  };

  const cellElementProps = cell.getCellProps({
    className: cx('iui-table-cell', cell.column.cellClassName, {
      'iui-table-cell-sticky': !!cell.column.sticky,
    }),
    style: {
      ...getCellStyle(cell.column, !!tableInstance.state.isTableResizing),
      ...getSubRowStyle(),
      ...getStickyStyle(cell.column, tableInstance.visibleColumns),
    },
  });

  const cellProps: CellProps<T> = {
    ...tableInstance,
    ...{ cell, row: cell.row, value: cell.value, column: cell.column },
  };

  const cellContent = (
    <>
      {tableHasSubRows && hasSubRowExpander && cell.row.canExpand && (
        <SubRowExpander
          cell={cell}
          isDisabled={isDisabled}
          cellProps={cellProps}
          expanderCell={expanderCell}
          density={density}
        />
      )}
      {cell.render('Cell')}
    </>
  );

  const cellRendererProps: CellRendererProps<T> = {
    cellElementProps,
    cellProps,
    children: (
      <>
        {cellContent}
        {cell.column.sticky === 'left' &&
          tableInstance.state.sticky.isScrolledToRight && (
            <div className='iui-table-cell-shadow-right' />
          )}
        {cell.column.sticky === 'right' &&
          tableInstance.state.sticky.isScrolledToLeft && (
            <div className='iui-table-cell-shadow-left' />
          )}
      </>
    ),
  };

  return (
    <>
      {cell.column.cellRenderer ? (
        cell.column.cellRenderer({
          ...cellRendererProps,
          isDisabled: () => isDisabled,
        })
      ) : (
        <DefaultCell {...cellRendererProps} isDisabled={() => isDisabled} />
      )}
    </>
  );
};

export default TableCell;
