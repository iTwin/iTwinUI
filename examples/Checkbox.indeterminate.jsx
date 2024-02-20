/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Checkbox } from '@itwin/itwinui-react';

export default () => {
  const [option1, setOption1] = React.useState(false);
  const [option2, setOption2] = React.useState(true);
  const allOptions = option1 && option2;
  const isIndeterminate = !(option1 && option2) && (option1 || option2);

  const onAllChange = (value) => {
    setOption1(value);
    setOption2(value);
  };

  return (
    <div className='demo-container'>
      <Checkbox
        label='Option 1'
        onChange={(event) => onAllChange(event.target.checked)}
        indeterminate={isIndeterminate}
        checked={allOptions}
      />
      <div className='demo-container demo-indented'>
        <Checkbox
          label='Option 1.1'
          checked={option1}
          onChange={(event) => setOption1(event.target.checked)}
        />
        <Checkbox
          label='Option 1.2'
          checked={option2}
          onChange={(event) => setOption2(event.target.checked)}
        />
      </div>
    </div>
  );
};
