/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { Row } from '../../../react-table/react-table.js';
import type { TableProps } from '../Table.js';

type ScrollToRow<T extends Record<string, unknown>> = {
  scrollToIndex: number | undefined;
  tableRowRef: (row: Row<T>) => (element: HTMLDivElement) => void;
};

type ScrollToRowProps<T extends Record<string, unknown>> = TableProps<T> & {
  page: Row<T>[];
  tableRef: React.RefObject<HTMLDivElement>;
};

export function useScrollToRow<T extends Record<string, unknown>>({
  data,
  enableVirtualization,
  page,
  paginatorRenderer,
  scrollToRow,
  tableRef,
}: ScrollToRowProps<T>): ScrollToRow<T> {
  const rowRefs = React.useRef<Record<string, HTMLDivElement>>({});

  // Refs prevents from having `page` and `data` as dependencies
  // therefore we avoid unnecessary scroll to row.
  const pageRef = React.useRef<Row<T>[]>(page);
  pageRef.current = page;
  const dataRef = React.useRef<T[]>(data);
  dataRef.current = data;

  // For virtualized tables, all we need to do is pass the index of the item
  // to the useVirtualScroll hook
  const scrollToIndex = React.useMemo((): number | undefined => {
    if (!scrollToRow || paginatorRenderer) {
      return undefined;
    }

    const index = scrollToRow(pageRef.current, dataRef.current);
    return index < 0 ? undefined : index;
  }, [paginatorRenderer, scrollToRow]);

  // For non-virtualized tables, we need to add a ref to each row
  // and scroll to the element
  React.useEffect(() => {
    if (
      enableVirtualization ||
      scrollToIndex === undefined ||
      scrollToIndex === null ||
      scrollToIndex < 0
    ) {
      return;
    }

    // Fallback in case the tableRef is not scrollable
    rowRefs.current[pageRef.current[scrollToIndex]?.id]?.scrollIntoView();

    // If the table is scrollable, scroll to the row without being overlapped by the header
    setTimeout(() => {
      tableRef.current?.scrollTo({
        top: rowRefs.current[pageRef.current[scrollToIndex]?.id]?.offsetTop,
      });
    });
  }, [enableVirtualization, scrollToIndex, tableRef]);

  const tableRowRef = React.useCallback((row: Row<T>) => {
    return (element: HTMLDivElement) => {
      rowRefs.current[row.id] = element;
    };
  }, []);

  return { scrollToIndex, tableRowRef };
}
