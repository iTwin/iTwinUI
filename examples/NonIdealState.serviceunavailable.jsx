/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NonIdealState } from '@itwin/itwinui-react';
import { Svg503 } from '@itwin/itwinui-illustrations-react';

export default () => {
  return (
    <div style={{ position: 'relative', minHeight: 400 }}>
      <NonIdealState
        svg={<Svg503 />}
        heading='Service Unavailable'
        description={
          <>
            This service is being worked on. Please come back in a little bit.
          </>
        }
      />
    </div>
  );
};
