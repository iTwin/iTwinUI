/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NonIdealState } from '@itwin/itwinui-react';
import { Svg401 } from '@itwin/itwinui-illustrations-react';

export default () => {
  return (
    <div style={{ position: 'relative', minHeight: 401 }}>
      <NonIdealState
        svg={<Svg401 />}
        heading='Unauthorized'
        description={
          <>
            You do not have permission to access this server. Unable to fulfill
            request.
          </>
        }
      />
    </div>
  );
};
