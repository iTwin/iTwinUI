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
        size='x-large'
        status='online'
      />
      <Avatar
        abbreviation='RM'
        backgroundColor={getUserColor('Robin Mercer')}
        size='x-large'
        status='away'
      />
      <Avatar
        abbreviation='JM'
        backgroundColor={getUserColor('Jean Mullins')}
        size='x-large'
        status='busy'
      />
      <Avatar
        abbreviation='AM'
        backgroundColor={getUserColor('Ashley Miles')}
        size='x-large'
        status='offline'
      />
    </div>
  );
};
