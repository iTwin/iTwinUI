/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { StatusMessage } from '@itwin/itwinui-react';
import { SvgPlaceholder } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <div className='demo-container'>
      <StatusMessage>No status + No startIcon</StatusMessage>
      <StatusMessage status='positive'>status + default icon</StatusMessage>
      <StatusMessage status='positive' startIcon={<SvgPlaceholder />}>
        status + custom startIcon
      </StatusMessage>
    </div>
  );
};
