/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * This test file tests some LabeledSelect type related cases that have not been tested in other files
 * (e.g. react-workshop, unit tests, etc.)
 */

import { useRef } from 'react';
import { LabeledSelect } from './LabeledSelect.js';

() => {
  const ref = useRef(null);
  return (
    <>
      <LabeledSelect
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
      <LabeledSelect<number>
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
      <LabeledSelect<string>
        label='Select Label'
        options={[
          { value: '1', label: 'Item #1' },
          { value: '2', label: 'Item #2' },
          { value: '3', label: 'Item #3' },
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
      <LabeledSelect<string>
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
