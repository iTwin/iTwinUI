/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { SvgChevronRight } from '../utils';
import { Cell, CellProps } from 'react-table';
import { IconButton } from '../Buttons';

export type SubRowExpanderProps<T extends Record<string, unknown>> = {
  cell: Cell<T>;
  expanderCell?: (cellProps: CellProps<T>) => React.ReactNode;
  isDisabled: boolean;
  cellProps: CellProps<T>;
};

export const SubRowExpander = <T extends Record<string, unknown>>(
  props: SubRowExpanderProps<T>,
) => {
  const { cell, isDisabled, cellProps, expanderCell } = props;

  return (
    <>
      {expanderCell ? (
        expanderCell(cellProps)
      ) : (
        <IconButton
          style={{ marginRight: 8 }}
          className='iui-table-row-expander'
          styleType='borderless'
          size='small'
          onClick={(e) => {
            e.stopPropagation();
            cell.row.toggleRowExpanded();
          }}
          disabled={isDisabled}
        >
          {
            <SvgChevronRight
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

export default SubRowExpander;
