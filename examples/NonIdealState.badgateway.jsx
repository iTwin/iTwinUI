/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NonIdealState } from '@itwin/itwinui-react';
import { Svg502 } from '@itwin/itwinui-illustrations-react';
import './NonIdealState.badgateway.css';

export default () => {
  return (
    <div className='bad-gateway-container'>
      <NonIdealState
        svg={<Svg502 />}
        heading='Bad Gateway'
        description={
          <>
            The server encountered a temporary error. Please try again in 30
            seconds.
          </>
        }
      />
    </div>
  );
};
