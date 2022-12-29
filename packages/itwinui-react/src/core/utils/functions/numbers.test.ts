/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { getRandomValue, getBoundedValue } from './numbers';

describe('getBoundedValue', () => {
  it('should get bounded values', () => {
    expect(getBoundedValue(20, 0, 100)).toBe(20);
    expect(getBoundedValue(20, 30, 100)).toBe(30);
    expect(getBoundedValue(20, 0, 10)).toBe(10);
  });
});

describe('getRandomValue', () => {
  it('should get random values of default length', () => {
    expect(getRandomValue()).not.toEqual(getRandomValue());
    expect(getRandomValue()).toHaveLength(21);
  });

  it('should get random values of specified length', () => {
    expect(getRandomValue(10)).toHaveLength(10);
    expect(getRandomValue(14)).toHaveLength(14);
    expect(getRandomValue(8)).not.toEqual(getRandomValue(8));
  });
});
