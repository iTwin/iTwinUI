/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ToggleSwitch, InputGroup } from '@itwin/itwinui-react';

export default () => {
  return (
    <InputGroup label='Home lights'>
      <ToggleSwitch onChange={() => {}} label='Dining room' defaultChecked={true} />
      <ToggleSwitch onChange={() => {}} label='Garage' defaultChecked={false} />
      <ToggleSwitch onChange={() => {}} label='Kitchen' defaultChecked={true} />
      <ToggleSwitch onChange={() => {}} label='Living room' defaultChecked={false} />
    </InputGroup>
  );
};
