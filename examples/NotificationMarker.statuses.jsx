/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NotificationMarker, IconButton, Text } from '@itwin/itwinui-react';
import { SvgNotification } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <div className='demo-container'>
      <Text>Primary</Text>
      <IconButton label='Notifications' styleType='borderless'>
        <NotificationMarker status='primary'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <Text>Positive</Text>
      <IconButton label='Notifications' styleType='borderless'>
        <NotificationMarker status='positive'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <Text>Warning</Text>
      <IconButton label='Notifications' styleType='borderless'>
        <NotificationMarker status='warning'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <Text>Negative</Text>
      <IconButton label='Notifications' styleType='borderless'>
        <NotificationMarker status='negative'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <Text>White</Text>
      <div style={{ display: 'flex', columnGap: '10px' }}>
        <IconButton label='Notifications' styleType='high-visibility'>
          <NotificationMarker status='white'>
            <SvgNotification />
          </NotificationMarker>
        </IconButton>
        <IconButton label='Notifications' styleType='cta'>
          <NotificationMarker status='white'>
            <SvgNotification />
          </NotificationMarker>
        </IconButton>
      </div>
    </div>
  );
};
