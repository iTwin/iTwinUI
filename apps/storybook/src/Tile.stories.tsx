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
  TileNew,
  TileNewProps,
  Tile,
  Avatar,
} from '@itwin/itwinui-react';
import SvgFolder from '@itwin/itwinui-icons-react/cjs/icons/Folder';
import SvgImodelHollow from '@itwin/itwinui-icons-react/cjs/icons/ImodelHollow';
import SvgInfo from '@itwin/itwinui-icons-react/cjs/icons/Info';
import SvgStar from '@itwin/itwinui-icons-react/cjs/icons/Star';
import SvgTag from '@itwin/itwinui-icons-react/cjs/icons/Tag';

type TileProps = React.ComponentProps<typeof Tile>;

export default {
  component: TileNew,
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
} as Meta<TileNewProps>;

export const Basic: Story<TileNewProps> = (args) => {
  return (
    <TileNew {...args}>
      <TileNew.Name>Stadium</TileNew.Name>
      <TileNew.ThumbnailArea>
        <TileNew.Badge>
          <Badge backgroundColor='hsl(197, 71%, 83%)'>Badge</Badge>
        </TileNew.Badge>
        <TileNew.ThumbnailPicture url='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
      </TileNew.ThumbnailArea>
      <TileNew.ContentArea>
        <TileNew.Description>
          National stadium in Singapore. Features landscape details and a metro
          station. This is the largest sample iModel.
        </TileNew.Description>
        <TileNew.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </TileNew.MoreOptions>
        <TileNew.Metadata>
          <SvgTag />
          <TagContainer>
            <Tag variant='basic'>tag 1</Tag>
            <Tag variant='basic'>tag 2</Tag>
          </TagContainer>
        </TileNew.Metadata>
      </TileNew.ContentArea>
    </TileNew>
  );
};

export const AllProps: Story<TileNewProps> = (args) => {
  return (
    <TileNew {...args}>
      <TileNew.Name>Stadium</TileNew.Name>
      <TileNew.ThumbnailArea>
        <TileNew.Badge>
          <Badge backgroundColor='hsl(197, 71%, 83%)'>Badge</Badge>
        </TileNew.Badge>
        <TileNew.ThumbnailPicture url='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
        <TileNew.QuickAction>
          <IconButton
            styleType='borderless'
            onClick={action('clicked left icon')}
          >
            <SvgInfo />
          </IconButton>
        </TileNew.QuickAction>
        <TileNew.TypeIndicator>
          <IconButton
            styleType='borderless'
            onClick={action('clicked right icon')}
          >
            <SvgStar />
          </IconButton>
        </TileNew.TypeIndicator>
      </TileNew.ThumbnailArea>
      <TileNew.ContentArea>
        <TileNew.Description>
          National stadium in Singapore. Features landscape details and a metro
          station. This is the largest sample iModel.
        </TileNew.Description>
        <TileNew.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </TileNew.MoreOptions>
        <TileNew.Metadata>
          <>
            <SvgTag />
            <TagContainer>
              <Tag variant='basic'>tag 1</Tag>
              <Tag variant='basic'>tag 2</Tag>
            </TagContainer>
          </>
        </TileNew.Metadata>
      </TileNew.ContentArea>
      <TileNew.Buttons>
        <Button key={1} onClick={action('clicked left button')}>
          Manage
        </Button>
        <Button key={2} onClick={action('clicked right button')}>
          Projects
        </Button>
      </TileNew.Buttons>
    </TileNew>
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

export const Actionable: Story<TileNewProps> = (args) => {
  const [selected, setSelected] = React.useState(false);
  return (
    <TileNew
      isSelected={selected}
      onClick={() => setSelected((prev) => !prev)}
      {...args}
    >
      <TileNew.Name>Stadium</TileNew.Name>
      <TileNew.ThumbnailArea>
        <TileNew.ThumbnailPicture url='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
        <TileNew.Badge>
          <Badge backgroundColor='hsl(197, 71%, 83%)'>Badge</Badge>
        </TileNew.Badge>
      </TileNew.ThumbnailArea>
      <TileNew.ContentArea>
        <TileNew.Description>
          If you click on this stadium, it is going to be selected.
        </TileNew.Description>
        <TileNew.Metadata>
          <SvgTag />
          <TagContainer>
            <Tag variant='basic'>tag 1</Tag>
            <Tag variant='basic'>tag 2</Tag>
          </TagContainer>
        </TileNew.Metadata>
      </TileNew.ContentArea>
    </TileNew>
  );
};
Actionable.argTypes = { ...Basic.argTypes };
Actionable.args = {
  ...Basic.args,
  isActionable: true,
};

export const AnchorLink: Story<TileNewProps> = (args) => {
  return (
    <TileNew {...args}>
      <TileNew.Name>
        <TileNew.Action href='https://inclusive-components.design/cards/'>
          Stadium
        </TileNew.Action>
      </TileNew.Name>
      <TileNew.ThumbnailArea>
        <TileNew.Badge>
          <Badge backgroundColor='hsl(197, 71%, 83%)'>Badge</Badge>
        </TileNew.Badge>
        <TileNew.ThumbnailPicture url='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
      </TileNew.ThumbnailArea>
      <TileNew.ContentArea>
        <TileNew.Description>
          If you click on this stadium, it is going to open another page.
        </TileNew.Description>
        <TileNew.Metadata>
          <SvgTag />
          <TagContainer>
            <Tag variant='basic'>tag 1</Tag>
            <Tag variant='basic'>tag 2</Tag>
          </TagContainer>
        </TileNew.Metadata>
      </TileNew.ContentArea>
    </TileNew>
  );
};
AnchorLink.argTypes = { ...Basic.argTypes };
AnchorLink.args = {
  ...Basic.args,
  isActionable: true,
};

export const Condensed: Story<TileNewProps> = (args) => {
  return (
    <TileNew {...args}>
      <TileNew.Name>Condensed</TileNew.Name>
      <TileNew.ThumbnailArea>
        <TileNew.ThumbnailPicture>
          <SvgImodelHollow />
        </TileNew.ThumbnailPicture>
      </TileNew.ThumbnailArea>
      <TileNew.ContentArea>
        <TileNew.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </TileNew.MoreOptions>
      </TileNew.ContentArea>
    </TileNew>
  );
};
Condensed.argTypes = {
  ...Basic.argTypes,
};
Condensed.args = {
  ...Basic.args,
};

export const WithAvatar: Story<TileNewProps> = (args) => {
  return (
    <TileNew {...args}>
      <TileNew.Name>Some User</TileNew.Name>
      <TileNew.ThumbnailArea>
        <TileNew.Badge>
          <Badge backgroundColor='hsl(197, 71%, 83%)'>Badge</Badge>
        </TileNew.Badge>
        <TileNew.ThumbnailPicture>
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
        </TileNew.ThumbnailPicture>
      </TileNew.ThumbnailArea>
      <TileNew.ContentArea>
        <TileNew.Description>User Description</TileNew.Description>
        <TileNew.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </TileNew.MoreOptions>
      </TileNew.ContentArea>
    </TileNew>
  );
};
WithAvatar.argTypes = {
  ...Basic.argTypes,
};
WithAvatar.args = {
  ...Basic.args,
};

export const Folder: Story<TileNewProps> = (args) => {
  return (
    <TileNew {...args}>
      <TileNew.ThumbnailArea>
        <TileNew.ThumbnailPicture>
          <SvgFolder />
        </TileNew.ThumbnailPicture>
      </TileNew.ThumbnailArea>
      <TileNew.Name>Folder name</TileNew.Name>
      <TileNew.ContentArea>
        <TileNew.Description>Folder description</TileNew.Description>
        <TileNew.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </TileNew.MoreOptions>
        <TileNew.Metadata>
          <span>Folder metadata</span>
        </TileNew.Metadata>
      </TileNew.ContentArea>
    </TileNew>
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

export const Status: Story<TileNewProps> = (args) => {
  return (
    <TileNew {...args}>
      <TileNew.Name>Tile name</TileNew.Name>
      <TileNew.ThumbnailArea>
        <TileNew.ThumbnailPicture>
          <SvgImodelHollow />
        </TileNew.ThumbnailPicture>
      </TileNew.ThumbnailArea>
      <TileNew.ContentArea>
        <TileNew.Description>Description</TileNew.Description>
        <TileNew.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </TileNew.MoreOptions>
        <TileNew.Metadata>
          <span>Tile with status</span>
        </TileNew.Metadata>
      </TileNew.ContentArea>
    </TileNew>
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

export const Loading: Story<TileNewProps> = (args) => {
  return (
    <TileNew {...args}>
      <TileNew.Name>Tile name</TileNew.Name>
      <TileNew.ThumbnailArea>
        <TileNew.ThumbnailPicture>
          <SvgImodelHollow />
        </TileNew.ThumbnailPicture>
      </TileNew.ThumbnailArea>
      <TileNew.ContentArea>
        <TileNew.Description>Description</TileNew.Description>
        <TileNew.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </TileNew.MoreOptions>
        <TileNew.Metadata>
          <span>Loading tile</span>
        </TileNew.Metadata>
      </TileNew.ContentArea>
    </TileNew>
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

export const Disabled: Story<TileNewProps> = (args) => {
  return (
    <TileNew {...args}>
      <TileNew.Name>Tile name</TileNew.Name>
      <TileNew.ThumbnailArea>
        <TileNew.Badge>
          <Badge backgroundColor='hsl(197, 71%, 83%)'>Badge</Badge>
        </TileNew.Badge>
        <TileNew.ThumbnailPicture>
          <SvgImodelHollow />
        </TileNew.ThumbnailPicture>
      </TileNew.ThumbnailArea>
      <TileNew.ContentArea>
        <TileNew.Description>Description</TileNew.Description>
        <TileNew.MoreOptions>
          <MenuItem key={1} onClick={action('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem key={2} onClick={action('clicked item 2')}>
            Item 2
          </MenuItem>
        </TileNew.MoreOptions>
        <TileNew.Metadata>
          <span>Loading tile</span>
        </TileNew.Metadata>
      </TileNew.ContentArea>
      <TileNew.Buttons>
        <Button disabled>Button</Button>
      </TileNew.Buttons>
    </TileNew>
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
