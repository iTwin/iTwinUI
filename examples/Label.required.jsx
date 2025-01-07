/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Input, Label } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <Label htmlFor='text-input' required>
        Name:
      </Label>
      <Input id='text-input' placeholder='Enter name' />
    </div>
  );
};
