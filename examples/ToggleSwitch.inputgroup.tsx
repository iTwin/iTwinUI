/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ToggleSwitch, InputGroup } from '@itwin/itwinui-react';

export default () => {
  return (
    <InputGroup label='Home lights'>
      <ToggleSwitch label='Dining room' defaultChecked={true} />
      <ToggleSwitch label='Garage' defaultChecked={false} />
      <ToggleSwitch label='Kitchen' defaultChecked={true} />
      <ToggleSwitch label='Living room' defaultChecked={false} />
    </InputGroup>
  );
};
