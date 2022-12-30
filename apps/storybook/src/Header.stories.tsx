/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  DropdownMenu,
  getUserColor,
  Header,
  HeaderBreadcrumbs,
  HeaderButton,
  HeaderLogo,
  HeaderProps,
  IconButton,
  Input,
  MenuExtraContent,
  MenuItem,
  Avatar,
  Text,
  Select,
  MenuDivider,
} from '@itwin/itwinui-react';
import SvgHelpCircularHollow from '@itwin/itwinui-icons-react/cjs/icons/HelpCircularHollow';
import SvgVersion from '@itwin/itwinui-icons-react/cjs/icons/Pin';
import SvgNetwork from '@itwin/itwinui-icons-react/cjs/icons/Network';
import SvgNotification from '@itwin/itwinui-icons-react/cjs/icons/Notification';
import { SvgImodel } from '@itwin/itwinui-icons-react';
import { useState } from '@storybook/addons';

export default {
  title: 'Core/Header',
  component: Header,
  subcomponents: {
    HeaderBreadcrumbs,
    HeaderLogo,
    HeaderButton,
  },
  argTypes: {
    appLogo: { control: { disable: true } },
    breadcrumbs: { control: { disable: true } },
    actions: { control: { disable: true } },
    menuItems: { control: { disable: true } },
    children: { control: { disable: true } },
    style: { control: { disable: true } },
    className: { control: { disable: true } },
    id: { control: { disable: true } },
  },
  args: {
    isSlim: false,
  },
} as Meta<HeaderProps>;

const buildClickHandler =
  (menu: string, close: () => void) => (item: string) => {
    action(`Menu '${menu}', ${item} clicked!`)();
    close();
  };

const buildMenu = (menu: string) => (close: () => void) =>
  [
    <MenuItem
      key={1}
      value={'Item #1'}
      onClick={buildClickHandler(menu, close)}
    >
      {menu} item #1
    </MenuItem>,
    <MenuItem
      key={2}
      value={'Item #2'}
      onClick={buildClickHandler(menu, close)}
    >
      {menu} item #2
    </MenuItem>,
    <MenuItem
      key={3}
      value={'Item #3'}
      onClick={buildClickHandler(menu, close)}
    >
      {menu} item #3
    </MenuItem>,
  ];

export const Full: Story<HeaderProps> = (args) => {
  const [userType, setUserType] = useState('User');

  const avatarMenuItems = (close: () => void) => [
    <MenuExtraContent key={0}>
      <>
        <Text variant='leading'>Terry Rivers</Text>
        <Text isMuted style={{ marginBottom: 8 }}>
          terry.rivers@email.com
        </Text>
        <Select
          options={[
            { value: 'User', label: 'User' },
            { value: 'Moderator', label: 'Moderator' },
            { value: 'Administrator', label: 'Administrator' },
          ]}
          value={userType}
          onChange={(type) => setUserType(type)}
        />
      </>
    </MenuExtraContent>,
    <MenuDivider key={1} />,
    <MenuItem
      key={2}
      value='View profile'
      onClick={buildClickHandler('Avatar', close)}
    >
      View profile
    </MenuItem>,
    <MenuItem
      key={3}
      value='Sign out'
      onClick={buildClickHandler('Avatar', close)}
    >
      Sign out
    </MenuItem>,
  ];

  return (
    <Header
      {...args}
      appLogo={
        <HeaderLogo
          logo={
            <svg
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
            >
              <path d='m12.6 13.4c-1.2-1.5-2.1-3.1-2.4-5.5-2.7 3.9-4.6 4.2-5.7 2.4l-1.2 5.7h-2.2l3.5-14.1 1.8-.4c-.1.5-1.4 6.2.6 7 2 .7 4.6-8.5 4.6-8.5l2.2.4c-1.6 3.7-1.6 7.6 1.1 10.9l-2.3 2.1' />
            </svg>
          }
          onClick={() => action('Clicked on the title')()}
        >
          Microstation
        </HeaderLogo>
      }
      breadcrumbs={
        <HeaderBreadcrumbs
          items={[
            <HeaderButton
              key='project'
              onClick={() => action('Clicked on the Project')()}
              menuItems={buildMenu('Project')}
              name='Project A (Super Size Edition)'
              description='YJC-2249'
              startIcon={<SvgNetwork />}
              disabled={true}
            />,
            <HeaderButton
              key='iModel'
              onClick={() => action('Clicked on the iModel')()}
              menuItems={buildMenu('iModel')}
              name='iModel B'
              startIcon={
                <img
                  src='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png'
                  style={{ objectFit: 'cover' }}
                />
              }
              isActive={true}
            />,
            <HeaderButton
              key='version'
              name='Version C'
              onClick={() => action('Clicked on the Version')()}
              startIcon={<SvgVersion />}
            />,
          ]}
        />
      }
      actions={[
        <IconButton
          key='notif'
          onClick={() => action('Clicked on the notification bell')()}
          styleType='borderless'
        >
          <SvgNotification />
        </IconButton>,
        <DropdownMenu key='help' menuItems={buildMenu('Help')}>
          <IconButton styleType='borderless'>
            <SvgHelpCircularHollow />
          </IconButton>
        </DropdownMenu>,
        <DropdownMenu key='avatar' menuItems={avatarMenuItems}>
          <IconButton styleType='borderless'>
            <Avatar
              size='medium'
              abbreviation='TR'
              backgroundColor={getUserColor('Terry Rivers')}
              image={
                <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
              }
              title='Terry Rivers'
            />
          </IconButton>
        </DropdownMenu>,
      ]}
      menuItems={buildMenu('More')}
    />
  );
};

export const Basic: Story<HeaderProps> = (args) => {
  return (
    <Header
      {...args}
      appLogo={
        <HeaderLogo
          logo={
            <svg
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
            >
              <path d='m12.6 13.4c-1.2-1.5-2.1-3.1-2.4-5.5-2.7 3.9-4.6 4.2-5.7 2.4l-1.2 5.7h-2.2l3.5-14.1 1.8-.4c-.1.5-1.4 6.2.6 7 2 .7 4.6-8.5 4.6-8.5l2.2.4c-1.6 3.7-1.6 7.6 1.1 10.9l-2.3 2.1' />
            </svg>
          }
        />
      }
      breadcrumbs={
        <HeaderBreadcrumbs
          items={[
            <HeaderButton
              key='project'
              name='Project A (Super Size Edition)'
              description='YJC-2249'
              startIcon={<SvgNetwork />}
              onClick={() => action('Clicked on the Project')()}
              menuItems={buildMenu('Project')}
            />,
            <HeaderButton
              key='iModel'
              name='iModel B'
              startIcon={
                <img
                  src='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png'
                  style={{ objectFit: 'cover' }}
                />
              }
              onClick={() => action('Clicked on the iModel')()}
            />,
            <HeaderButton
              key='version'
              name='Version C'
              menuItems={buildMenu('Version')}
              startIcon={<SvgVersion />}
              isActive={true}
            />,
          ]}
        />
      }
      actions={[
        <Avatar
          key='avatar'
          size='medium'
          abbreviation='TR'
          backgroundColor={getUserColor('Terry Rivers')}
          title='Terry Rivers'
        />,
      ]}
    />
  );
};

export const Slim: Story<HeaderProps> = Basic.bind({});
Slim.args = {
  isSlim: true,
};

export const CenterContent: Story<HeaderProps> = (args) => {
  const searchBar = (
    <>
      <style>
        {`.center-input { border-radius: 22px; width: 20vw; transition: all 0.2s ease }`}
        {`.iui-slim .iui-center { align-items: unset }`}
        {`.iui-slim .center-input { min-height: unset }`}
        {`@media (max-width: 768px) { .center-input { display: none; } }`}
      </style>
      <Input className='center-input' placeholder='Search within Model B...' />
    </>
  );

  return (
    <Header
      {...args}
      appLogo={<HeaderLogo logo={<SvgImodel />} />}
      breadcrumbs={
        <HeaderBreadcrumbs
          items={[
            <HeaderButton
              key='project'
              name='Project A'
              description='YJC-2249'
              startIcon={<SvgNetwork />}
              onClick={() => action('Clicked on the Project')()}
              menuItems={buildMenu('Project')}
            />,
            <HeaderButton
              key='iModel'
              name='iModel B'
              startIcon={
                <img
                  src='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png'
                  style={{ objectFit: 'cover' }}
                />
              }
              onClick={() => action('Clicked on the iModel')()}
            />,
            <HeaderButton
              key='version'
              name='Version C'
              onClick={() => action('Clicked on the Version')()}
              startIcon={<SvgVersion />}
              isActive={true}
            />,
          ]}
        />
      }
      actions={[
        <Avatar
          key='avatar'
          size='medium'
          abbreviation='TR'
          backgroundColor={getUserColor('Terry Rivers')}
          title='Terry Rivers'
        />,
      ]}
      menuItems={buildMenu('More')}
    >
      {searchBar}
    </Header>
  );
};
