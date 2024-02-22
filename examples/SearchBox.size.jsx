/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SearchBox } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <SearchBox size='small' inputProps={{ placeholder: 'Small search...' }} />
      <SearchBox inputProps={{ placeholder: 'Default search...' }} />
      <SearchBox size='large' inputProps={{ placeholder: 'Large search...' }} />
    </div>
  );
};
