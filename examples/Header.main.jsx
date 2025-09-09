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
            />,
            <HeaderButton
              key='iModel'
              name='iModel B'
              startIcon={<img src='https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=1167' />}
              onClick={() => {}}
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
