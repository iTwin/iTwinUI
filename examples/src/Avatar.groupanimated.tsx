/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { AvatarGroup, Avatar, getUserColor } from '@itwin/itwinui-react';

export default () => {
  return (
    <AvatarGroup animated iconSize='x-large'>
      <Avatar
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
        title='Terry Rivers'
      />
      <Avatar
        abbreviation='RM'
        backgroundColor={getUserColor('Robin Mercer')}
        title='Robin Mercer'
      />
      <Avatar
        abbreviation='MV'
        backgroundColor={getUserColor('Morgan Vera')}
        title='Morgan Vera'
      />
      <Avatar
        abbreviation='JM'
        backgroundColor={getUserColor('Jean Mullins')}
        title='Jean Mullins'
      />
      <Avatar
        abbreviation='AM'
        backgroundColor={getUserColor('Ashley Miles')}
        title='Ashley Miles'
      />
    </AvatarGroup>
  );
};
