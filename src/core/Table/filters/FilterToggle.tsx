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
import { getDocument } from '../../utils/common';
import { IconButton } from '../../Buttons';
import { StylingProps } from '../../utils/props';

export type FilterToggleProps<T extends Record<string, unknown>> = {
  column: HeaderGroup<T>;
  ownerDocument?: Document;
} & StylingProps;

/**
 * Handles showing filter icon and opening filter component.
 */
export const FilterToggle = <T extends Record<string, unknown>>(
  props: FilterToggleProps<T>,
) => {
  const { column, ownerDocument = getDocument(), className, ...rest } = props;

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
          appendTo={ownerDocument?.body}
        >
          <IconButton
            styleType='borderless'
            isActive={isVisible || column.filterValue}
            className={cx('iui-filter-button', className)}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              setIsVisible((v) => !v);
            }}
            {...rest}
          >
            {column.filterValue ? <SvgFilter /> : <SvgFilterHollow />}
          </IconButton>
        </Popover>
      )}
    </>
  );
};
