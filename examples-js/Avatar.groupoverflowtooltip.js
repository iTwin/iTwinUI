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
  const avatarRef = React.useRef(null);
  const maxIcons = 3;
  const arrayLength = maxIcons;
  const usersSubArray = userNames.slice(arrayLength);
  const tooltipContent = usersSubArray.join(`\n`);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      AvatarGroup,
      {
        iconSize: 'x-large',
        maxIcons: maxIcons,
        countIconProps: { ref: avatarRef },
      },
      userNames.map((name, index) =>
        React.createElement(Avatar, {
          key: `${name}-${index}`,
          abbreviation: name
            .split(' ')
            .map((token) => token[0])
            .join(''),
          backgroundColor: getUserColor(name),
          title: name,
        }),
      ),
    ),
    React.createElement(Tooltip, {
      reference: avatarRef,
      content: tooltipContent,
      placement: 'right',
      style: { whiteSpace: 'pre' },
    }),
  );
};
