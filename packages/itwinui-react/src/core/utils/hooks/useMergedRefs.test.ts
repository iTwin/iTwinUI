/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { mergeRefs } from './useMergedRefs';

it('should handle callback ref and mutable ref object', () => {
  const refFn = jest.fn();
  const refObj = {} as React.MutableRefObject<unknown>;
  const refs = mergeRefs(refFn, refObj);

  const mockedElement = {};
  refs(mockedElement);

  expect(refFn).toHaveBeenCalledWith(mockedElement);
  expect(refObj.current).toBe(mockedElement);
});

it('should handle undefined and null', () => {
  const refs = mergeRefs(undefined, null);
  expect(() => refs({})).not.toThrow();
});
