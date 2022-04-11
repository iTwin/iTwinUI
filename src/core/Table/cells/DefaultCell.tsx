/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { CellRendererProps } from 'react-table';
import cx from 'classnames';

export type DefaultCellProps<
  T extends Record<string, unknown>
> = CellRendererProps<T> & React.ComponentPropsWithoutRef<'div'>;

/**
 * Default cell.
 * It should be passed to `cellRenderer`.
 * It can can be used to pass native HTML attributes to the cell container.
 * @example
 * {
 *   Header: 'Name',
 *   accessor: 'name',
 *   cellRenderer: (props) => <DefaultCell {...props} />,
 * }
 */
export const DefaultCell = <T extends Record<string, unknown>>(
  props: DefaultCellProps<T>,
) => {
  // Omitting `cellProps`
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    cellElementProps: {
      className: cellElementClassName,
      style: cellElementStyle,
      ...cellElementProps
    },
    children,
    cellProps,
    isDisabled,
    className,
    style,
    ...rest
  } = props;

  return (
    <div
      {...cellElementProps}
      {...rest}
      className={cx(cellElementClassName, className, {
        'iui-disabled': isDisabled?.(cellProps.row.original),
      })}
      style={{ ...cellElementStyle, ...style }}
    >
      {children}
    </div>
  );
};

export default DefaultCell;
