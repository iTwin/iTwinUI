/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * This test file tests some LabeledSelect type related cases that have not been tested in other files
 * (e.g. react-workshop, unit tests, etc.)
 */

import React from 'react';
import LabeledSelect from './LabeledSelect.js';

const App = () => {
  return (
    <>
      <LabeledSelect<string>
        label='Select Label'
        options={[
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
        ]}
        onChange={(value) => {
          console.log(value);
        }}
      />
    </>
  );
};

export default App;
