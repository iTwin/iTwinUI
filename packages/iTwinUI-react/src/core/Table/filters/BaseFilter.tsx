/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import '@itwin/itwinui-css/css/table.css';
import { useTheme } from '../../utils';
import { CommonProps } from '../../utils';

export type BaseFilterProps = {
  /**
   * Filter body.
   */
  children: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * Filter wrapper that should be used when creating custom filters.
 * @example
 * <BaseFilter>
 *   <Input
 *     value={text}
 *     onChange={(e) => setText(e.target.value)}
 *   />
 *   <FilterButtonBar
 *     setFilter={() => setFilter(text)}
 *     clearFilter={clearFilter}
 *   />
 * </BaseFilter>
 */
export const BaseFilter = (props: BaseFilterProps) => {
  const { children, className, style, id } = props;

  useTheme();

  return (
    <div
      className={cx('iui-table-column-filter', className)}
      style={style}
      // Prevents from triggering sort
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
      }}
      id={id}
    >
      {children}
    </div>
  );
};
