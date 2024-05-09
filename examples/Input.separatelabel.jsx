/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Input, Label } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <Label htmlFor='first-name'>First name</Label>
      <Input id='first-name' />
      <Label htmlFor='middle-initial'>Middle initial</Label>
      <Input id='middle-initial' maxlength='1' />
      <Label htmlFor='last-name'>Last name</Label>
      <Input id='last-name' />
    </div>
  );
};
