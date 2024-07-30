/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box } from '../../utils/index.js';
import type {
  HeaderGroup,
  TableHeaderProps,
  TableKeyedProps,
} from 'react-table';

type ColumnHeaderProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = TableHeaderProps &
  TableKeyedProps & {
    columnRefs: React.MutableRefObject<Record<string, HTMLDivElement>>;
    column: HeaderGroup<T>;
    isHeaderDirectClick: React.MutableRefObject<boolean>;
    onClick: ((e: React.MouseEvent) => void) | undefined;
    showSortButton: (column: HeaderGroup<T>) => boolean;
    children: React.ReactNode;
  };

export const ColumnHeader = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  props: ColumnHeaderProps<T>,
): JSX.Element => {
  const {
    columnRefs,
    column,
    isHeaderDirectClick,
    onClick,
    showSortButton,
    children,
    ...rest
  } = props;

  return (
    <Box
      {...rest}
      title={undefined}
      ref={React.useCallback(
        (el: HTMLDivElement) => {
          if (el) {
            columnRefs.current[column.id] = el;
            column.resizeWidth = el.getBoundingClientRect().width;
          }
        },
        [column, columnRefs],
      )}
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
      tabIndex={showSortButton(column) ? 0 : undefined}
      onKeyDown={(e) => {
        if (e.key == 'Enter' && showSortButton(column)) {
          column.toggleSortBy();
        }
      }}
    >
      {children}
    </Box>
  );
};
