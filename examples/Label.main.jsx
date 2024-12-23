/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Flex, Input, Label } from '@itwin/itwinui-react';

export default () => {
  return (
    <>
      <Label htmlFor='text-input'>Name:</Label>
      <Input id='text-input' placeholder='Enter name' />
    </>
  );
};
