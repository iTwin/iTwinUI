/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Row } from 'react-table';
import { customFilterFunctions } from './customFilterFunctions';

const mockRows = (values: any[]) => {
  return values.map((v) => ({
    values: { value: v },
  })) as unknown as Row<any>[];
};

it('should filter date values when filter has min and max set', () => {
  const filteredRows = customFilterFunctions.betweenDate(
    mockRows([
      new Date(2021, 3, 29),
      new Date(2021, 4, 2),
      new Date(2021, 4, 3),
      new Date(2021, 4, 4),
    ]),
    ['value'],
    [new Date(2021, 4, 1), new Date(2021, 4, 3)],
  );
  expect(filteredRows).toEqual(
    mockRows([new Date(2021, 4, 2), new Date(2021, 4, 3)]),
  );
});

it('should filter date values when filter has only min set', () => {
  const filteredRows = customFilterFunctions.betweenDate(
    mockRows([
      new Date(2021, 3, 29),
      new Date(2021, 4, 2),
      new Date(2021, 4, 3),
      new Date(2021, 4, 4),
    ]),
    ['value'],
    [new Date(2021, 4, 1), undefined],
  );
  expect(filteredRows).toEqual(
    mockRows([
      new Date(2021, 4, 2),
      new Date(2021, 4, 3),
      new Date(2021, 4, 4),
    ]),
  );
});

it('should filter date values when filter has only max set', () => {
  const filteredRows = customFilterFunctions.betweenDate(
    mockRows([
      new Date(2021, 3, 29),
      new Date(2021, 4, 2),
      new Date(2021, 4, 3),
      new Date(2021, 4, 4),
    ]),
    ['value'],
    [undefined, new Date(2021, 4, 3)],
  );
  expect(filteredRows).toEqual(
    mockRows([
      new Date(2021, 3, 29),
      new Date(2021, 4, 2),
      new Date(2021, 4, 3),
    ]),
  );
});

it('should not filter date values when filter is invalid', () => {
  const filteredRows = customFilterFunctions.betweenDate(
    mockRows([
      new Date(2021, 3, 29),
      new Date(2021, 4, 2),
      new Date(2021, 4, 3),
      new Date(2021, 4, 4),
    ]),
    ['value'],
    [new Date(' '), new Date(' ')],
  );
  expect(filteredRows).toEqual(
    mockRows([
      new Date(2021, 3, 29),
      new Date(2021, 4, 2),
      new Date(2021, 4, 3),
      new Date(2021, 4, 4),
    ]),
  );
});

it('should not filter date values when filter is undefined', () => {
  const filteredRows = customFilterFunctions.betweenDate(
    mockRows([
      new Date(2021, 3, 29),
      new Date(2021, 4, 2),
      new Date(2021, 4, 3),
      new Date(2021, 4, 4),
    ]),
    ['value'],
    undefined,
  );
  expect(filteredRows).toEqual(
    mockRows([
      new Date(2021, 3, 29),
      new Date(2021, 4, 2),
      new Date(2021, 4, 3),
      new Date(2021, 4, 4),
    ]),
  );
});

it('should auto remove date filter when value is invalid', () => {
  expect(customFilterFunctions.betweenDate.autoRemove(undefined)).toBe(true);
  expect(customFilterFunctions.betweenDate.autoRemove([])).toBe(true);
  expect(
    customFilterFunctions.betweenDate.autoRemove([undefined, undefined]),
  ).toBe(true);
  expect(
    customFilterFunctions.betweenDate.autoRemove([
      new Date(' '),
      new Date(' '),
    ]),
  ).toBe(true);
});

it('should not auto remove date filter when value is valid', () => {
  expect(
    customFilterFunctions.betweenDate.autoRemove([
      new Date(2021, 4, 1),
      new Date(2021, 4, 3),
    ]),
  ).toBe(false);
  expect(
    customFilterFunctions.betweenDate.autoRemove([
      new Date(2021, 4, 1),
      undefined,
    ]),
  ).toBe(false);
  expect(
    customFilterFunctions.betweenDate.autoRemove([
      undefined,
      new Date(2021, 4, 3),
    ]),
  ).toBe(false);
});
