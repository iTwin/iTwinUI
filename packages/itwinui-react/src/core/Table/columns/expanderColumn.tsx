/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SvgChevronRight } from '../../../utils/index.js';
import type {
  CellRendererProps,
  Row,
} from '../../../react-table/react-table.js';
import { IconButton } from '../../Buttons/IconButton.js';
import { DefaultCell } from '../cells/index.js';

export const EXPANDER_CELL_ID = 'iui-table-expander';

/**
 * Expander column that adds sub-content expander column to the Table.
 * It is recommended to use it as the first column or after selection column.
 * @example
 * const subComponent = useCallback(
 *   (row: Row) => (
 *     <div style={{ padding: 16 }}>
 *       <Text variant='leading'>Extra information</Text>
 *       <pre>
 *         <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
 *       </pre>
 *     </div>
 *   ),
 *   [],
 * );
 * const isExpanderDisabled = useCallback((rowData) => {
 *   return rowData.name === 'Name2';
 * }, []);
 * const columns = useMemo(() => [
 *   ExpanderColumn({ subComponent, isDisabled: isExpanderDisabled }),
 *   // Rest of your columns
 * ], [isExpanderDisabled, subComponent]);
 */
export const ExpanderColumn = <T extends Record<string, unknown>>(
  props: {
    /** Function that returns expanded content. If row doesn't have it, then should return `false`/`null`. */
    subComponent?: (row: Row<T>) => React.ReactNode;
    /** Function that returns whether expander is disabled */
    isDisabled?: (rowData: T) => boolean;
  } = {},
) => {
  const { subComponent, isDisabled } = props;
  return {
    id: EXPANDER_CELL_ID,
    disableResizing: true,
    disableGroupBy: true,
    disableReordering: true,
    minWidth: 48,
    width: 48,
    maxWidth: 48,
    columnClassName: 'iui-slot',
    cellClassName: 'iui-slot',
    Cell: () => null,
    cellRenderer: (props: CellRendererProps<T>) => {
      const { row } = props.cellProps;

      const children = !subComponent?.(row) ? null : (
        <IconButton
          aria-label='Toggle expandable content'
          className='iui-table-row-expander'
          styleType='borderless'
          size='small'
          onClick={(e) => {
            e.stopPropagation();
            row.toggleRowExpanded();
          }}
          disabled={isDisabled?.(row.original)}
          aria-expanded={row.isExpanded}
        >
          {<SvgChevronRight />}
        </IconButton>
      );

      return (
        <DefaultCell
          {...props}
          isDisabled={(rowData) => !!isDisabled?.(rowData)}
        >
          {children}
        </DefaultCell>
      );
    },
  };
};
