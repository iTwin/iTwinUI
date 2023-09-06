/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { FieldType, FilterType, TableFilterProps } from 'react-table';

export interface TableFilterValue<T extends Record<string, unknown>> {
  /**
   * Id of the column.
   */
  id: string;
  /**
   * Value of the filter.
   */
  value: unknown;
  /**
   * Type of the column field.
   */
  fieldType: FieldType;
  /**
   * Type of the filter.
   */
  filterType: FilterType<T>;
}

export type { TableFilterProps };
