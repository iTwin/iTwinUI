/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SearchBox } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <SearchBox
        status='positive'
        inputProps={{ placeholder: 'Positive search...' }}
      />
      <SearchBox
        status='warning'
        inputProps={{ placeholder: 'Warning search...' }}
      />
      <SearchBox
        status='negative'
        inputProps={{ placeholder: 'Negative search...' }}
      />
    </div>
  );
};
