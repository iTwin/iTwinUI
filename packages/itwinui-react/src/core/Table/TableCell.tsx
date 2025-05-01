/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type {
  Cell,
  CellProps,
  CellRendererProps,
  TableInstance,
} from '../../react-table/react-table.js';
import cx from 'classnames';
import { getCellStyle, getStickyStyle, getSubRowStyle } from './utils.js';
import { SubRowExpander } from './SubRowExpander.js';
import { SELECTION_CELL_ID } from './columns/index.js';
import { DefaultCell } from './cells/index.js';
import { Box } from '../../utils/index.js';
import { DefaultCellIsCustomRenderer } from './cells/DefaultCell.js';

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

  const cellElementProps = cell.getCellProps({
    className: cx('iui-table-cell', cell.column.cellClassName, {
      'iui-table-cell-sticky': !!cell.column.sticky,
    }),
    style: {
      ...getCellStyle(cell.column, !!tableInstance.state.isTableResizing),
      ...(tableHasSubRows &&
        hasSubRowExpander &&
        getSubRowStyle({
          density,
          // If it doesn't have sub-rows then shift by another level to align with expandable rows on the same depth
          depth: cell.row.depth + (cell.row.canExpand ? 0 : 1),
        })),
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
          slot='start'
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
            <Box className='iui-table-cell-shadow-right' slot='shadows' />
          )}
        {cell.column.sticky === 'right' &&
          tableInstance.state.sticky.isScrolledToLeft && (
            <Box className='iui-table-cell-shadow-left' slot='shadows' />
          )}
      </>
    ),
  };

  return (
    <>
      {cell.column.cellRenderer ? (
        <DefaultCellIsCustomRenderer.Provider value={true}>
          {cell.column.cellRenderer({
            ...cellRendererProps,
            isDisabled: () => isDisabled,
          })}
        </DefaultCellIsCustomRenderer.Provider>
      ) : (
        <DefaultCell {...cellRendererProps} isDisabled={() => isDisabled} />
      )}
    </>
  );
};
