/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { CellRendererProps } from '../../../react-table/react-table.js';
import cx from 'classnames';
import { Box, LineClamp, ShadowRoot } from '../../utils/index.js';

export type DefaultCellProps<T extends Record<string, unknown>> = {
  /**
   * Custom icon to be displayed at the beginning of the cell.
   */
  startIcon?: JSX.Element;
  /**
   * Custom icon to be displayed at the end of the cell.
   */
  endIcon?: JSX.Element;
  /**
   * Status of the cell.
   */
  status?: 'positive' | 'negative' | 'warning';
  /**
   * Should the contents of the cell be clamped after a certain number of lines?
   *
   * Will be enabled by default if the cell content is a string.
   */
  clamp?: boolean;
} & CellRendererProps<T> &
  React.ComponentPropsWithoutRef<'div'>;

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
    clamp = typeof cellProps.value === 'string',
    ...rest
  } = props;

  return (
    <Box
      {...cellElementProps}
      {...rest}
      className={cx(cellElementClassName, className)}
      aria-disabled={isDisabled?.(cellProps.row.original) || undefined}
      data-iui-status={status}
      style={{ ...cellElementStyle, ...style }}
    >
      <ShadowRoot>
        {clamp ? (
          <LineClamp>
            <slot />
          </LineClamp>
        ) : (
          <slot />
        )}
        <slot name='shadow' />
      </ShadowRoot>

      {startIcon && (
        <Box className='iui-table-cell-start-icon'>{startIcon}</Box>
      )}
      {children}
      {endIcon && <Box className='iui-table-cell-end-icon'>{endIcon}</Box>}
    </Box>
  );
};
