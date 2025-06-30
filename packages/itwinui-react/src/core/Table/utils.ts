/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type {
  ColumnInstance,
  TableInstance,
} from '../../react-table/react-table.js';

export const getCellStyle = <T extends Record<string, unknown>>(
  column: ColumnInstance<T>,
  isTableResizing: boolean,
): React.CSSProperties | undefined => {
  const style = {} as React.CSSProperties;
  style.flex = `1 1 145px`;
  if (column.width) {
    const width =
      typeof column.width === 'string' ? column.width : `${column.width}px`;
    style.width = width;
    // This allows flexbox to handle the width of the column on table resize
    if (isTableResizing && column.canResize) {
      style.flex = `${Number(column.width)} ${Number(column.width)} ${width}`;
    } else {
      style.flex = `0 0 ${width}`;
    }
  }
  if (column.maxWidth) {
    style.maxWidth = `${column.maxWidth}px`;
  }
  if (column.minWidth) {
    style.minWidth = `${column.minWidth}px`;
  }
  return style;
};

export const getStickyStyle = <T extends Record<string, unknown>>(
  column: ColumnInstance<T>,
  columnList: ColumnInstance<T>[],
): React.CSSProperties => {
  if (!column.sticky) {
    return {};
  }

  let left = 0;
  for (const col of columnList) {
    if (col.id === column.id) {
      break;
    }
    left += Number(col.width || col.resizeWidth || 0);
  }

  let right = 0;
  for (const col of [...columnList].reverse()) {
    if (col.id === column.id) {
      break;
    }
    right += Number(col.width || col.resizeWidth || 0);
  }

  return {
    '--iui-table-sticky-left':
      column.sticky === 'left' ? `${left}px` : undefined,
    '--iui-table-sticky-right':
      column.sticky === 'right' ? `${right}px` : undefined,
  } as React.CSSProperties;
};

export const getSubRowStyle = ({ density = 'default', depth = 1 }) => {
  let cellPadding = 16;
  let expanderMargin = 8;

  if (density === 'condensed') {
    cellPadding = 12;
    expanderMargin = 4;
  } else if (density === 'extra-condensed') {
    cellPadding = 8;
    expanderMargin = 4;
  }

  const multiplier = 26 + expanderMargin; // 26 = expander width

  return {
    paddingInlineStart: cellPadding + depth * multiplier,
  } satisfies React.CSSProperties;
};

export const calculateStickyColsWidth = <T extends Record<string, unknown>>(
  headers: ColumnInstance<T>[],
  columnRefs?: React.RefObject<Record<string, HTMLDivElement>>,
) => {
  let stickyColsWidth = 0;
  for (const header of headers) {
    const colWidth =
      columnRefs && columnRefs.current[header.id]
        ? columnRefs.current[header.id].getBoundingClientRect().width
        : getHeaderWidth(header);
    stickyColsWidth +=
      header.originalSticky !== 'none' || header.sticky ? colWidth : 0;
  }
  return stickyColsWidth;
};

export const getHeaderWidth = <T extends Record<string, unknown>>(
  header: ColumnInstance<T>,
) => {
  if (!header) {
    return 0;
  }

  // `header.width` can be a string if the user specifies it in the column definition,
  // but then becomes a number (pixels) when the user resizes the column, or when the table is resized, etc.
  // So if `header.width` is ever a string that cannot be converted to a number, we shouldn't use `header.width`.
  return typeof header.width === 'string' && Number.isNaN(Number(header.width))
    ? Number(header.resizeWidth || 0)
    : Number(header.width || header.resizeWidth || 0);
};

export const TableInstanceContext = React.createContext<
  TableInstance<Record<string, unknown>> | undefined
>(undefined);
