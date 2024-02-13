/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NonIdealState } from '@itwin/itwinui-react';
import { Svg404 } from '@itwin/itwinui-illustrations-react';
import './NonIdealState.Pagenotfound.css';

export default () => {
  return (
    <div className='page-not-found-container'>
      <NonIdealState
        svg={<Svg404 />}
        heading='Page not found'
        description={
          <>
            We can not find the iModel that you are looking for or it does not
            exist.
          </>
        }
      />
    </div>
  );
};
