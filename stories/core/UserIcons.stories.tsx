// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { UserIcon } from '../../src/core';
import { UserIconProps } from '../../src/core/UserIcon/UserIcon';

export default {
  title: 'UserIcon',
  component: UserIcon,
  parameters: {
    docs: { description: { component: 'Basic user icon component' } },
  },
  argTypes: {
    backgroundColor: {
      control: 'color',
      defaultValue: 'green',
    },
    title: {
      defaultValue: 'Greg Bentley',
    },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
} as Meta<UserIconProps>;

export const Small: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='small'
      abbreviation='GB'
      backgroundColor='green'
      title='Greg Bentley'
      {...args}
    />
  );
};

Small.argTypes = {
  size: {
    defaultValue: 'small',
  },
  abbreviation: {
    defaultValue: 'GB',
  },
};

export const SmallWithImage: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='small'
      abbreviation='GB'
      backgroundColor='green'
      image={
        <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
      }
      title='Greg Bentley'
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
      <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
    ),
  },
};

export const Medium: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='GB'
      backgroundColor='green'
      title='Greg Bentley'
      {...args}
    />
  );
};

Medium.argTypes = {
  size: {
    defaultValue: 'medium',
  },
  abbreviation: {
    defaultValue: 'GB',
  },
};

export const MediumWithImage: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='GB'
      backgroundColor='green'
      image={
        <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
      }
      title='Greg Bentley'
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
      <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
    ),
  },
};

export const Large: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='GB'
      backgroundColor='green'
      title='Greg Bentley'
      {...args}
    />
  );
};

Large.argTypes = {
  size: {
    defaultValue: 'large',
  },
  abbreviation: {
    defaultValue: 'GB',
  },
};

export const LargeWithImage: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='GB'
      backgroundColor='green'
      image={
        <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
      }
      title='Greg Bentley'
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
      <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
    ),
  },
};

export const XLarge: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='x-large'
      abbreviation='GB'
      backgroundColor='green'
      title='Greg Bentley'
      {...args}
    />
  );
};

XLarge.argTypes = {
  size: {
    defaultValue: 'x-large',
  },
  abbreviation: {
    defaultValue: 'GB',
  },
};

export const XLargeWithImage: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='x-large'
      abbreviation='GB'
      backgroundColor='green'
      image={
        <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
      }
      title='Greg Bentley'
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
      <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
    ),
  },
};

export const MediumWithStatusOnline: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='GB'
      backgroundColor='green'
      status='online'
      title='Greg Bentley'
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
    defaultValue: 'GB',
  },
};

export const MediumWithImageAndStatusOnline: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='GB'
      backgroundColor='green'
      image={
        <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
      }
      status='online'
      title='Greg Bentley'
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
      <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
    ),
  },
};

export const MediumWithStatusOffline: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='GB'
      backgroundColor='green'
      status='offline'
      title='Greg Bentley'
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
    defaultValue: 'GB',
  },
};

export const MediumWithImageAndStatusOffline: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='GB'
      backgroundColor='green'
      image={
        <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
      }
      status='offline'
      title='Greg Bentley'
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
      <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
    ),
  },
};

export const MediumWithStatusAway: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='GB'
      backgroundColor='green'
      status='away'
      title='Greg Bentley'
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
    defaultValue: 'GB',
  },
};

export const MediumWithImageAndStatusAway: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='GB'
      backgroundColor='green'
      image={
        <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
      }
      status='away'
      title='Greg Bentley'
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
      <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
    ),
  },
};

export const MediumWithStatusBusy: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='GB'
      backgroundColor='green'
      status='busy'
      title='Greg Bentley'
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
    defaultValue: 'GB',
  },
};

export const MediumWithImageAndStatusBusy: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='medium'
      abbreviation='GB'
      backgroundColor='green'
      image={
        <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
      }
      status='busy'
      title='Greg Bentley'
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
      <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
    ),
  },
};

export const LargeWithStatusOnline: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='GB'
      backgroundColor='green'
      status='online'
      title='Greg Bentley'
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
    defaultValue: 'GB',
  },
};

export const LargeWithImageAndStatusOnline: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='GB'
      backgroundColor='green'
      image={
        <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
      }
      status='online'
      title='Greg Bentley'
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
      <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
    ),
  },
};

export const LargeWithStatusOffline: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='GB'
      backgroundColor='green'
      status='offline'
      title='Greg Bentley'
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
    defaultValue: 'GB',
  },
};

export const LargeWithImageAndStatusOffline: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='GB'
      backgroundColor='green'
      image={
        <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
      }
      status='offline'
      title='Greg Bentley'
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
      <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
    ),
  },
};

export const LargeWithStatusAway: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='GB'
      backgroundColor='green'
      status='away'
      title='Greg Bentley'
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
    defaultValue: 'GB',
  },
};

export const LargeWithImageAndStatusAway: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='GB'
      backgroundColor='green'
      image={
        <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
      }
      status='away'
      title='Greg Bentley'
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
      <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
    ),
  },
};

export const LargeWithStatusBusy: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='GB'
      backgroundColor='green'
      status='busy'
      title='Greg Bentley'
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
    defaultValue: 'GB',
  },
};

export const LargeWithImageAndStatusBusy: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='GB'
      backgroundColor='green'
      image={
        <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
      }
      status='busy'
      title='Greg Bentley'
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
      <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
    ),
  },
};

export const CustomStatusTranslation: Story<UserIconProps> = (args) => {
  return (
    <UserIcon
      size='large'
      abbreviation='GB'
      backgroundColor='green'
      status='online'
      title='Greg Bentley'
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
    defaultValue: 'GB',
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
