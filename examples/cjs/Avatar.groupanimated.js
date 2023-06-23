/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { AvatarGroup, Avatar, getUserColor } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    AvatarGroup,
    { animated: true, iconSize: 'x-large' },
    React.createElement(Avatar, {
      abbreviation: 'TR',
      backgroundColor: getUserColor('Terry Rivers'),
      title: 'Terry Rivers',
    }),
    React.createElement(Avatar, {
      abbreviation: 'RM',
      backgroundColor: getUserColor('Robin Mercer'),
      title: 'Robin Mercer',
    }),
    React.createElement(Avatar, {
      abbreviation: 'MV',
      backgroundColor: getUserColor('Morgan Vera'),
      title: 'Morgan Vera',
    }),
    React.createElement(Avatar, {
      abbreviation: 'JM',
      backgroundColor: getUserColor('Jean Mullins'),
      title: 'Jean Mullins',
    }),
    React.createElement(Avatar, {
      abbreviation: 'AM',
      backgroundColor: getUserColor('Ashley Miles'),
      title: 'Ashley Miles',
    }),
  );
};
