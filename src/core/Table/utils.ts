/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ColumnInstance } from 'react-table';

export const getCellStyle = <T extends Record<string, unknown>>(
  column: ColumnInstance<T>,
): React.CSSProperties | undefined => {
  const style = {} as React.CSSProperties;
  style.flex = `1 1 145px`;
  if (column.width) {
    const width =
      typeof column.width === 'string' ? column.width : `${column.width}px`;
    style.width = width;
    style.flex = `0 0 ${width}`;
  }
  if (column.maxWidth) {
    style.maxWidth = `${column.maxWidth}px`;
  }
  if (column.minWidth) {
    style.minWidth = `${column.minWidth}px`;
  }
  return style;
};
