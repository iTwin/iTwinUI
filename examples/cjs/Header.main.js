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
  const menuItems = (close) => [
    React.createElement(
      MenuItem,
      { key: 1, value: 'Item #1', onClick: close },
      'Item #1',
    ),
    React.createElement(
      MenuItem,
      { key: 2, value: 'Item #2', onClick: close },
      'Item #2',
    ),
    React.createElement(
      MenuItem,
      { key: 3, value: 'Item #3', onClick: close },
      'Item #3',
    ),
  ];
  return React.createElement(Header, {
    appLogo: React.createElement(HeaderLogo, {
      logo: React.createElement(
        'svg',
        { viewBox: '0 0 16 16', 'aria-hidden': 'true' },
        React.createElement('path', {
          d: 'm12.6 13.4c-1.2-1.5-2.1-3.1-2.4-5.5-2.7 3.9-4.6 4.2-5.7 2.4l-1.2 5.7h-2.2l3.5-14.1 1.8-.4c-.1.5-1.4 6.2.6 7 2 .7 4.6-8.5 4.6-8.5l2.2.4c-1.6 3.7-1.6 7.6 1.1 10.9l-2.3 2.1',
        }),
      ),
    }),
    breadcrumbs: React.createElement(HeaderBreadcrumbs, {
      items: [
        React.createElement(HeaderButton, {
          key: 'project',
          name: 'Project A (Super Size Edition)',
          description: 'YJC-2249',
          onClick: () => {},
          menuItems: menuItems,
        }),
        React.createElement(HeaderButton, {
          key: 'iModel',
          name: 'iModel B',
          startIcon: React.createElement('img', {
            src: 'https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png',
          }),
          onClick: () => {},
        }),
        React.createElement(HeaderButton, {
          key: 'version',
          name: 'Version C',
          menuItems: menuItems,
          isActive: true,
        }),
      ],
    }),
    actions: [
      React.createElement(
        IconButton,
        { styleType: 'borderless', 'aria-label': 'View profile' },
        React.createElement(Avatar, {
          size: 'medium',
          abbreviation: 'TR',
          image: React.createElement('img', {
            src: 'https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png',
          }),
          title: 'Terry Rivers',
        }),
      ),
    ],
  });
};
