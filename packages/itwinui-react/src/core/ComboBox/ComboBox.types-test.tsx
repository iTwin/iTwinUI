/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * This test file tests some ComboBox type related cases that have not been tested in other files
 * (e.g. react-workshop, unit tests, etc.)
 */

import { useRef } from 'react';
import { ComboBox } from './ComboBox.js';

() => {
  const ref = useRef(null);
  return (
    <ComboBox
      options={[
        { label: 'Item 1', value: 1 },
        { label: 'Item 2', value: 2 },
        { label: 'Item 3', value: 3 },
      ]}
      onChange={(value) => {
        const returnValue: number = value;
        return returnValue;
      }}
      ref={ref}
    />
  );
};

() => {
  return (
    <ComboBox<number>
      options={[
        { label: 'Item 1', value: 1 },
        { label: 'Item 2', value: 2 },
        { label: 'Item 3', value: 3 },
      ]}
      onChange={(value) => {
        const returnValue: number = value;
        return returnValue;
      }}
    />
  );
};

() => {
  return (
    <ComboBox<string>
      options={[
        { label: 'Item 1', value: `1` },
        { label: 'Item 2', value: `2` },
        { label: 'Item 3', value: `3` },
      ]}
      onChange={(value) => {
        const returnValue: string = value;
        return returnValue;
      }}
    />
  );
};

() => {
  return (
    <>
      <ComboBox
        options={[{ label: 'Item #1', value: 1 }]}
        onChange={(value) => {
          // There should be error: TS 2322
          // @ts-expect-error (TS 2322): Type 'number' is not assignable to type 'string'.
          const returnValue: string = value;
          return returnValue;
        }}
      />
    </>
  );
};
