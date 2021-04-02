/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { UserIcon } from '../../src/core';
import { UserIconProps } from '../../src/core/UserIcon/UserIcon';

export default {
  title: 'Core/UserIcon',
  component: UserIcon,
  argTypes: {
    backgroundColor: {
      control: 'color',
      defaultValue: 'green',
    },
    title: {
      defaultValue: 'Terry Rivers',
    },
    className: { control: { disable: true } },
    style: { control: { disable: true } },
  },
} as Meta<UserIconProps>;

export const Small: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='small'
      abbreviation='TR'
      backgroundColor='green'
      title='Terry Rivers'
      {...args}
    />
  );
};

Small.argTypes = {
  size: {
    defaultValue: 'small',
  },
  abbreviation: {
    defaultValue: 'TR',
  },
};

export const SmallWithImage: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='small'
      abbreviation='TR'
      backgroundColor='green'
      image={
        <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
      }
      title='Terry Rivers'
      {...args}
    />
  );
};

SmallWithImage.argTypes = {
  size: {
    defaultValue: 'small',
  },
  image: {
    defaultValue: (
      <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
    ),
  },
};

export const Medium: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='TR'
      backgroundColor='green'
      title='Terry Rivers'
      {...args}
    />
  );
};

Medium.argTypes = {
  size: {
    defaultValue: 'medium',
  },
  abbreviation: {
    defaultValue: 'TR',
  },
};

export const MediumWithImage: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='TR'
      backgroundColor='green'
      image={
        <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
      }
      title='Terry Rivers'
      {...args}
    />
  );
};

MediumWithImage.argTypes = {
  size: {
    defaultValue: 'medium',
  },
  image: {
    defaultValue: (
      <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
    ),
  },
};

export const Large: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='TR'
      backgroundColor='green'
      title='Terry Rivers'
      {...args}
    />
  );
};

Large.argTypes = {
  size: {
    defaultValue: 'large',
  },
  abbreviation: {
    defaultValue: 'TR',
  },
};

export const LargeWithImage: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='TR'
      backgroundColor='green'
      image={
        <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
      }
      title='Terry Rivers'
      {...args}
    />
  );
};

LargeWithImage.argTypes = {
  size: {
    defaultValue: 'large',
  },
  image: {
    defaultValue: (
      <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
    ),
  },
};

export const XLarge: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='x-large'
      abbreviation='TR'
      backgroundColor='green'
      title='Terry Rivers'
      {...args}
    />
  );
};

XLarge.argTypes = {
  size: {
    defaultValue: 'x-large',
  },
  abbreviation: {
    defaultValue: 'TR',
  },
};

export const XLargeWithImage: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='x-large'
      abbreviation='TR'
      backgroundColor='green'
      image={
        <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
      }
      title='Terry Rivers'
      {...args}
    />
  );
};

XLargeWithImage.argTypes = {
  size: {
    defaultValue: 'x-large',
  },
  image: {
    defaultValue: (
      <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
    ),
  },
};

export const MediumWithStatusOnline: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='TR'
      backgroundColor='green'
      status='online'
      title='Terry Rivers'
      {...args}
    />
  );
};

MediumWithStatusOnline.argTypes = {
  size: {
    defaultValue: 'medium',
  },
  status: {
    defaultValue: 'online',
  },
  abbreviation: {
    defaultValue: 'TR',
  },
};

export const MediumWithImageAndStatusOnline: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='TR'
      backgroundColor='green'
      image={
        <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
      }
      status='online'
      title='Terry Rivers'
      {...args}
    />
  );
};

MediumWithImageAndStatusOnline.argTypes = {
  size: {
    defaultValue: 'medium',
  },
  status: {
    defaultValue: 'online',
  },
  image: {
    defaultValue: (
      <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
    ),
  },
};

export const MediumWithStatusOffline: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='TR'
      backgroundColor='green'
      status='offline'
      title='Terry Rivers'
      {...args}
    />
  );
};

MediumWithStatusOffline.argTypes = {
  size: {
    defaultValue: 'medium',
  },
  status: {
    defaultValue: 'offline',
  },
  abbreviation: {
    defaultValue: 'TR',
  },
};

export const MediumWithImageAndStatusOffline: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='TR'
      backgroundColor='green'
      image={
        <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
      }
      status='offline'
      title='Terry Rivers'
      {...args}
    />
  );
};

MediumWithImageAndStatusOffline.argTypes = {
  size: {
    defaultValue: 'medium',
  },
  status: {
    defaultValue: 'offline',
  },
  image: {
    defaultValue: (
      <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
    ),
  },
};

export const MediumWithStatusAway: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='TR'
      backgroundColor='green'
      status='away'
      title='Terry Rivers'
      {...args}
    />
  );
};

MediumWithStatusAway.argTypes = {
  size: {
    defaultValue: 'medium',
  },
  status: {
    defaultValue: 'away',
  },
  abbreviation: {
    defaultValue: 'TR',
  },
};

export const MediumWithImageAndStatusAway: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='TR'
      backgroundColor='green'
      image={
        <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
      }
      status='away'
      title='Terry Rivers'
      {...args}
    />
  );
};

MediumWithImageAndStatusAway.argTypes = {
  size: {
    defaultValue: 'medium',
  },
  status: {
    defaultValue: 'away',
  },
  image: {
    defaultValue: (
      <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
    ),
  },
};

export const MediumWithStatusBusy: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='TR'
      backgroundColor='green'
      status='busy'
      title='Terry Rivers'
      {...args}
    />
  );
};

MediumWithStatusBusy.argTypes = {
  size: {
    defaultValue: 'medium',
  },
  status: {
    defaultValue: 'busy',
  },
  abbreviation: {
    defaultValue: 'TR',
  },
};

export const MediumWithImageAndStatusBusy: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='TR'
      backgroundColor='green'
      image={
        <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
      }
      status='busy'
      title='Terry Rivers'
      {...args}
    />
  );
};

MediumWithImageAndStatusBusy.argTypes = {
  size: {
    defaultValue: 'medium',
  },
  status: {
    defaultValue: 'busy',
  },
  image: {
    defaultValue: (
      <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
    ),
  },
};

export const LargeWithStatusOnline: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='TR'
      backgroundColor='green'
      status='online'
      title='Terry Rivers'
      {...args}
    />
  );
};

LargeWithStatusOnline.argTypes = {
  size: {
    defaultValue: 'large',
  },
  status: {
    defaultValue: 'online',
  },
  abbreviation: {
    defaultValue: 'TR',
  },
};

export const LargeWithImageAndStatusOnline: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='TR'
      backgroundColor='green'
      image={
        <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
      }
      status='online'
      title='Terry Rivers'
      {...args}
    />
  );
};

LargeWithImageAndStatusOnline.argTypes = {
  size: {
    defaultValue: 'large',
  },
  status: {
    defaultValue: 'online',
  },
  image: {
    defaultValue: (
      <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
    ),
  },
};

export const LargeWithStatusOffline: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='TR'
      backgroundColor='green'
      status='offline'
      title='Terry Rivers'
      {...args}
    />
  );
};

LargeWithStatusOffline.argTypes = {
  size: {
    defaultValue: 'large',
  },
  status: {
    defaultValue: 'offline',
  },
  abbreviation: {
    defaultValue: 'TR',
  },
};

export const LargeWithImageAndStatusOffline: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='TR'
      backgroundColor='green'
      image={
        <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
      }
      status='offline'
      title='Terry Rivers'
      {...args}
    />
  );
};

LargeWithImageAndStatusOffline.argTypes = {
  size: {
    defaultValue: 'large',
  },
  status: {
    defaultValue: 'offline',
  },
  image: {
    defaultValue: (
      <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
    ),
  },
};

export const LargeWithStatusAway: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='TR'
      backgroundColor='green'
      status='away'
      title='Terry Rivers'
      {...args}
    />
  );
};

LargeWithStatusAway.argTypes = {
  size: {
    defaultValue: 'large',
  },
  status: {
    defaultValue: 'away',
  },
  abbreviation: {
    defaultValue: 'TR',
  },
};

export const LargeWithImageAndStatusAway: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='TR'
      backgroundColor='green'
      image={
        <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
      }
      status='away'
      title='Terry Rivers'
      {...args}
    />
  );
};

LargeWithImageAndStatusAway.argTypes = {
  size: {
    defaultValue: 'large',
  },
  status: {
    defaultValue: 'away',
  },
  image: {
    defaultValue: (
      <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
    ),
  },
};

export const LargeWithStatusBusy: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='TR'
      backgroundColor='green'
      status='busy'
      title='Terry Rivers'
      {...args}
    />
  );
};

LargeWithStatusBusy.argTypes = {
  size: {
    defaultValue: 'large',
  },
  status: {
    defaultValue: 'busy',
  },
  abbreviation: {
    defaultValue: 'TR',
  },
};

export const LargeWithImageAndStatusBusy: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='TR'
      backgroundColor='green'
      image={
        <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
      }
      status='busy'
      title='Terry Rivers'
      {...args}
    />
  );
};

LargeWithImageAndStatusBusy.argTypes = {
  size: {
    defaultValue: 'large',
  },
  status: {
    defaultValue: 'busy',
  },
  image: {
    defaultValue: (
      <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
    ),
  },
};

export const CustomStatusTranslation: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='TR'
      backgroundColor='green'
      status='online'
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

CustomStatusTranslation.argTypes = {
  size: {
    defaultValue: 'large',
  },
  status: {
    defaultValue: 'online',
  },
  abbreviation: {
    defaultValue: 'TR',
  },
  translatedStatusTitles: {
    defaultValue: {
      away: 'AFK',
      busy: 'Do not disturb!',
      offline: 'Disconnected',
      online: 'Available',
    },
  },
};
