/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * This test file tests some Select type related cases that have not been tested in other files
 * (e.g. react-workshop, unit tests, etc.)
 */

import React, { useRef } from 'react';
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
      {/* Expected type error: */}
      {/* borderless but missing defaultValue (custom select) */}
      {/* As a fallback, the first option is selected */}
      {/* @ts-expect-error (TS 2322) */}
      <Select
        styleType='borderless'
        multiple
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
      <Select
        styleType='borderless'
        defaultValue={'1'}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />

      {/* Observation: */}
      {/* borderless but missing defaultValue (native select) */}
      {/* No error since defaultValue is not required in borderless native select */}
      <Select
        native
        styleType='borderless'
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
      <Select
        native
        styleType='borderless'
        defaultValue={'1'}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />

      {/* Expected error: */}
      {/* (borderless + defaultValue) with placeholder (both selects) */}
      {/* Error since placeholder should not be passed to borderless */}
      {/* @ts-expect-error (TS 2322) */}
      <Select
        styleType='borderless'
        defaultValue={'1'}
        placeholder={'Choose an option'}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
      {/* @ts-expect-error (TS 2322) */}
      <Select
        native
        styleType='borderless'
        defaultValue={'1'}
        placeholder={'Choose an option'}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
      <Select
        styleType='borderless'
        defaultValue={'1'}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
      <Select
        native
        styleType='borderless'
        defaultValue={'1'}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
    </>
  );
};
