/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import '@itwin/itwinui-css/css/table.css';
import { useTheme } from '../../utils/hooks/useTheme';
import { CommonProps } from '../../utils/props';

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
  const { children, className, style } = props;

  useTheme();

  return (
    <div
      className={cx('iui-column-filter', className)}
      style={style}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
};
