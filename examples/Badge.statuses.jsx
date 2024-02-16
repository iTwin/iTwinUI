/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Badge } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <Badge>Default</Badge>
      <Badge backgroundColor='primary'>Informational</Badge>
      <Badge backgroundColor='positive'>Positive</Badge>
      <Badge backgroundColor='warning'>Warning</Badge>
      <Badge backgroundColor='negative'>Negative</Badge>
    </div>
  );
};
