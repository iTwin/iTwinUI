/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Avatar, getUserColor } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <Avatar
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
        size='small'
      />
      <Avatar
        abbreviation='RM'
        backgroundColor={getUserColor('Robin Mercer')}
        size='medium'
      />
      <Avatar
        abbreviation='MV'
        backgroundColor={getUserColor('Morgan Vera')}
        size='large'
      />
      <Avatar
        abbreviation='JM'
        backgroundColor={getUserColor('Jean Mullins')}
        size='x-large'
      />
    </div>
  );
};
