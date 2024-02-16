/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Input, Label } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <div className='demo-labels-container'>
        <Label htmlFor='first-name'>First name</Label>
        <Label htmlFor='middle-initial'>Middle initial</Label>
        <Label htmlFor='last-name'>Last name</Label>
      </div>
      <div className='demo-inputs-container'>
        <Input id='first-name' />
        <Input id='middle-initial' maxlength='1' />
        <Input id='last-name' />
      </div>
    </div>
  );
};
