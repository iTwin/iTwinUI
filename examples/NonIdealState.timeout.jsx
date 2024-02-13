/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NonIdealState } from '@itwin/itwinui-react';
import { SvgTimedOut } from '@itwin/itwinui-illustrations-react';
import './NonIdealState.timeout.css';

export default () => {
  return (
    <div className='timeout-container'>
      <NonIdealState
        svg={<SvgTimedOut />}
        heading='Time Out'
        description={<>Your request timed out. Please try again.</>}
      />
    </div>
  );
};
