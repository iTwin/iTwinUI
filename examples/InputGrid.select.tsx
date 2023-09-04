/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { InputGrid, Select, Label, StatusMessage } from '@itwin/itwinui-react';
import { SvgAirplane } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <InputGrid>
      <Label htmlFor='input-1'>This is label for Select</Label>
      <Select
        options={[
          { value: 1, label: 'Option 1' },
          { value: 2, label: 'Option 2' },
          { value: 3, label: 'Option 3' },
        ]}
        placeholder='Input'
        id='input-1'
      />
      <StatusMessage startIcon={<SvgAirplane />}>Message</StatusMessage>
    </InputGrid>
  );
};
