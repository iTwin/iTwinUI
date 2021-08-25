/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * Copied from react-table as these default filter functions are not properly exposed
 * and we need them in sub-rows filtering. */
/**
 * MIT License
 *
 * Copyright (c) 2016 Tanner Linsley
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { IdType, Row } from 'react-table';

const text = <T extends Record<string, unknown>>(
  rows: Row<T>[],
  ids: IdType<T>[],
  filterValue: string,
) => {
  rows = rows.filter((row) => {
    return ids.some((id) => {
      const rowValue = row.values[id];
      return String(rowValue)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());
    });
  });
  return rows;
};

text.autoRemove = (val: string) => !val;

const exactText = <T extends Record<string, unknown>>(
  rows: Row<T>[],
  ids: IdType<T>[],
  filterValue: string,
) => {
  return rows.filter((row) => {
    return ids.some((id) => {
      const rowValue = row.values[id];
      return rowValue !== undefined
        ? String(rowValue).toLowerCase() === String(filterValue).toLowerCase()
        : true;
    });
  });
};

exactText.autoRemove = (val: string) => !val;

const exactTextCase = <T extends Record<string, unknown>>(
  rows: Row<T>[],
  ids: IdType<T>[],
  filterValue: string,
) => {
  return rows.filter((row) => {
    return ids.some((id) => {
      const rowValue = row.values[id];
      return rowValue !== undefined
        ? String(rowValue) === String(filterValue)
        : true;
    });
  });
};

exactTextCase.autoRemove = (val: string) => !val;

const includes = <T extends Record<string, unknown>>(
  rows: Row<T>[],
  ids: IdType<T>[],
  filterValue: unknown[],
) => {
  return rows.filter((row) => {
    return ids.some((id) => {
      const rowValue = row.values[id];
      return rowValue.includes(filterValue);
    });
  });
};

includes.autoRemove = (val: unknown[]) => !val || !val.length;

const includesAll = <T extends Record<string, unknown>>(
  rows: Row<T>[],
  ids: IdType<T>[],
  filterValue: unknown[],
) => {
  return rows.filter((row) => {
    return ids.some((id) => {
      const rowValue = row.values[id];
      return (
        rowValue &&
        rowValue.length &&
        filterValue.every((val) => rowValue.includes(val))
      );
    });
  });
};

includesAll.autoRemove = (val: unknown[]) => !val || !val.length;

const includesSome = <T extends Record<string, unknown>>(
  rows: Row<T>[],
  ids: IdType<T>[],
  filterValue: unknown[],
) => {
  return rows.filter((row) => {
    return ids.some((id) => {
      const rowValue = row.values[id];
      return (
        rowValue &&
        rowValue.length &&
        filterValue.some((val) => rowValue.includes(val))
      );
    });
  });
};

includesSome.autoRemove = (val: unknown[]) => !val || !val.length;

const includesValue = <T extends Record<string, unknown>>(
  rows: Row<T>[],
  ids: IdType<T>[],
  filterValue: unknown[],
) => {
  return rows.filter((row) => {
    return ids.some((id) => {
      const rowValue = row.values[id];
      return filterValue.includes(rowValue);
    });
  });
};

includesValue.autoRemove = (val: unknown[]) => !val || !val.length;

const exact = <T extends Record<string, unknown>>(
  rows: Row<T>[],
  ids: IdType<T>[],
  filterValue: unknown,
) => {
  return rows.filter((row) => {
    return ids.some((id) => {
      const rowValue = row.values[id];
      return rowValue === filterValue;
    });
  });
};

exact.autoRemove = (val: unknown) => typeof val === 'undefined';

const equals = <T extends Record<string, unknown>>(
  rows: Row<T>[],
  ids: IdType<T>[],
  filterValue: unknown,
) => {
  return rows.filter((row) => {
    return ids.some((id) => {
      const rowValue = row.values[id];
      // eslint-disable-next-line eqeqeq
      return rowValue == filterValue;
    });
  });
};

equals.autoRemove = (val: unknown) => val == null;

const between = <T extends Record<string, unknown>>(
  rows: Row<T>[],
  ids: IdType<T>[],
  filterValue: [number, number],
) => {
  let [min, max] = filterValue || [];

  min = typeof min === 'number' ? min : -Infinity;
  max = typeof max === 'number' ? max : Infinity;

  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }

  return rows.filter((row) => {
    return ids.some((id) => {
      const rowValue = row.values[id];
      return rowValue >= min && rowValue <= max;
    });
  });
};

between.autoRemove = (val: [number, number]) =>
  !val || (typeof val[0] !== 'number' && typeof val[1] !== 'number');

export const defaultFilterFunctions = {
  text,
  exactText,
  exactTextCase,
  includes,
  includesAll,
  includesSome,
  includesValue,
  between,
};
