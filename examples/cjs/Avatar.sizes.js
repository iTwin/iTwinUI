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
      size: 'small',
      title: 'Terry Rivers',
    }),
    React.createElement(Avatar, {
      abbreviation: 'RM',
      backgroundColor: getUserColor('Robin Mercer'),
      size: 'medium',
      title: 'Robin Mercer',
    }),
    React.createElement(Avatar, {
      abbreviation: 'MV',
      backgroundColor: getUserColor('Morgan Vera'),
      size: 'large',
      title: 'Morgan Vera',
    }),
    React.createElement(Avatar, {
      abbreviation: 'JM',
      backgroundColor: getUserColor('Jean Mullins'),
      size: 'x-large',
      title: 'Jean Mullins',
    }),
  );
};
