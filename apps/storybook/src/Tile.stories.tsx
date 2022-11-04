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
  Avatar,
} from '@itwin/itwinui-react';
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
    id: { control: { disable: true } },
    variant: { control: 'radio', options: ['default', 'folder'] },
  },
  args: {
    variant: 'default',
    isDisabled: false,
    isNew: false,
    isLoading: false,
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
  badge: <Badge backgroundColor='hsl(197, 71%, 83%)'>Badge</Badge>,
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
    isSelected = true,
    isNew,
    moreOptions,
    isActionable = true,
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
      isActionable={isActionable}
      {...rest}
    />
  );
};
AllProps.argTypes = {
  ...Basic.argTypes,
  variant: { control: { disable: true } },
};
AllProps.args = {
  ...Basic.args,
  isSelected: true,
  isActionable: true,
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

export const Actionable: Story<TileProps> = (props) => {
  const {
    name,
    description = 'If you click on this stadium, it is going to be selected.',
    metadata,
    badge,
    thumbnail,
    isNew,
    isActionable = true,
    ...rest
  } = props;
  const [selected, setSelected] = React.useState(false);

  return (
    <Tile
      name={name}
      description={description}
      metadata={metadata}
      badge={badge}
      thumbnail={thumbnail}
      isSelected={selected}
      isNew={isNew}
      isActionable={isActionable}
      {...rest}
      onClick={() => setSelected((prev) => !prev)}
    />
  );
};
Actionable.argTypes = { ...Basic.argTypes };
Actionable.args = {
  ...Basic.args,
  description: 'If you click on this stadium, it is going to be selected.',
  isActionable: true,
  moreOptions: undefined,
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

export const WithAvatar: Story<TileProps> = (props) => {
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
WithAvatar.argTypes = {
  ...Basic.argTypes,
  thumbnail: { control: { disable: true } },
};
WithAvatar.args = {
  ...Basic.args,
  name: 'Some User',
  description: 'User description',
  metadata: undefined,
  thumbnail: (
    <Avatar
      size='x-large'
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
  variant: { control: { disable: true } },
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

export const Status: Story<TileProps> = (props) => {
  const {
    name,
    description,
    metadata,
    thumbnail,
    moreOptions,
    status,
    ...rest
  } = props;
  return (
    <Tile
      name={name}
      description={description}
      metadata={metadata}
      thumbnail={thumbnail}
      moreOptions={moreOptions}
      status={status}
      {...rest}
    />
  );
};
Status.argTypes = {
  ...Basic.argTypes,
  thumbnail: { control: { disable: true } },
  status: { control: 'radio', options: ['positive', 'warning', 'negative'] },
};
Status.args = {
  ...Basic.args,
  status: 'positive',
  name: 'Tile name',
  description: 'Description',
  metadata: <span>Tile with status</span>,
  badge: undefined,
  thumbnail: <SvgImodelHollow />,
};

export const Loading: Story<TileProps> = (props) => {
  const {
    name,
    description,
    metadata,
    thumbnail,
    moreOptions,
    isLoading,
    ...rest
  } = props;
  return (
    <Tile
      name={name}
      description={description}
      metadata={metadata}
      thumbnail={thumbnail}
      moreOptions={moreOptions}
      isLoading={isLoading}
      {...rest}
    />
  );
};
Loading.argTypes = {
  ...Basic.argTypes,
  thumbnail: { control: { disable: true } },
  isNew: { control: { disable: true } },
  isDisabled: { control: { disable: true } },
};
Loading.args = {
  ...Basic.args,
  isLoading: true,
  name: 'Tile name',
  description: 'Description',
  metadata: <span>Loading tile</span>,
  badge: undefined,
  thumbnail: <SvgImodelHollow />,
};

export const Disabled: Story<TileProps> = (props) => {
  const {
    name,
    description,
    metadata,
    thumbnail,
    moreOptions,
    isDisabled,
    buttons,
    ...rest
  } = props;
  return (
    <Tile
      name={name}
      description={description}
      metadata={metadata}
      thumbnail={thumbnail}
      moreOptions={moreOptions}
      isDisabled={isDisabled}
      buttons={buttons}
      {...rest}
    />
  );
};
Disabled.argTypes = {
  ...Basic.argTypes,
  thumbnail: { control: { disable: true } },
  isLoading: { control: { disable: true } },
};
Disabled.args = {
  ...Basic.args,
  thumbnail: <SvgImodelHollow />,
  buttons: <Button disabled>Button</Button>,
  isDisabled: true,
};
