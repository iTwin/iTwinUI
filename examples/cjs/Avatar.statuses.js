/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Avatar, getUserColor } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        gap: 'var(--iui-size-s)',
        placeItems: 'center',
      },
    },
    React.createElement(Avatar, {
      abbreviation: 'TR',
      backgroundColor: getUserColor('Terry Rivers'),
      title: 'Terry Rivers',
      size: 'x-large',
      status: 'online',
    }),
    React.createElement(Avatar, {
      abbreviation: 'RM',
      backgroundColor: getUserColor('Robin Mercer'),
      title: 'Robin Mercer',
      size: 'x-large',
      status: 'away',
    }),
    React.createElement(Avatar, {
      abbreviation: 'JM',
      backgroundColor: getUserColor('Jean Mullins'),
      title: 'Jean Mullins',
      size: 'x-large',
      status: 'busy',
    }),
    React.createElement(Avatar, {
      abbreviation: 'AM',
      backgroundColor: getUserColor('Ashley Miles'),
      title: 'Ashley Miles',
      size: 'x-large',
      status: 'offline',
    }),
  );
};
