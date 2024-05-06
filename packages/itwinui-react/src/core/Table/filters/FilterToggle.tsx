/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import type { HeaderGroup } from '../../../react-table/react-table.js';
import {
  useGlobals,
  SvgFilterHollow,
  SvgFilter,
} from '../../../utils/index.js';
import type { CommonProps } from '../../../utils/index.js';
import { IconButton } from '../../Buttons/IconButton.js';
import { Popover } from '../../Popover/Popover.js';

export type FilterToggleProps<T extends Record<string, unknown>> = {
  column: HeaderGroup<T>;
} & CommonProps;

/**
 * Handles showing filter icon and opening filter component.
 */
export const FilterToggle = <T extends Record<string, unknown>>(
  props: FilterToggleProps<T>,
) => {
  const { column, className, ...rest } = props;

  useGlobals();

  const [isVisible, setIsVisible] = React.useState(false);
  const close = React.useCallback(() => setIsVisible(false), []);

  const setFilter = React.useCallback(
    (filterValue: unknown | undefined) => {
      column.setFilter(filterValue);
      close();
    },
    [close, column],
  );

  const clearFilter = React.useCallback(() => {
    column.setFilter(undefined);
    close();
  }, [close, column]);

  const isColumnFiltered =
    column.filterValue != null && column.filterValue !== '';

  return (
    <>
      {column.canFilter && column.Filter && (
        <Popover
          content={column.render('Filter', { close, setFilter, clearFilter })}
          placement='bottom-start'
          visible={isVisible}
          onVisibleChange={setIsVisible}
          closeOnOutsideClick
          applyBackground
        >
          <IconButton
            styleType='borderless'
            isActive={isVisible || isColumnFiltered}
            className={cx('iui-table-filter-button', className)}
            aria-label='Filter'
            onClick={(e) => {
              // Prevents from triggering sort
              e.stopPropagation();
            }}
            data-iui-shift='left'
            {...rest}
          >
            {isColumnFiltered ? <SvgFilter /> : <SvgFilterHollow />}
          </IconButton>
        </Popover>
      )}
    </>
  );
};
