/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { AvatarGroup, Avatar, getUserColor } from '@itwin/itwinui-react';

export default () => {
  return (
    <AvatarGroup iconSize='x-large'>
      <Avatar
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
      />
      <Avatar
        abbreviation='RM'
        backgroundColor={getUserColor('Robin Mercer')}
      />
      <Avatar abbreviation='MV' backgroundColor={getUserColor('Morgan Vera')} />
      <Avatar
        abbreviation='JM'
        backgroundColor={getUserColor('Jean Mullins')}
      />
      <Avatar
        abbreviation='AM'
        backgroundColor={getUserColor('Ashley Miles')}
      />
    </AvatarGroup>
  );
};
