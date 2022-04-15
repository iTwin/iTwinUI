/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { HeaderProps } from 'react-table';
import { Checkbox } from '../../Checkbox';
import SvgColumnManager from '@itwin/itwinui-icons-react/cjs/icons/ColumnManager';
import { DropdownMenu } from '../../DropdownMenu';
import { IconButton } from '../../Buttons/IconButton';
import { MenuItem } from '../../Menu';
import { tableResizeStartAction } from '../Table';
import { SELECTION_CELL_ID } from './selectionColumn';
import { EXPANDER_CELL_ID } from './expanderColumn';

const ACTION_CELL_ID = 'iui-table-action';

/**
 * Action column that adds column manager to the Table header.
 * It is recommended to add this column to the end of the Table
 * and to override its `Cell` prop with your row actions menu.
 * @example
 * {
 *   ...ActionColumn({ columnManager: true }),
 *   Cell: () => (
 *     <DropdownMenu menuItems={menuItems}>
 *       <IconButton
 *         styleType='borderless'
 *         onClick={(e) => e.stopPropagation()}
 *       >
 *         <SvgMore />
 *       </IconButton>
 *     </DropdownMenu>
 *   ),
 * },
 */
export const ActionColumn = <T extends Record<string, unknown>>({
  columnManager = false,
} = {}) => {
  return {
    id: ACTION_CELL_ID,
    disableResizing: true,
    disableGroupBy: true,
    minWidth: 48,
    width: 48,
    maxWidth: 48,
    columnClassName: 'iui-slot',
    cellClassName: 'iui-slot',
    disableReordering: true,
    Header: ({ allColumns, dispatch, state }: HeaderProps<T>) => {
      const [isOpen, setIsOpen] = React.useState(false);
      if (!columnManager) {
        return null;
      }
      const defaultColumnIds = [
        SELECTION_CELL_ID,
        EXPANDER_CELL_ID,
        ACTION_CELL_ID,
      ];

      const headerCheckBoxes = () =>
        allColumns
          //Filters out any default columns made such as selection and expansion
          .filter(({ id }) => !defaultColumnIds.includes(id))
          .map((column) => {
            const { checked } = column.getToggleHiddenProps();
            const onClick = () => {
              column.toggleHidden(checked);
              // If no column was resized then leave table resize handling to the flexbox
              if (Object.keys(state.columnResizing.columnWidths).length === 0) {
                return;
              }
              // Triggers an update to resize the widths of all visible columns
              dispatch({ type: tableResizeStartAction });
            };
            return (
              <MenuItem
                key={column.id}
                icon={
                  <Checkbox
                    checked={checked}
                    disabled={column.disableToggleVisibility}
                    onClick={(e) => e.stopPropagation()}
                    onChange={onClick}
                    aria-labelledby={`iui-column-${column.id}`}
                  />
                }
                onClick={onClick}
                disabled={column.disableToggleVisibility}
              >
                <div id={`iui-column-${column.id}`}>
                  {column.render('Header')}
                </div>
              </MenuItem>
            );
          });
      return (
        <DropdownMenu
          menuItems={headerCheckBoxes}
          onHide={() => setIsOpen(false)}
          onShow={() => setIsOpen(true)}
        >
          <IconButton styleType='borderless' isActive={isOpen}>
            <SvgColumnManager />
          </IconButton>
        </DropdownMenu>
      );
    },
  };
};
