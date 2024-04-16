/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NotificationMarker, IconButton } from '@itwin/itwinui-react';
import { SvgNotification } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <div className='demo-container'>
      <NotificationMarker status='primary'>Primary</NotificationMarker>
      <IconButton label='Notifications' styleType='borderless'>
        <NotificationMarker status='primary'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <NotificationMarker status='positive'>Positive</NotificationMarker>
      <IconButton label='Notifications' styleType='borderless'>
        <NotificationMarker status='positive'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <NotificationMarker status='warning'>Warning</NotificationMarker>
      <IconButton label='Notifications' styleType='borderless'>
        <NotificationMarker status='warning'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <NotificationMarker status='negative'>Negative</NotificationMarker>
      <IconButton label='Notifications' styleType='borderless'>
        <NotificationMarker status='negative'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <NotificationMarker status='white'>White</NotificationMarker>
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
