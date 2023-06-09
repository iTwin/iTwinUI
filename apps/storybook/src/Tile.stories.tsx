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

type TileProps = React.ComponentProps<typeof Tile>;

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

export const Basic: Story<TileProps> = (args) => {
  return (
    <Tile {...args}>
      <Tile.Name name='Stadium' />
      <Tile.ThumbnailArea>
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
        <Tile.ThumbnailPicture url='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>
          National stadium in Singapore. Features landscape details and a metro
          station. This is the largest sample iModel.
        </Tile.Description>
        <Tile.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </Tile.MoreOptions>
        <Tile.Metadata>
          <SvgTag />
          <TagContainer>
            <Tag variant='basic'>tag 1</Tag>
            <Tag variant='basic'>tag 2</Tag>
          </TagContainer>
        </Tile.Metadata>
      </Tile.ContentArea>
    </Tile>
  );
};

export const AllProps: Story<TileProps> = (args) => {
  return (
    <Tile {...args}>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Stadium</Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
        <Tile.ThumbnailPicture url='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
        <Tile.TypeIndicator>
          <Tile.IconButton>
            <SvgStar />
          </Tile.IconButton>
        </Tile.TypeIndicator>
        <Tile.QuickAction>
          <Tile.IconButton>
            <SvgInfo />
          </Tile.IconButton>
        </Tile.QuickAction>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>
          National stadium in Singapore. Features landscape details and a metro
          station. This is the largest sample iModel.
        </Tile.Description>
        <Tile.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </Tile.MoreOptions>
        <Tile.Metadata>
          <SvgTag />
          <TagContainer>
            <Tag variant='basic'>tag 1</Tag>
            <Tag variant='basic'>tag 2</Tag>
          </TagContainer>
        </Tile.Metadata>
      </Tile.ContentArea>
      <Tile.Buttons>
        <Button key={1} onClick={action('clicked left button')}>
          Manage
        </Button>
        <Button key={2} onClick={action('clicked right button')}>
          Projects
        </Button>
      </Tile.Buttons>
    </Tile>
  );
};
AllProps.argTypes = {
  ...Basic.argTypes,
  variant: { control: { disable: true } },
};
AllProps.args = {
  ...Basic.args,
  isActionable: true,
  isSelected: true,
};

export const Actionable: Story<TileProps> = (args) => {
  const [selected, setSelected] = React.useState(false);
  return (
    <Tile
      isSelected={selected}
      onClick={() => setSelected((prev) => !prev)}
      {...args}
    >
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Stadium</Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture url='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>
          If you click on this stadium, it is going to be selected.
        </Tile.Description>
        <Tile.Metadata>
          <SvgTag />
          <TagContainer>
            <Tag variant='basic'>tag 1</Tag>
            <Tag variant='basic'>tag 2</Tag>
          </TagContainer>
        </Tile.Metadata>
      </Tile.ContentArea>
    </Tile>
  );
};
Actionable.argTypes = { ...Basic.argTypes };
Actionable.args = {
  ...Basic.args,
  isActionable: true,
};

export const AnchorLink: Story<TileProps> = (args) => {
  return (
    <Tile {...args}>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>
          <Tile.Action href='https://inclusive-components.design/cards/'>
            Stadium
          </Tile.Action>
        </Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
        <Tile.ThumbnailPicture url='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>
          If you click on this stadium, it is going to open another page.
        </Tile.Description>
        <Tile.Metadata>
          <SvgTag />
          <TagContainer>
            <Tag variant='basic'>tag 1</Tag>
            <Tag variant='basic'>tag 2</Tag>
          </TagContainer>
        </Tile.Metadata>
      </Tile.ContentArea>
    </Tile>
  );
};
AnchorLink.argTypes = { ...Basic.argTypes };
AnchorLink.args = {
  ...Basic.args,
  isActionable: true,
};

export const Condensed: Story<TileProps> = (args) => {
  return (
    <Tile {...args}>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Condensed</Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture>
          <SvgImodelHollow />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </Tile.MoreOptions>
      </Tile.ContentArea>
    </Tile>
  );
};
Condensed.argTypes = {
  ...Basic.argTypes,
};
Condensed.args = {
  ...Basic.args,
};

export const WithAvatar: Story<TileProps> = (args) => {
  return (
    <Tile {...args}>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Some User</Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
        <Tile.ThumbnailPicture>
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
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>User Description</Tile.Description>
        <Tile.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </Tile.MoreOptions>
      </Tile.ContentArea>
    </Tile>
  );
};
WithAvatar.argTypes = {
  ...Basic.argTypes,
};
WithAvatar.args = {
  ...Basic.args,
};

export const Folder: Story<TileProps> = (args) => {
  return (
    <Tile {...args}>
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture>
          <SvgFolder />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Folder Name</Tile.NameLabel>
      </Tile.Name>
      <Tile.ContentArea>
        <Tile.Description>Folder description</Tile.Description>
        <Tile.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </Tile.MoreOptions>
        <Tile.Metadata>
          <span>Folder metadata</span>
        </Tile.Metadata>
      </Tile.ContentArea>
    </Tile>
  );
};
Folder.argTypes = {
  ...Basic.argTypes,
  variant: { control: { disable: true } },
};
Folder.args = {
  ...Basic.args,
  variant: 'folder',
};

export const Status: Story<TileProps> = (args) => {
  return (
    <Tile {...args}>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Tile Name</Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture>
          <SvgImodelHollow />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>Description</Tile.Description>
        <Tile.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </Tile.MoreOptions>
        <Tile.Metadata>
          <span>Tile with status</span>
        </Tile.Metadata>
      </Tile.ContentArea>
    </Tile>
  );
};
Status.argTypes = {
  ...Basic.argTypes,
  status: { control: 'radio', options: ['positive', 'warning', 'negative'] },
};
Status.args = {
  ...Basic.args,
  status: 'positive',
};

export const Loading: Story<TileProps> = (args) => {
  return (
    <Tile {...args}>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Tile Name</Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture>
          <SvgImodelHollow />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>Description</Tile.Description>
        <Tile.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </Tile.MoreOptions>
        <Tile.Metadata>
          <span>Loading tile</span>
        </Tile.Metadata>
      </Tile.ContentArea>
    </Tile>
  );
};
Loading.argTypes = {
  ...Basic.argTypes,
  isNew: { control: { disable: true } },
  isDisabled: { control: { disable: true } },
};
Loading.args = {
  ...Basic.args,
  isLoading: true,
};

export const Disabled: Story<TileProps> = (args) => {
  return (
    <Tile {...args}>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Tile Name</Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
        <Tile.ThumbnailPicture>
          <SvgImodelHollow />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>Description</Tile.Description>
        <Tile.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </Tile.MoreOptions>
        <Tile.Metadata>
          <SvgTag />
          <TagContainer>
            <Tag variant='basic'>tag 1</Tag>
            <Tag variant='basic'>tag 2</Tag>
          </TagContainer>
        </Tile.Metadata>
      </Tile.ContentArea>
      <Tile.Buttons>
        <Button disabled>Button</Button>
      </Tile.Buttons>
    </Tile>
  );
};
Disabled.argTypes = {
  ...Basic.argTypes,
  isLoading: { control: { disable: true } },
};
Disabled.args = {
  ...Basic.args,
  isDisabled: true,
};
