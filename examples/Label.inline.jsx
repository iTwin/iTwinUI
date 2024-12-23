/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { InputGrid, Input, Label } from '@itwin/itwinui-react';

export default () => {
  return (
    <InputGrid labelPlacement='inline'>
      <Label displayStyle='inline' required>
        Name
      </Label>
      <Input defaultValue='James Bond' required />
    </InputGrid>
  );
};
