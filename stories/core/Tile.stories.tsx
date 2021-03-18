// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import {
  Badge,
  Button,
  IconButton,
  MenuItem,
  Tag,
  TagContainer,
  Tile,
  TileProps,
} from '../../src/core';
import {
  SvgFolder,
  SvgImodel2,
  SvgInfo2,
  SvgStar,
  SvgTag2,
} from '@bentley/icons-generic-react';
import { LargeWithImageAndStatusOnline } from './UserIcons.stories';

export default {
  component: Tile,
  argTypes: {
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
  title: 'Core/Tile',
} as Meta<TileProps>;

export const Basic: Story<TileProps> = (props) => {
  const {
    name,
    description,
    metadata,
    badge,
    thumbnail,
    leftIcon,
    rightIcon,
    moreOptions,
    ...rest
  } = props;
  return (
    <Tile
      name={name}
      description={description}
      metadata={metadata}
      badge={badge}
      thumbnail={thumbnail}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      moreOptions={moreOptions}
      {...rest}
    />
  );
};

Basic.args = {
  name: 'Stadium',
  description: `National stadium in Singapore. Features landscape details and a metro station. This is the largest sample iModel.`,
  thumbnail: 'https://www.itwinjs.org/learning/tutorials/images/stadium.png',
  metadata: (
    <>
      <SvgTag2 />
      <TagContainer>
        <Tag variant='basic'>tag 1</Tag>
        <Tag variant='basic'>tag 2</Tag>
      </TagContainer>
    </>
  ),
  badge: <Badge backgroundColor='steelblue'>Badge</Badge>,
  moreOptions: [
    <MenuItem key={1} onClick={action('clicked item 1')}>
      Item 1
    </MenuItem>,
    <MenuItem key={2} onClick={action('clicked item 2')}>
      Item 2
    </MenuItem>,
  ],
};
Basic.argTypes = {
  metadata: { control: { disable: true } },
  moreOptions: { control: { disable: true } },
  buttons: { control: { disable: true } },
};

export const AllProps: Story<TileProps> = (props) => {
  const {
    name,
    description,
    metadata,
    badge,
    thumbnail,
    buttons,
    leftIcon,
    rightIcon,
    isSelected,
    isNew,
    moreOptions,
    ...rest
  } = props;
  return (
    <Tile
      name={name}
      description={description}
      metadata={metadata}
      badge={badge}
      thumbnail={thumbnail}
      buttons={buttons}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      isSelected={isSelected}
      isNew={isNew}
      moreOptions={moreOptions}
      {...rest}
    />
  );
};
AllProps.argTypes = { ...Basic.argTypes };
AllProps.args = {
  ...Basic.args,
  isSelected: true,
  leftIcon: (
    <IconButton styleType='borderless' onClick={action('clicked left icon')}>
      <SvgInfo2 />
    </IconButton>
  ),
  rightIcon: (
    <IconButton styleType='borderless' onClick={action('clicked right icon')}>
      <SvgStar />
    </IconButton>
  ),
  buttons: [
    <Button key={1} onClick={action('clicked left button')}>
      Manage
    </Button>,
    <Button key={2} onClick={action('clicked right button')}>
      Projects
    </Button>,
  ],
};

export const Condensed: Story<TileProps> = (props) => {
  const { name, thumbnail, moreOptions, ...rest } = props;
  return (
    <Tile
      name={name}
      thumbnail={thumbnail}
      moreOptions={moreOptions}
      {...rest}
    />
  );
};
Condensed.argTypes = { ...Basic.argTypes };
Condensed.args = {
  ...Basic.args,
  name: 'Condensed',
  description: undefined,
  metadata: undefined,
  badge: undefined,
  thumbnail: <SvgImodel2 />,
};

export const UserIcon: Story<TileProps> = (props) => {
  const { name, description, badge, thumbnail, moreOptions, ...rest } = props;
  return (
    <Tile
      name={name}
      description={description}
      badge={badge}
      thumbnail={thumbnail}
      moreOptions={moreOptions}
      {...rest}
    />
  );
};
UserIcon.argTypes = { ...Basic.argTypes };
UserIcon.args = {
  ...Basic.args,
  name: 'Some User',
  description: 'User description',
  metadata: undefined,
  thumbnail: <LargeWithImageAndStatusOnline />,
};

export const Folder: Story<TileProps> = (props) => {
  const {
    name,
    description,
    metadata,
    thumbnail,
    moreOptions,
    variant,
    ...rest
  } = props;
  return (
    <Tile
      name={name}
      description={description}
      metadata={metadata}
      thumbnail={thumbnail}
      moreOptions={moreOptions}
      variant={variant}
      {...rest}
    />
  );
};
Folder.argTypes = { ...Basic.argTypes };
Folder.args = {
  ...Basic.args,
  variant: 'folder',
  name: 'Folder name',
  description: 'Folder description',
  metadata: <span>Folder metadata</span>,
  badge: undefined,
  thumbnail: <SvgFolder />,
};
