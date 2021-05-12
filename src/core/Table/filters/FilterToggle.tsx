/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgFilterHollow from '@itwin/itwinui-icons-react/cjs/icons/FilterHollow';
import SvgFilter from '@itwin/itwinui-icons-react/cjs/icons/Filter';
import React from 'react';
import cx from 'classnames';
import { HeaderGroup } from 'react-table';
import '@itwin/itwinui-css/css/table.css';
import { useTheme } from '../../utils/hooks/useTheme';
import { Popover } from '../../utils/Popover';

export type FilterToggleProps<T extends Record<string, unknown>> = {
  column: HeaderGroup<T>;
};

/**
 * Handles showing filter icon and opening filter component.
 */
export const FilterToggle = <T extends Record<string, unknown>>(
  props: FilterToggleProps<T>,
) => {
  const { column } = props;

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

  return (
    <>
      {column.canFilter && column.Filter && (
        <Popover
          content={column.render('Filter', { close, setFilter, clearFilter })}
          placement='bottom'
          visible={isVisible}
          onClickOutside={close}
        >
          <div
            className={cx('iui-filter', {
              'iui-active': isVisible || column.filterValue,
            })}
            onClick={() => setIsVisible((v) => !v)}
          >
            {column.filterValue ? (
              <SvgFilter className='iui-icon' />
            ) : (
              <SvgFilterHollow className='iui-icon' />
            )}
          </div>
        </Popover>
      )}
    </>
  );
};
