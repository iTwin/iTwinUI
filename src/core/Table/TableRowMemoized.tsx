/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { Row, TableState } from 'react-table';
import { useIntersection } from '../utils/hooks/useIntersection';
import { getCellStyle } from './utils';
import { CSSTransition } from 'react-transition-group';
import { useMergedRefs } from '../utils/hooks/useMergedRefs';

/**
 * Memoization is needed to avoid unnecessary re-renders of all rows when additional data is added when lazy-loading.
 * Using `isLast` here instead of passing data length to avoid re-renders of all rows when more data is added. Now only the last row re-renders.
 * Although state is not used it is needed for `React.memo` to check state that changes row state e.g. selection.
 * When adding new features check whether it changes state that affects row. If it does then add equality check to `React.memo`.
 */
const TableRow = <T extends Record<string, unknown>>(props: {
  row: Row<T>;
  rowProps?: (row: Row<T>) => React.ComponentPropsWithRef<'div'>;
  isLast: boolean;
  onRowInViewport: React.MutableRefObject<((rowData: T) => void) | undefined>;
  onBottomReached: React.MutableRefObject<(() => void) | undefined>;
  intersectionMargin: number;
  state: TableState<T>; // Needed for explicitly checking selection changes
  onClick?: (event: React.MouseEvent, row: Row<T>) => void;
  subComponent?: (row: Row<T>) => React.ReactNode;
  isDisabled: boolean;
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
  } = props;

  const onIntersect = React.useCallback(() => {
    onRowInViewport.current?.(row.original);
    isLast && onBottomReached.current?.();
  }, [isLast, onBottomReached, onRowInViewport, row.original]);

  const rowRef = useIntersection(onIntersect, {
    rootMargin: `${intersectionMargin}px`,
  });

  const expandedHeight = React.useRef(0);

  const userRowProps = rowProps?.(row);
  const mergedProps = {
    ...row.getRowProps(),
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
    prevProp.onClick === nextProp.onClick &&
    prevProp.row.original === nextProp.row.original &&
    prevProp.state.selectedRowIds?.[prevProp.row.id] ===
      nextProp.state.selectedRowIds?.[nextProp.row.id] &&
    prevProp.state.expanded?.[prevProp.row.id] ===
      nextProp.state.expanded?.[nextProp.row.id] &&
    prevProp.subComponent === nextProp.subComponent &&
    prevProp.row.cells.every(
      (cell, index) => nextProp.row.cells[index].column === cell.column,
    ) &&
    prevProp.isDisabled === nextProp.isDisabled &&
    prevProp.rowProps === nextProp.rowProps,
) as typeof TableRow;
