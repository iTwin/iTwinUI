/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { getUserColor, UserIcon } from '../../src/core';
import { UserIconProps } from '../../src/core/UserIcon/UserIcon';

export default {
  title: 'Core/UserIcon',
  component: UserIcon,
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
} as Meta<UserIconProps>;

export const Basic: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      abbreviation='TR'
      backgroundColor={getUserColor('Terry Rivers')}
      title='Terry Rivers'
      {...args}
    />
  );
};

export const WithImage: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
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

export const Sizes: Story<UserIconProps> = (args) => {
  return (
    <div style={{ display: 'flex', gap: 4, placeItems: 'center' }}>
      <UserIcon
        size='small'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
        title='Terry Rivers'
        {...args}
      />
      <UserIcon
        size='medium'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
        title='Terry Rivers'
        {...args}
      />
      <UserIcon
        size='large'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
        title='Terry Rivers'
        {...args}
      />
      <UserIcon
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

export const Statuses: Story<UserIconProps> = (args) => {
  return (
    <div style={{ display: 'flex', gap: 4, placeItems: 'center' }}>
      <UserIcon
        size='large'
        status='online'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
        title='Terry Rivers'
        {...args}
      />
      <UserIcon
        size='large'
        status='offline'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
        title='Terry Rivers'
        {...args}
      />
      <UserIcon
        size='large'
        status='busy'
        abbreviation='TR'
        backgroundColor={getUserColor('Terry Rivers')}
        title='Terry Rivers'
        {...args}
      />
      <UserIcon
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

export const CustomStatusTranslation: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
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
