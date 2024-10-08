/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Box,
  ShadowRoot,
  LineClamp,
  SvgSortDown,
  SvgSortUp,
  useMergedRefs,
} from '../../utils/index.js';
import type {
  HeaderGroup,
  TableKeyedProps,
  TableInstance,
} from '../../react-table/react-table.js';
import { FilterToggle } from './filters/FilterToggle.js';
import { getCellStyle, getSubRowStyle, getStickyStyle } from './utils.js';
import cx from 'classnames';

type ColumnHeaderProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = TableKeyedProps & {
  column: HeaderGroup<T>;
  areFiltersSet: boolean;
  isResizable: boolean;
  columnResizeMode: 'fit' | 'expand';
  enableColumnReordering: boolean;
  density: string | undefined;
  columnHasExpanders: boolean;
  isLast: boolean;
  isTableEmpty: boolean;
  instance: TableInstance<T>;
};

export const ColumnHeader = React.forwardRef(
  <T extends Record<string, unknown> = Record<string, unknown>>(
    props: ColumnHeaderProps<T>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const {
      column,
      areFiltersSet,
      isResizable,
      columnResizeMode,
      enableColumnReordering,
      density,
      columnHasExpanders,
      isLast,
      isTableEmpty,
      instance,
      ...rest
    } = props;

    const isHeaderDirectClick = React.useRef(false);

    const COLUMN_MIN_WIDTHS = {
      default: 72,
      withExpander: 108, // expander column should be wider to accommodate the expander icon
    };

    const showFilterButton = (column: HeaderGroup<T>) =>
      (!isTableEmpty || areFiltersSet) && column.canFilter && !!column.Filter;

    const showSortButton = (column: HeaderGroup<T>) =>
      !isTableEmpty && column.canSort;

    const { onClick, ...restSortProps } = column.getSortByToggleProps();

    if ([undefined, 0].includes(column.minWidth)) {
      // override "undefined" or zero min-width with default value
      column.minWidth = columnHasExpanders
        ? COLUMN_MIN_WIDTHS.withExpander
        : COLUMN_MIN_WIDTHS.default;

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
        ...getCellStyle(column, !!instance.state.isTableResizing),
        ...(columnHasExpanders && getSubRowStyle({ density })),
        ...getStickyStyle(column, instance.visibleColumns),
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
        ref={useMergedRefs(ref, (el: HTMLDivElement) => {
          if (el) {
            column.resizeWidth = el.getBoundingClientRect().width;
          }
        })}
        tabIndex={showSortButton(column) ? 0 : undefined}
        onKeyDown={(e) => {
          if (e.key == 'Enter' && showSortButton(column)) {
            column.toggleSortBy();
          }
        }}
      >
        <>
          <ShadowRoot>
            {typeof column.Header === 'string' ? (
              <LineClamp>
                <slot />
              </LineClamp>
            ) : (
              <slot />
            )}
            <slot name='actions' />
            <slot name='resizers' />
            <slot name='shadows' />
          </ShadowRoot>

          {column.render('Header')}
          {(showFilterButton(column) || showSortButton(column)) && (
            <Box
              className='iui-table-header-actions-container'
              onKeyDown={(e) => e.stopPropagation()} // prevents from triggering sort
              slot='actions'
            >
              {showFilterButton(column) && <FilterToggle column={column} />}
              {showSortButton(column) && (
                <Box className='iui-table-cell-end-icon'>
                  {column.isSortedDesc ||
                  (!column.isSorted && column.sortDescFirst) ? (
                    <SvgSortDown className='iui-table-sort' aria-hidden />
                  ) : (
                    <SvgSortUp className='iui-table-sort' aria-hidden />
                  )}
                </Box>
              )}
            </Box>
          )}
          {isResizable &&
            column.isResizerVisible &&
            (!isLast || columnResizeMode === 'expand') && (
              <Box
                {...column.getResizerProps()}
                className='iui-table-resizer'
                slot='resizers'
              >
                <Box className='iui-table-resizer-bar' />
              </Box>
            )}
          {enableColumnReordering && !column.disableReordering && (
            <Box className='iui-table-reorder-bar' slot='resizers' />
          )}
          {column.sticky === 'left' &&
            instance.state.sticky.isScrolledToRight && (
              <Box className='iui-table-cell-shadow-right' slot='shadows' />
            )}
          {column.sticky === 'right' &&
            instance.state.sticky.isScrolledToLeft && (
              <Box className='iui-table-cell-shadow-left' slot='shadows' />
            )}
        </>
      </Box>
    );
  },
) as <T extends Record<string, unknown>>(
  props: ColumnHeaderProps<T> & { ref?: React.ForwardedRef<HTMLElement> },
) => JSX.Element;
