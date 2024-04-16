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
      <IconButton label='Notifications' styleType='borderless'>
        <NotificationMarker status='negative' pulsing>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <NotificationMarker status='negative' pulsing>
        <Text style={{ fontWeight: '700' }}>URGENT</Text>
      </NotificationMarker>
    </div>
  );
};
