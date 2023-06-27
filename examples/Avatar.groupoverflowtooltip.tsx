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
  const avatarRef = React.useRef<HTMLDivElement>(null);
  const setReference = (setTooltipRef: (ref: HTMLElement) => void) => {
    avatarRef.current && setTooltipRef(avatarRef.current);
  };

  const maxIcons = 3;
  const arrayLength = maxIcons;
  const usersSubArray = userNames.slice(arrayLength);
  const tooltipContent = usersSubArray.join(`\n`) as string;

  return (
    <>
      <AvatarGroup
        iconSize='x-large'
        maxIcons={maxIcons}
        countIconProps={{ ref: avatarRef }}
      >
        {userNames.map((name, index) => (
          <Avatar
            key={`${name}-${index}`}
            abbreviation={name
              .split(' ')
              .map((token) => token[0])
              .join('')}
            backgroundColor={getUserColor(name)}
            title={name}
          />
        ))}
      </AvatarGroup>
      <Tooltip
        setReference={(refFunction) => setReference(refFunction)}
        content={tooltipContent}
        placement='right'
        style={{ whiteSpace: 'pre' }}
      />
    </>
  );
};
