/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { HeaderGroup } from 'react-table';
import '@itwin/itwinui-css/css/table.css';
import {
  useTheme,
  Popover,
  StylingProps,
  SvgFilterHollow,
  SvgFilter,
} from '../../utils';
import { IconButton } from '../../Buttons';

export type FilterToggleProps<T extends Record<string, unknown>> = {
  column: HeaderGroup<T>;
} & StylingProps;

/**
 * Handles showing filter icon and opening filter component.
 */
export const FilterToggle = <T extends Record<string, unknown>>(
  props: FilterToggleProps<T>,
) => {
  const { column, className, ...rest } = props;

  useTheme();

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
          onClickOutside={close}
        >
          <IconButton
            styleType='borderless'
            isActive={isVisible || isColumnFiltered}
            className={cx('iui-table-filter-button', className)}
            onClick={(e) => {
              setIsVisible((v) => !v);
              // Prevents from triggering sort
              e.stopPropagation();
            }}
            {...rest}
          >
            {isColumnFiltered ? <SvgFilter /> : <SvgFilterHollow />}
          </IconButton>
        </Popover>
      )}
    </>
  );
};
