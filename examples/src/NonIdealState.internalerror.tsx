/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NonIdealState } from '@itwin/itwinui-react';
import { Svg500 } from '@itwin/itwinui-illustrations-react';

export default () => {
  return (
    <div style={{ position: 'relative', minHeight: 400 }}>
      <NonIdealState
        svg={<Svg500 />}
        heading='Internal Server Error'
        description={
          <>
            Please retry again. If this continues to happen, please contact our
            support team.
          </>
        }
      />
    </div>
  );
};
