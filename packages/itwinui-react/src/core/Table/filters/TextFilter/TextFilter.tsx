/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useGlobals } from '../../../../utils/index.js';
import { Input } from '../../../Input/Input.js';
import { FilterButtonBar } from '../FilterButtonBar.js';
import type { FilterButtonBarTranslation } from '../FilterButtonBar.js';
import { BaseFilter } from '../BaseFilter.js';
import type { TableFilterProps } from '../types.js';

export type TextFilterProps<T extends Record<string, unknown>> =
  TableFilterProps<T> & {
    translatedLabels?: FilterButtonBarTranslation;
  };

export const TextFilter = <T extends Record<string, unknown>>(
  props: TextFilterProps<T>,
) => {
  const { column, translatedLabels, setFilter, clearFilter } = props;

  useGlobals();

  const [text, setText] = React.useState(column.filterValue ?? '');

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <BaseFilter onSubmit={() => setFilter(text)}>
      <Input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <FilterButtonBar
        clearFilter={clearFilter}
        translatedLabels={translatedLabels}
      />
    </BaseFilter>
  );
};
