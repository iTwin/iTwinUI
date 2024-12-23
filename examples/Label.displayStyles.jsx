/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { InputGrid, Input, Label, LabeledSelect } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <InputGrid>
        <Label displayStyle='block'>Block label</Label>
        <Input />
      </InputGrid>
      <InputGrid labelPlacement='inline'>
        <Label displayStyle='inline'>Inline label</Label>
        <Input />
      </InputGrid>
    </div>
  );
};
