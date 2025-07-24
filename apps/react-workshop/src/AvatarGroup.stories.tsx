/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useState } from 'react';
import {
  getUserColor,
  Tooltip,
  Avatar,
  AvatarGroup,
} from '@itwin/itwinui-react';

export default {
  title: 'AvatarGroup',
};

export const Basic = () => {
  const userNames = [
    'Terry Rivers',
    'Robin Mercer',
    'Morgan Vera',
    'Ace Cash',
    'Tanner Fraser',
    'Ashley Miles',
    'Jean Mullins',
  ];

  return (
    <AvatarGroup iconSize='medium'>
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
  );
};

export const Animated = () => {
  const userNames = [
    'Terry Rivers',
    'Robin Mercer',
    'Morgan Vera',
    'Jean Mullins',
    'Ashley Miles',
  ];

  return (
    <AvatarGroup animated iconSize='medium'>
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
  );
};

export const ManyAvatars = () => {
  const userNames = [
    'Terry Rivers',
    'Robin Mercer',
    'Morgan Vera',
    'Ace Cash',
    'Tanner Fraser',
    'Ashley Miles',
    'Jean Mullins',
    'Nico Triplett',
    'Drew Abel',
    'Kendall Simons',
    'Kennedy Gray',
    'Charlie Mayfield',
    'Peyton Pennington',
    'Justice Harrington',
    'Jessie Dodd',
  ];

  return (
    <>
      <AvatarGroup iconSize='large'>
        {Array(110)
          .fill(null)
          .map((_, index) => userNames[index % userNames.length])
          .map((name, index) => (
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
    </>
  );
};

export const NonStacked = () => {
  const userNames = [
    'Terry Rivers',
    'Robin Mercer',
    'Morgan Vera',
    'Ashley Miles',
    'Jean Mullins',
    'Charlie Mayfield',
    'Peyton Pennington',
    'Justice Harrington',
  ];

  return (
    <AvatarGroup stacked={false} iconSize='medium'>
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
  );
};

export const WithTooltip = () => {
  const userNames = [
    'Terry Rivers',
    'Robin Mercer',
    'Morgan Vera',
    'Ashley Miles',
    'Jean Mullins',
    'Charlie Mayfield',
    'Peyton Pennington',
    'Justice Harrington',
  ];

  /**
   * Store the last avatar for tooltip positioning.
   */
  const [countIcon, setCountIcon] = useState<HTMLElement | null>(null);

  const usersSubArray = userNames.slice(5);
  const tooltipContent = usersSubArray.join(`\n`) as string;

  return (
    <>
      <AvatarGroup countIconProps={{ ref: setCountIcon }} iconSize='medium'>
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
        reference={countIcon}
        content={tooltipContent}
        placement='right'
        style={{ whiteSpace: 'pre' }}
      />
    </>
  );
};
