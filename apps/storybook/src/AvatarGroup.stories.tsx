/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import {
  getUserColor,
  Tooltip,
  Avatar,
  AvatarGroup,
  AvatarGroupProps,
} from '@itwin/itwinui-react';

export default {
  component: AvatarGroup,
  subcomponents: { Avatar },
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    id: { control: { disable: true } },
    children: { control: { disable: true } },
  },
  title: 'Core/AvatarGroup',
} as Meta<AvatarGroupProps>;

export const Basic: Story<AvatarGroupProps> = (args) => {
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
    <AvatarGroup {...args}>
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
  );
};

Basic.args = {
  animated: false,
  iconSize: 'medium',
};

export const Animated: Story<AvatarGroupProps> = (args) => {
  const userNames = [
    'Terry Rivers',
    'Robin Mercer',
    'Morgan Vera',
    'Jean Mullins',
    'Ashley Miles',
  ];

  return (
    <AvatarGroup animated {...args}>
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
  );
};

Animated.args = {
  animated: true,
  iconSize: 'medium',
};

export const ManyAvatars: Story<AvatarGroupProps> = (args) => {
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
      <AvatarGroup {...args}>
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
              title={name}
            />
          ))}
      </AvatarGroup>
    </>
  );
};

ManyAvatars.args = {
  animated: false,
  iconSize: 'large',
};

export const NonStacked: Story<AvatarGroupProps> = (args) => {
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
    <AvatarGroup stacked={false} {...args}>
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
  );
};

NonStacked.args = {
  animated: false,
  stacked: false,
  iconSize: 'medium',
};

export const WithTooltip: Story<AvatarGroupProps> = (args) => {
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
   * Ref is set on the last avatar for tooltip positioning.
   */
  const avatarRef = React.useRef<HTMLDivElement>(null);

  const arrayLength = args.maxIcons;
  const usersSubArray = userNames.slice(arrayLength);
  const tooltipContent = usersSubArray.join(`\n`) as string;

  return (
    <>
      <AvatarGroup {...args} countIconProps={{ ref: avatarRef }}>
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
        reference={avatarRef}
        content={tooltipContent}
        placement='right'
        style={{ whiteSpace: 'pre' }}
      />
    </>
  );
};

WithTooltip.args = {
  animated: false,
  iconSize: 'medium',
};
