/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { InputGrid, Input, Label, StatusMessage } from '@itwin/itwinui-react';

export default () => {
  return (
    <InputGrid labelPlacement='inline'>
      <Label htmlFor='input-2'>This is label</Label>
      <Input placeholder='Input' id='input-2' />
      <StatusMessage>Message</StatusMessage>
    </InputGrid>
  );
};
