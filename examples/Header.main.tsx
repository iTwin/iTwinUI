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
import { SvgImodel } from '@itwin/itwinui-icons-react';

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
      appLogo={<HeaderLogo logo={<SvgImodel />} placeholder='Acme' />}
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
          ]}
        />
      }
      actions={[
        <IconButton styleType='borderless' aria-label='View profile'>
          <Avatar abbreviation='TR' title='Terry Rivers' />
        </IconButton>,
      ]}
    />
  );
};
