/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { HeaderProps } from 'react-table';
import { Checkbox } from '../../Checkbox';
import { SvgColumnManager } from '../../utils';
import { DropdownMenu, DropdownMenuProps } from '../../DropdownMenu';
import { IconButton } from '../../Buttons/IconButton';
import { MenuItem } from '../../Menu';
import { tableResizeStartAction } from '../Table';
import { SELECTION_CELL_ID } from './selectionColumn';
import { EXPANDER_CELL_ID } from './expanderColumn';
import cx from 'classnames';

const ACTION_CELL_ID = 'iui-table-action';

type ActionColumnProps = {
  columnManager?:
    | boolean
    | { dropdownMenuProps: Omit<DropdownMenuProps, 'menuItems' | 'children'> };
};

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
}: ActionColumnProps = {}) => {
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
      const buttonRef = React.useRef<HTMLButtonElement>(null);

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

              // If some columns were resized and some columns visibility was enabled, then horizontal scrollbar appears
              // and table is scrolled to the very left which means our visibility dropdown menu is not visible.
              // So for better UX we need to scroll to that dropdown menu.
              queueMicrotask(() => {
                buttonRef.current?.scrollIntoView();
              });
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

      const dropdownMenuProps =
        typeof columnManager !== 'boolean'
          ? columnManager.dropdownMenuProps
          : {};

      return (
        <DropdownMenu
          {...dropdownMenuProps}
          menuItems={headerCheckBoxes}
          onHide={(i) => {
            setIsOpen(false);
            dropdownMenuProps.onHide?.(i);
          }}
          onShow={(i) => {
            setIsOpen(true);
            dropdownMenuProps.onShow?.(i);
          }}
          className={cx('iui-scroll', dropdownMenuProps.className)}
        >
          <IconButton styleType='borderless' isActive={isOpen} ref={buttonRef}>
            <SvgColumnManager />
          </IconButton>
        </DropdownMenu>
      );
    },
  };
};
