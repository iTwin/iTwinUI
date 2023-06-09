/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Avatar,
  Header,
  HeaderBreadcrumbs,
  HeaderButton,
  HeaderLogo,
  IconButton,
  MenuItem,
} from '@itwin/itwinui-react';

export default () => {
  const menuItems = (close: () => void) => [
    <MenuItem key={1} value={'Item #1'} onClick={close}>
      Item #1
    </MenuItem>,
    <MenuItem key={2} value={'Item #2'} onClick={close}>
      Item #2
    </MenuItem>,
    <MenuItem key={3} value={'Item #3'} onClick={close}>
      Item #3
    </MenuItem>,
  ];

  return (
    <Header
      appLogo={
        <HeaderLogo
          logo={
            <svg viewBox='0 0 16 16' aria-hidden='true'>
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
              onClick={() => {}}
              menuItems={menuItems}
            />,
            <HeaderButton
              key='iModel'
              name='iModel B'
              startIcon={
                <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
              }
              onClick={() => {}}
            />,
            <HeaderButton
              key='version'
              name='Version C'
              menuItems={menuItems}
              isActive={true}
            />,
          ]}
        />
      }
      actions={[
        <IconButton styleType='borderless' aria-label='View profile'>
          <Avatar
            size='medium'
            abbreviation='TR'
            image={
              <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
            }
            title='Terry Rivers'
          />
        </IconButton>,
      ]}
    />
  );
};
