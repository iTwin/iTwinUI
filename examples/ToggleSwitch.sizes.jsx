/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ToggleSwitch } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <ToggleSwitch label='Small' size='small' defaultChecked={true} />
      <ToggleSwitch label='Medium' defaultChecked={true} />
    </div>
  );
};
