/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { getUserColor, Avatar, AvatarProps } from '@itwin/itwinui-react';

export default {
  title: 'Core/Avatar',
  component: Avatar,
  args: {
    backgroundColor: getUserColor('Terry Rivers'),
    title: 'Terry Rivers',
    abbreviation: 'TR',
  },
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    id: { control: { disable: true } },
    image: { control: { disable: true } },
  },
} as Meta<AvatarProps>;

export const Basic: Story<AvatarProps> = (args) => {
  return (
    <Avatar
      abbreviation='TR'
      backgroundColor={getUserColor('Terry Rivers')}
      title='Terry Rivers'
      {...args}
    />
  );
};

export const WithImage: Story<AvatarProps> = (args) => {
  return (
    <Avatar
      size='large'
      abbreviation='TR'
      backgroundColor={getUserColor('Terry Rivers')}
      image={
        <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
      }
      title='Terry Rivers'
      {...args}
    />
  );
};

WithImage.args = {
  size: 'large',
  image: (
    <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
  ),
};

export const Sizes: Story<AvatarProps> = (args) => {
  return (
    <div style={{ display: 'flex', gap: 4, placeItems: 'center' }}>
      <Avatar
        size='small'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
        title='Terry Rivers'
        {...args}
      />
      <Avatar
        size='medium'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
        title='Terry Rivers'
        {...args}
      />
      <Avatar
        size='large'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
        title='Terry Rivers'
        {...args}
      />
      <Avatar
        size='x-large'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
        title='Terry Rivers'
        {...args}
      />
    </div>
  );
};

Sizes.argTypes = {
  size: { control: { disable: true } },
};

export const Statuses: Story<AvatarProps> = (args) => {
  return (
    <div style={{ display: 'flex', gap: 4, placeItems: 'center' }}>
      <Avatar
        size='large'
        status='online'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
        title='Terry Rivers'
        {...args}
      />
      <Avatar
        size='large'
        status='offline'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
        title='Terry Rivers'
        {...args}
      />
      <Avatar
        size='large'
        status='busy'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
        title='Terry Rivers'
        {...args}
      />
      <Avatar
        size='large'
        status='away'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
        title='Terry Rivers'
        {...args}
      />
    </div>
  );
};

Statuses.args = {
  size: 'large',
};

Statuses.argTypes = {
  status: { control: { disable: true } },
};

export const CustomStatusTranslation: Story<AvatarProps> = (args) => {
  return (
    <Avatar
      size='large'
      abbreviation='TR'
      backgroundColor={getUserColor('Terry Rivers')}
      status='away'
      title='Terry Rivers'
      translatedStatusTitles={{
        away: 'AFK',
        busy: 'Do not disturb!',
        offline: 'Disconnected',
        online: 'Available',
      }}
      {...args}
    />
  );
};

CustomStatusTranslation.args = {
  size: 'large',
  status: 'away',
  abbreviation: 'TR',
  translatedStatusTitles: {
    away: 'AFK',
    busy: 'Do not disturb!',
    offline: 'Disconnected',
    online: 'Available',
  },
};
