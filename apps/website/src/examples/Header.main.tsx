/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  DropdownMenu,
  Header,
  HeaderBreadcrumbs,
  HeaderButton,
  HeaderLogo,
  IconButton,
  MenuExtraContent,
  MenuItem,
  UserIcon,
  Text,
  Select,
  MenuDivider,
} from '@itwin/itwinui-react';

export default () => {
  const buildMenu = (menu: string) => (close: () => void) =>
    [
      <MenuItem key={1} value={'Item #1'} onClick={close}>
        {menu} item #1
      </MenuItem>,
      <MenuItem key={2} value={'Item #2'} onClick={close}>
        {menu} item #2
      </MenuItem>,
      <MenuItem key={3} value={'Item #3'} onClick={close}>
        {menu} item #3
      </MenuItem>,
    ];
  return (
    <div style={{ padding: '0 8px', width: '100%' }}>
      <Header
        appLogo={
          <HeaderLogo
            logo={
              <svg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                <path
                  d={`m12.6 13.4c-1.2-1.5-2.1-3.1-2.4-5.5-2.7 3.9-4.6 
                4.2-5.7 2.4l-1.2 5.7h-2.2l3.5-14.1 1.8-.4c-.1.5-1.4 
                6.2.6 7 2 .7 4.6-8.5 4.6-8.5l2.2.4c-1.6 3.7-1.6 7.6 1.1 10.9l-2.3 2.1`}
                />
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
                onClick={() => {}}
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
                onClick={() => {}}
              />,
              <HeaderButton
                key='version'
                name='Version C'
                menuItems={buildMenu('Version')}
                isActive={true}
              />,
            ]}
          />
        }
        userIcon={
          <IconButton styleType='borderless'>
            <UserIcon
              size='medium'
              abbreviation='TR'
              backgroundColor='#6AB9EC'
              image={
                <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
              }
              title='Terry Rivers'
            />
          </IconButton>
        }
      />
    </div>
  );
};
