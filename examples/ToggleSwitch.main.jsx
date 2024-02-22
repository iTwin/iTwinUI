/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ToggleSwitch } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <ToggleSwitch label='Option 1' defaultChecked={true} />
      <ToggleSwitch label='Option 2' defaultChecked={false} />
      <ToggleSwitch label='Option 3' defaultChecked={true} disabled />
      <ToggleSwitch label='Option 4' defaultChecked={false} disabled />
    </div>
  );
};
