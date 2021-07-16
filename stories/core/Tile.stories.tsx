/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import {
  Badge,
  Button,
  getUserColor,
  IconButton,
  MenuItem,
  Tag,
  TagContainer,
  Tile,
  TileProps,
  UserIcon,
} from '../../src/core';
import SvgFolder from '@itwin/itwinui-icons-react/cjs/icons/Folder';
import SvgImodelHollow from '@itwin/itwinui-icons-react/cjs/icons/ImodelHollow';
import SvgInfo from '@itwin/itwinui-icons-react/cjs/icons/Info';
import SvgStar from '@itwin/itwinui-icons-react/cjs/icons/Star';
import SvgTag from '@itwin/itwinui-icons-react/cjs/icons/Tag';

export default {
  component: Tile,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
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
  thumbnail: 'https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png',
  metadata: (
    <>
      <SvgTag />
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
  leftIcon: { control: { disable: true } },
  rightIcon: { control: { disable: true } },
  badge: { control: { disable: true } },
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
      <SvgInfo />
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
Condensed.argTypes = {
  ...Basic.argTypes,
  thumbnail: { control: { disable: true } },
};
Condensed.args = {
  ...Basic.args,
  name: 'Condensed',
  description: undefined,
  metadata: undefined,
  badge: undefined,
  thumbnail: <SvgImodelHollow />,
};

export const WithUserIcon: Story<TileProps> = (props) => {
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
WithUserIcon.argTypes = {
  ...Basic.argTypes,
  thumbnail: { control: { disable: true } },
};
WithUserIcon.args = {
  ...Basic.args,
  name: 'Some User',
  description: 'User description',
  metadata: undefined,
  thumbnail: (
    <UserIcon
      size='large'
      status='online'
      abbreviation='TR'
      backgroundColor={getUserColor('Terry Rivers')}
      image={
        <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
      }
      title='Terry Rivers'
    />
  ),
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
Folder.argTypes = {
  ...Basic.argTypes,
  thumbnail: { control: { disable: true } },
};
Folder.args = {
  ...Basic.args,
  variant: 'folder',
  name: 'Folder name',
  description: 'Folder description',
  metadata: <span>Folder metadata</span>,
  badge: undefined,
  thumbnail: <SvgFolder />,
};
