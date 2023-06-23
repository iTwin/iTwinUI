/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NonIdealState } from '@itwin/itwinui-react';
import { Svg403 } from '@itwin/itwinui-illustrations-react';

export default () => {
  return (
    <div style={{ position: 'relative', minHeight: 403 }}>
      <NonIdealState
        svg={<Svg403 />}
        heading='Forbidden'
        description={
          <>
            Forbidden You do not have permission to access this server. Unable
            to fulfill request.
          </>
        }
      />
    </div>
  );
};
