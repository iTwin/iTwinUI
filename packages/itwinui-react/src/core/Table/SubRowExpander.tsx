/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SvgChevronRightSmall } from '../../utils/index.js';
import type { Cell, CellProps } from '../../react-table/react-table.js';
import { IconButton } from '../Buttons/IconButton.js';

export type SubRowExpanderProps<T extends Record<string, unknown>> = {
  cell: Cell<T>;
  expanderCell?: (cellProps: CellProps<T>) => React.ReactNode;
  isDisabled: boolean;
  cellProps: CellProps<T>;
  density?: 'default' | 'condensed' | 'extra-condensed';
  [k: string]: unknown;
};

export const SubRowExpander = <T extends Record<string, unknown>>(
  props: SubRowExpanderProps<T>,
) => {
  const { cell, isDisabled, cellProps, expanderCell, density, ...rest } = props;

  return (
    <>
      {expanderCell ? (
        expanderCell(cellProps)
      ) : (
        <IconButton
          aria-label='Toggle sub row'
          aria-expanded={cell.row.isExpanded ? 'true' : 'false'}
          style={{
            marginInlineEnd:
              density === 'default' || density === undefined ? 8 : 4,
          }}
          className='iui-table-row-expander'
          styleType='borderless'
          size='small'
          onClick={(e) => {
            e.stopPropagation();
            cell.row.toggleRowExpanded();
          }}
          disabled={isDisabled}
          {...rest}
        >
          {
            <SvgChevronRightSmall
              style={{
                transform: cell.row.isExpanded ? 'rotate(90deg)' : undefined,
              }}
            />
          }
        </IconButton>
      )}
    </>
  );
};
