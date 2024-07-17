/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { CellRendererProps } from '../../../react-table/react-table.js';
import { Box, getRandomValue } from '../../../utils/index.js';
import cx from 'classnames';

export type EditableCellProps<T extends Record<string, unknown>> =
  CellRendererProps<T> & {
    /**
     * Callback function when cell is edited. It is called only when `onBlur` event is fired.
     * @example
     * const onCellEdit = React.useCallback(
     *  (columnId: string, value: string, rowData: T) => {
     *    setData((oldData) => {
     *      const newData = [...oldData];
     *      const index = oldData.indexOf(rowData);
     *      const newObject = { ...newData[index] };
     *      newObject[columnId] = value;
     *      newData[index] = newObject;
     *      return newData;
     *    });
     *  },
     *  [],
     * );
     */
    onCellEdit: (columnId: string, value: string, rowData: T) => void;
  } & React.ComponentPropsWithoutRef<'div'>;

/**
 * Editable cell.
 * It should be passed to `cellRenderer`.
 * @example
 * {
 *   Header: 'Name',
 *   accessor: 'name',
 *   cellRenderer: (props) => <EditableCell {...props} onCellEdit={onCellEditHandler} />,
 * }
 */
export const EditableCell = <T extends Record<string, unknown>>(
  props: EditableCellProps<T>,
) => {
  const {
    cellElementProps: {
      className: cellElementClassName,
      style: cellElementStyle,
      ...cellElementProps
    },
    cellProps,
    onCellEdit,
    children,
    isDisabled,
    className,
    style,
    ...rest
  } = props;
  isDisabled; // To omit and prevent eslint error.

  const sanitizeString = (text: string) => {
    return text.replace(/(\r\n|\n|\r)+/gm, ' ');
  };

  const [value, setValue] = React.useState(() =>
    sanitizeString(cellProps.value),
  );
  React.useEffect(() => {
    setValue(sanitizeString(cellProps.value));
  }, [cellProps.value]);

  const [key, setKey] = React.useState(getRandomValue(10));

  const [isDirty, setIsDirty] = React.useState(false);

  return (
    <Box
      {...cellElementProps}
      contentEditable
      suppressContentEditableWarning
      key={key}
      {...rest}
      className={cx(cellElementClassName, className)}
      style={{ ...cellElementStyle, ...style }}
      onInput={(e) => {
        setValue(sanitizeString((e.target as HTMLElement).innerText));
        setIsDirty(true);
        props.onInput?.(e);
      }}
      onBlur={(e) => {
        if (isDirty) {
          onCellEdit(cellProps.column.id, value, cellProps.row.original);
        }
        props.onBlur?.(e);
        // Prevents error when text is cleared.
        // New key makes React to reattach with the DOM so it won't complain about deleted text node.
        setKey(getRandomValue(10));
      }}
      onKeyDown={(e) => {
        // Prevents from adding HTML elements (div, br) inside a cell on Enter press
        if (e.key === 'Enter') {
          e.preventDefault();
        }
        props.onKeyDown?.(e);
      }}
      onPaste={(e) => {
        e.preventDefault();
        document.execCommand(
          'inserttext',
          false,
          sanitizeString(e.clipboardData.getData('text/plain')),
        );
        props.onPaste?.(e);
      }}
      onDrop={(e) => {
        // Prevents from drag'n'dropping into a cell because it will add unwanted HTML elements
        e.preventDefault();
        props.onDrop?.(e);
      }}
      onClick={(e) => {
        e.stopPropagation();
        props.onClick?.(e);
      }}
    >
      {children}
    </Box>
  );
};
if (process.env.NODE_ENV === 'development') {
  EditableCell.displayName = 'EditableCell';
}
