/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box } from '../../utils/index.js';
import type { ColumnInstance, HeaderGroup, TableKeyedProps } from 'react-table';
import { SELECTION_CELL_ID } from './columns/index.js';
import { getCellStyle, getSubRowStyle, getStickyStyle } from './utils.js';
import cx from 'classnames';

type ColumnHeaderProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = TableKeyedProps & {
  columnRefs: React.MutableRefObject<Record<string, HTMLDivElement>>;
  column: HeaderGroup<T>;
  index: number;
  hasAnySubRows: boolean;
  headers: HeaderGroup<T>[];
  columnMinWidths: { default: number; withExpander: number };
  isTableResizing: boolean | undefined;
  density: string | undefined;
  visibleColumns: ColumnInstance<T>[];
  isHeaderDirectClick: React.MutableRefObject<boolean>;
  showSortButton: (column: HeaderGroup<T>) => boolean;
  children: React.ReactNode;
};

export const ColumnHeader = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  props: ColumnHeaderProps<T>,
): JSX.Element => {
  const {
    columnRefs,
    column,
    isHeaderDirectClick,
    index,
    hasAnySubRows,
    headers,
    columnMinWidths,
    isTableResizing,
    density,
    visibleColumns,
    showSortButton,
    children,
    ...rest
  } = props;

  const { onClick, ...restSortProps } = column.getSortByToggleProps();

  const columnHasExpanders =
    hasAnySubRows &&
    index ===
      headers.findIndex(
        (c) => c.id !== SELECTION_CELL_ID, // first non-selection column is the expander column
      );

  if ([undefined, 0].includes(column.minWidth)) {
    // override "undefined" or zero min-width with default value
    column.minWidth = columnHasExpanders
      ? columnMinWidths.withExpander
      : columnMinWidths.default;

    // set the minWidth to the user provided width instead if the width is less than the default minWidth
    if (typeof column.width === 'number' && column.minWidth > column.width) {
      column.minWidth = column.width;
    }
  }

  const columnProps = column.getHeaderProps({
    ...restSortProps,
    className: cx(
      'iui-table-cell',
      {
        'iui-actionable': column.canSort,
        'iui-sorted': column.isSorted,
        'iui-table-cell-sticky': !!column.sticky,
      },
      column.columnClassName,
    ),
    style: {
      ...getCellStyle(column, !!isTableResizing),
      ...(columnHasExpanders && getSubRowStyle({ density })),
      ...getStickyStyle(column, visibleColumns),
      flexWrap: 'wrap',
      columnGap: 'var(--iui-size-xs)',
    },
  });

  return (
    <Box
      {...columnProps}
      {...rest}
      key={columnProps.key}
      title={undefined}
      ref={React.useCallback(
        (el: HTMLDivElement) => {
          if (el) {
            columnRefs.current[column.id] = el;
            column.resizeWidth = el.getBoundingClientRect().width;
          }
        },
        [column, columnRefs],
      )}
      onMouseDown={() => {
        isHeaderDirectClick.current = true;
      }}
      onClick={(e) => {
        // Prevents from triggering sort when resizing and mouse is released in the middle of header
        if (isHeaderDirectClick.current) {
          onClick?.(e);
          isHeaderDirectClick.current = false;
        }
      }}
      tabIndex={showSortButton(column) ? 0 : undefined}
      onKeyDown={(e) => {
        if (e.key == 'Enter' && showSortButton(column)) {
          column.toggleSortBy();
        }
      }}
    >
      {children}
    </Box>
  );
};
