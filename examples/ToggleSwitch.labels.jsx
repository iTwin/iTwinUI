/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ToggleSwitch } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <ToggleSwitch label='Label on the right' defaultChecked={true} />
      <ToggleSwitch
        label='Label on the left'
        labelPosition='left'
        defaultChecked={true}
      />
    </div>
  );
};
