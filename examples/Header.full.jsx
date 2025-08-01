/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import {
  Header,
  HeaderBreadcrumbs,
  HeaderButton,
  HeaderLogo,
  IconButton,
  MenuItem,
  Avatar,
} from '@itwin/itwinui-react';
import { SvgNotification, SvgPlaceholder } from '@itwin/itwinui-icons-react';

export default () => {
  const menuItems = (close) => [
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
      appLogo={<HeaderLogo logo={<SvgPlaceholder />}>Acme</HeaderLogo>}
      breadcrumbs={
        <HeaderBreadcrumbs
          items={[
            <HeaderButton
              key='project'
              name='Project A'
              description='YJC-2249'
              onClick={() => {}}
              menuItems={menuItems}
            />,
            <HeaderButton
              as='a'
              href=''
              key='iModel'
              name='iModel B'
              startIcon={
                <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
              }
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
        <IconButton
          key='notif'
          styleType='borderless'
          aria-label='View Notifications'
        >
          <SvgNotification />
        </IconButton>,
        <IconButton styleType='borderless' aria-label='View Profile'>
          <Avatar abbreviation='TR' />
        </IconButton>,
      ]}
      menuItems={menuItems}
    />
  );
};
