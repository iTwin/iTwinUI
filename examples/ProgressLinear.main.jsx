/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ProgressLinear } from '@itwin/itwinui-react';
import './ProgressLinear.main.css';

export default () => {
  return (
    <div className='progress-linear-container'>
      <ProgressLinear indeterminate />
    </div>
  );
};
