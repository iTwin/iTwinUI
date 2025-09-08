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
              startIcon={<img src='/assets/stadium.png' />}
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
