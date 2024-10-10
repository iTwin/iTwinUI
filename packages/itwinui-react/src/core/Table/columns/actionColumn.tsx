/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { HeaderProps } from '../../../react-table/react-table.js';
import { Checkbox } from '../../Checkbox/Checkbox.js';
import { FieldsetBase, SvgColumnManager } from '../../../utils/index.js';
import { IconButton } from '../../Buttons/IconButton.js';
import { actions } from 'react-table';
import { SELECTION_CELL_ID } from './selectionColumn.js';
import { EXPANDER_CELL_ID } from './expanderColumn.js';
import { Popover } from '../../Popover/Popover.js';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden.js';
import { Flex } from '../../Flex/Flex.js';

const ACTION_CELL_ID = 'iui-table-action';

type ActionColumnProps = {
  columnManager?:
    | boolean
    | {
        dropdownMenuProps: React.ComponentPropsWithoutRef<'div'> &
          Pick<
            React.ComponentPropsWithoutRef<typeof Popover>,
            'visible' | 'onVisibleChange' | 'placement' | 'portal'
          >;
      };
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
            const onChange = () => {
              column.toggleHidden(checked);
              // If no column was resized then leave table resize handling to the flexbox
              if (Object.keys(state.columnResizing.columnWidths).length === 0) {
                return;
              }
              // Triggers an update to resize the widths of all visible columns
              dispatch({ type: actions.tableResizeStart });

              // If some columns were resized and some columns visibility was enabled, then horizontal scrollbar appears
              // and table is scrolled to the very left which means our visibility dropdown menu is not visible.
              // So for better UX we need to scroll to that dropdown menu.
              queueMicrotask(() => {
                buttonRef.current?.scrollIntoView({ block: 'nearest' });
              });
            };
            return (
              <Checkbox
                key={column.id}
                checked={checked}
                disabled={column.disableToggleVisibility}
                onChange={onChange}
                label={column.render('Header')}
              />
            );
          });

      const popoverProps =
        typeof columnManager !== 'boolean'
          ? columnManager.dropdownMenuProps
          : {};

      return (
        <Popover
          applyBackground
          content={
            <Flex
              as={FieldsetBase}
              className='iui-table-column-manager'
              flexDirection='column'
              alignItems='flex-start'
            >
              <VisuallyHidden as='legend'>Show/hide columns</VisuallyHidden>
              {headerCheckBoxes()}
            </Flex>
          }
          {...popoverProps}
        >
          <IconButton
            styleType='borderless'
            ref={buttonRef}
            label='Column manager'
          >
            <SvgColumnManager />
          </IconButton>
        </Popover>
      );
    },
  };
};
