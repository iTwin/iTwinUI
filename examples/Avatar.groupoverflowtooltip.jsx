/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  AvatarGroup,
  Avatar,
  getUserColor,
  Tooltip,
} from '@itwin/itwinui-react';

export default () => {
  const userNames = [
    'Terry Rivers',
    'Robin Mercer',
    'Morgan Vera',
    'Ashley Miles',
    'Jean Mullins',
    'Charlie Mayfield',
    'Peyton Pennington',
    'Justice Harrington',
    'Alex Gonzales',
    'Jordan Baker',
  ];

  /**
   * Ref is set on the last avatar for tooltip positioning.
   */
  const [avatarRef, setAvatarRef] = React.useState(null);

  const maxIcons = 3;
  const arrayLength = maxIcons;
  const usersSubArray = userNames.slice(arrayLength);
  const tooltipContent = usersSubArray.join(`\n`);

  return (
    <>
      <AvatarGroup
        iconSize='x-large'
        maxIcons={maxIcons}
        countIconProps={{ ref: setAvatarRef }}
      >
        {userNames.map((name, index) => (
          <Avatar
            key={`${name}-${index}`}
            abbreviation={name
              .split(' ')
              .map((token) => token[0])
              .join('')}
            backgroundColor={getUserColor(name)}
          />
        ))}
      </AvatarGroup>
      <Tooltip
        reference={avatarRef}
        content={tooltipContent}
        placement='right'
        style={{ whiteSpace: 'pre' }}
      />
    </>
  );
};
