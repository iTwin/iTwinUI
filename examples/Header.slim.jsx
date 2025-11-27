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
import { SvgPlaceholder } from '@itwin/itwinui-icons-react';

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
      isSlim
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
              key='iModel'
              name='iModel B'
              startIcon={<img src='https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=1167' />}
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
          <Avatar abbreviation='TR' />
        </IconButton>,
      ]}
    />
  );
};
