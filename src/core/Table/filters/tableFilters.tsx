/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { FilterButtonBarTranslation } from './FilterButtonBar';
import { TextFilter } from './TextFilter/TextFilter';
import { TableFilterProps } from './types';

export const tableFilters = {
  /**
   * Basic filter with a single input field.
   */
  TextFilter: (translatedLabels?: FilterButtonBarTranslation) => <
    T extends Record<string, unknown>
  >(
    props: TableFilterProps<T>,
  ) => <TextFilter {...props} translatedLabels={translatedLabels} />,
};
