/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { Row, TableRowProps, TableState } from 'react-table';
import { useIntersection } from '../utils/hooks/useIntersection';
import { getCellStyle } from './utils';
import { CSSTransition } from 'react-transition-group';

/**
 * Memorization is needed to avoid unnecessary re-renders of all rows when additional data is added when lazy-loading.
 * Using `isLast` here instead of passing data length to avoid re-renders of all rows when more data is added. Now only the last row re-renders.
 * Although state is not used it is needed for `React.memo` to check state that changes row state e.g. selection.
 * When adding new features check whether it changes state that affects row. If it does then add equality check to `React.memo`.
 */
const TableRow = <T extends Record<string, unknown>>(props: {
  row: Row<T>;
  rowProps: TableRowProps;
  isLast: boolean;
  onRowInViewport: React.MutableRefObject<((rowData: T) => void) | undefined>;
  onBottomReached: React.MutableRefObject<(() => void) | undefined>;
  intersectionMargin: number;
  state: TableState<T>; // Needed for explicitly checking selection changes
  subComponent?: (row: Row<T>) => React.ReactNode;
}) => {
  const {
    row,
    rowProps,
    isLast,
    onRowInViewport,
    onBottomReached,
    intersectionMargin,
    subComponent,
  } = props;

  const onIntersect = React.useCallback(() => {
    onRowInViewport.current?.(row.original);
    isLast && onBottomReached.current?.();
  }, [isLast, onBottomReached, onRowInViewport, row.original]);

  const rowRef = useIntersection(onIntersect, {
    rootMargin: `${intersectionMargin}px`,
  });

  const expandedHeight = React.useRef(0);

  return (
    <>
      <div {...rowProps} ref={rowRef}>
        {row.cells.map((cell) => {
          const cellProps = cell.getCellProps({
            className: cx('iui-cell', cell.column.cellClassName),
            style: getCellStyle(cell.column),
          });
          return (
            <div {...cellProps} key={cellProps.key}>
              {cell.render('Cell')}
            </div>
          );
        })}
      </div>
      {subComponent && (
        <CSSTransition
          in={row.isExpanded}
          timeout={200}
          unmountOnExit={true}
          onEnter={(node) => (node.style.height = `0px`)}
          onEntering={(node) =>
            (node.style.height = `${expandedHeight.current}px`)
          }
          onEntered={(node) => (node.style.height = 'auto')}
          onExit={(node) => (node.style.height = `${expandedHeight.current}px`)}
          onExiting={(node) => (node.style.height = `0px`)}
          classNames='iui'
        >
          {
            <div
              className='iui-row iui-expanded-content'
              ref={(ref) => {
                if (ref) {
                  expandedHeight.current = ref.offsetHeight;
                }
              }}
            >
              {subComponent(row)}
            </div>
          }
        </CSSTransition>
      )}
    </>
  );
};

export const TableRowMemoized = React.memo(
  TableRow,
  (prevProp, nextProp) =>
    prevProp.isLast === nextProp.isLast &&
    prevProp.onRowInViewport === nextProp.onRowInViewport &&
    prevProp.onBottomReached === nextProp.onBottomReached &&
    prevProp.row.original === nextProp.row.original &&
    prevProp.state.selectedRowIds?.[prevProp.row.id] ===
      nextProp.state.selectedRowIds?.[nextProp.row.id] &&
    prevProp.state.expanded?.[prevProp.row.id] ===
      nextProp.state.expanded?.[nextProp.row.id] &&
    prevProp.subComponent === nextProp.subComponent &&
    prevProp.row.cells.every(
      (cell, index) => nextProp.row.cells[index].column === cell.column,
    ),
) as typeof TableRow;
