/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { defaultColumn } from 'react-table';
import type { CellRendererProps } from '../../../react-table/react-table.js';
import cx from 'classnames';
import { Box } from '../../../utils/index.js';
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
   * Will be enabled by default if the `text` prop is used, or if the cell content
   * is a string and a custom `Cell` is not specified in the column object.
   */
  clamp?: boolean;
  /**
   * Main text content displayed inside the cell. This takes precedence over `children`.
   *
   * This will be conditionally wrapped with additional elements for better text selection
   * experience and also for line clamping (if `clamp` prop is not set to `false`).
   */
  text?: string;
} & CellRendererProps<T> &
  React.ComponentPropsWithoutRef<'div'>;

export const DefaultCellContext = React.createContext<{
  children?: React.ReactNode;
  expander?: React.ReactNode;
  shadows?: React.ReactNode;
}>({});

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

  const defaultCellContext = React.useContext(DefaultCellContext);

  const isCellRendererChildrenCustom =
    defaultCellContext.children !== props.children;

  const isDefaultTextCell =
    typeof props.cellProps.value === 'string' &&
    !isCustomCell &&
    !isCellRendererChildrenCustom;

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
    text = isDefaultTextCell ? cellProps.value : undefined,
    clamp = !!text,
    ...rest
  } = props;

  const { key: cellElementKey, ...cellElementPropsRest } = cellElementProps;

  const decorations = {
    start: startIcon ? (
      <Box
        className='iui-table-cell-start-icon'
        key={`${cellElementKey}-start`}
      >
        {startIcon}
      </Box>
    ) : null,

    end: endIcon ? (
      <Box className='iui-table-cell-end-icon' key={`${cellElementKey}-end`}>
        {endIcon}
      </Box>
    ) : null,
  };

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
      {(() => {
        // When `text` is available, we need to wrap *only* the text with additional elements for
        // increasing text selection hit target area and line clamping.
        // The expander, decorations and shadows should remain outside of these wrappers.
        if (text) {
          return (
            <>
              {decorations.start}
              {defaultCellContext.expander}
              <Box
                className='iui-table-cell-default-content'
                onClick={(e) => e.stopPropagation()}
              >
                {clamp ? <Box className='iui-line-clamp'>{text}</Box> : text}
              </Box>
              {decorations.end}
              {defaultCellContext.shadows}
            </>
          );
        }

        return (
          <>
            {decorations.start}
            {children}
            {decorations.end}
          </>
        );
      })()}
    </Box>
  );
};
if (process.env.NODE_ENV === 'development') {
  DefaultCell.displayName = 'DefaultCell';
}
