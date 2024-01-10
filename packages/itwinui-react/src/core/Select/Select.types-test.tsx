/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * This test file tests some Select type related cases that have not been tested in other files
 * (e.g. react-workshop, unit tests, etc.)
 */

import React, { useRef } from 'react';
import Select from './Select.js';

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
