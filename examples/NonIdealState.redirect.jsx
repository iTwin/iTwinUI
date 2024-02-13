/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NonIdealState } from '@itwin/itwinui-react';
import { SvgRedirect } from '@itwin/itwinui-illustrations-react';
import './NonIdealState.redirect.css';

export default () => {
  return (
    <div className='redirect-container'>
      <NonIdealState
        svg={<SvgRedirect />}
        heading='Redirect'
        description={
          <>
            Requested page has been moved permanently. Unable to fulfill
            request.
          </>
        }
      />
    </div>
  );
};
