/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Avatar, getUserColor } from '@itwin/itwinui-react';

export default () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: 'var(--iui-size-s)',
        placeItems: 'center',
      }}
    >
      <Avatar
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
        title='Terry Rivers'
        size='x-large'
        status='online'
      />
      <Avatar
        abbreviation='RM'
        backgroundColor={getUserColor('Robin Mercer')}
        title='Robin Mercer'
        size='x-large'
        status='away'
      />
      <Avatar
        abbreviation='JM'
        backgroundColor={getUserColor('Jean Mullins')}
        title='Jean Mullins'
        size='x-large'
        status='busy'
      />
      <Avatar
        abbreviation='AM'
        backgroundColor={getUserColor('Ashley Miles')}
        title='Ashley Miles'
        size='x-large'
        status='offline'
      />
    </div>
  );
};
