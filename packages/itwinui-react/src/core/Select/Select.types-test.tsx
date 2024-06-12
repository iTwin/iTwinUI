/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * This test file tests some Select type related cases that have not been tested in other files
 * (e.g. react-workshop, unit tests, etc.)
 */

import { useRef } from 'react';
import { Select } from './Select.js';

// ----------------------------------------------------------------------------
// Testing onChange type in inferred and explicit cases
// See: https://github.com/iTwin/iTwinUI/pull/1774

() => {
  const ref = useRef(null);
  return (
    <>
      <Select
        options={[
          { value: 1, label: 'Option 1' },
          { value: 2, label: 'Option 2' },
          { value: 3, label: 'Option 3' },
        ]}
        onChange={(value) => {
          const returnValue: number = value;
          return returnValue;
        }}
        ref={ref}
      />
    </>
  );
};

() => {
  return (
    <>
      <Select<number>
        options={[
          { value: 1, label: 'Option 1' },
          { value: 2, label: 'Option 2' },
          { value: 3, label: 'Option 3' },
        ]}
        onChange={(value) => {
          const returnValue: number = value;
          return returnValue;
        }}
      />
    </>
  );
};

() => {
  return (
    <>
      <Select<string>
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
          { value: '3', label: 'Option 3' },
        ]}
        onChange={(value) => {
          const returnValue: string = value;
          return returnValue;
        }}
      />
    </>
  );
};

() => {
  return (
    <>
      <Select<string>
        label='Select Label'
        options={[
          // There should be error: TS 2322
          // @ts-expect-error (TS 2322): Type 'number' is not assignable to type 'string'.
          { value: 1, label: 'Item #1' },
        ]}
        onChange={(value) => {
          const returnValue: string = value;
          return returnValue;
        }}
      />
    </>
  );
};

// ----------------------------------------------------------------------------
// Testing `styleType`
// See: https://github.com/iTwin/iTwinUI/pull/1886
() => {
  return (
    <>
      {/* styleType should not be available in CustomSelect */}
      {/* @ts-expect-error (T2322) */}
      <Select styleType={'borderless'} options={[]} />
      {/* @ts-expect-error (T2322) */}
      <Select styleType={'default'} options={[]} />
    </>
  );
};
