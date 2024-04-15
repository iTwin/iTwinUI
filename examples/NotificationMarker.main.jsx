/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NotificationMarker } from '@itwin/itwinui-react';
import { SvgNotification } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <div className='demo-container'>
      <NotificationMarker status='primary'>
        <SvgNotification width={16} height={16} fill='currentColor' />
      </NotificationMarker>
      <NotificationMarker status='primary'>Normal</NotificationMarker>
    </div>
  );
};
