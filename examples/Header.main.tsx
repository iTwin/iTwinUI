/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { Avatar, Header, HeaderLogo, IconButton } from '@itwin/itwinui-react';
import SvgNotification from '@itwin/itwinui-icons-react/cjs/icons/Notification';
import SvgHelpCircularHollow from '@itwin/itwinui-icons-react/cjs/icons/HelpCircularHollow';

export default () => {
  return (
    <Header
      appLogo={
        <HeaderLogo
          logo={
            <svg viewBox='0 0 16 16' aria-hidden='true'>
              <path d='m12.6 13.4c-1.2-1.5-2.1-3.1-2.4-5.5-2.7 3.9-4.6 4.2-5.7 2.4l-1.2 5.7h-2.2l3.5-14.1 1.8-.4c-.1.5-1.4 6.2.6 7 2 .7 4.6-8.5 4.6-8.5l2.2.4c-1.6 3.7-1.6 7.6 1.1 10.9l-2.3 2.1' />
            </svg>
          }
        >
          Microstation
        </HeaderLogo>
      }
      actions={[
        <IconButton
          key='notif'
          onClick={() => action('Clicked on the notification bell')()}
          styleType='borderless'
        >
          <SvgNotification />
        </IconButton>,
        <IconButton styleType='borderless' aria-label='help'>
          <SvgHelpCircularHollow />
        </IconButton>,
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
