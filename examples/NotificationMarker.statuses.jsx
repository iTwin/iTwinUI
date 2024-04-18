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
      <IconButton label='Primary' styleType='borderless'>
        <NotificationMarker status='primary'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <IconButton label='Positive' styleType='borderless'>
        <NotificationMarker status='positive'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <IconButton label='Warning' styleType='borderless'>
        <NotificationMarker status='warning'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <IconButton label='Negative' styleType='borderless'>
        <NotificationMarker status='negative'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <IconButton label='White' styleType='high-visibility'>
        <NotificationMarker status='white'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <IconButton label='White' styleType='cta'>
        <NotificationMarker status='white'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>
    </div>
  );
};
