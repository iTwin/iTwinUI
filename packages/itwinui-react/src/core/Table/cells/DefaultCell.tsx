/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { defaultColumn } from 'react-table';
import type { CellRendererProps } from '../../../react-table/react-table.js';
import cx from 'classnames';
import { Box, LineClamp, ShadowRoot } from '../../../utils/index.js';
import { TableInstanceContext } from '../utils.js';

export type DefaultCellProps<T extends Record<string, unknown>> = {
  /**
   * Custom icon to be displayed at the beginning of the cell.
   */
  startIcon?: React.JSX.Element;
  /**
   * Custom icon to be displayed at the end of the cell.
   */
  endIcon?: React.JSX.Element;
  /**
   * Status of the cell.
   */
  status?: 'positive' | 'negative' | 'warning';
  /**
   * Should the contents of the cell be clamped after a certain number of lines?
   *
   * Will be enabled by default if the cell content is a string and a custom `Cell`
   * is not specified in the column object.
   */
  clamp?: boolean;
} & CellRendererProps<T> &
  React.ComponentPropsWithoutRef<'div'>;

export const DefaultCellRendererPropsChildren =
  React.createContext<React.ReactNode>(undefined);

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
  const instance = React.useContext(TableInstanceContext);

  const isCustomCell = React.useMemo(
    () =>
      instance?.columns.find(({ id }) => props.cellProps.column.id === id)
        ?.Cell !== defaultColumn.Cell,
    [instance, props.cellProps.column.id],
  );
  const isCellRendererChildrenCustom =
    React.useContext(DefaultCellRendererPropsChildren) !== props.children;

  const {
    cellElementProps: {
      className: cellElementClassName,
      style: cellElementStyle,
      ...cellElementProps
    },
    children,
    startIcon,
    endIcon,
    cellProps,
    isDisabled,
    className,
    style,
    status,
    clamp = typeof cellProps.value === 'string' &&
      !isCustomCell &&
      !isCellRendererChildrenCustom,
    ...rest
  } = props;

  const { key: cellElementKey, ...cellElementPropsRest } = cellElementProps;

  return (
    <Box
      {...cellElementPropsRest}
      key={cellElementKey}
      {...rest}
      className={cx(cellElementClassName, className)}
      aria-disabled={isDisabled?.(cellProps.row.original) || undefined}
      data-iui-status={status}
      style={{ ...cellElementStyle, ...style }}
    >
      <ShadowRoot key={`${cellElementKey}-shadow-root`} flush={false} css={css}>
        <slot name='start' />

        <TableCellContent shouldRenderWrapper={isCellRendererChildrenCustom}>
          {clamp ? (
            <LineClamp>
              <slot />
            </LineClamp>
          ) : (
            <slot />
          )}
        </TableCellContent>

        <slot name='end' />
        <slot name='shadows' />
      </ShadowRoot>

      {startIcon && (
        <Box
          className='iui-table-cell-start-icon'
          slot='start'
          key={`${cellElementKey}-start`}
        >
          {startIcon}
        </Box>
      )}
      {children}
      {endIcon && (
        <Box
          className='iui-table-cell-end-icon'
          slot='end'
          key={`${cellElementKey}-end`}
        >
          {endIcon}
        </Box>
      )}
    </Box>
  );
};
if (process.env.NODE_ENV === 'development') {
  DefaultCell.displayName = 'DefaultCell';
}

// ----------------------------------------------------------------------------

/**
 * If `shouldRenderWrapper` is true, `children` will be wrapped in a `div` with `_iui-table-cell-default-content` class.
 *
 * The `_iui-table-cell-default-content` div increases the hit target size.
 */
const TableCellContent = (props: {
  children: React.ReactNode;
  shouldRenderWrapper: boolean;
}) => {
  const { children, shouldRenderWrapper } = props;

  return shouldRenderWrapper ? (
    children
  ) : (
    <div
      className='_iui-table-cell-default-content'
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

// ----------------------------------------------------------------------------

/**
 * Increase hit target size of the cell content.
 * This helps prevent accidental row selection when selecting text.
 */
const css = /* css */ `
._iui-table-cell-default-content {
  position: relative;
  isolation: isolate;
}
._iui-table-cell-default-content::before {
  content: '';
  display: block;
  position: absolute;
  inset: -6px;
  z-index: -1;
}
`;
