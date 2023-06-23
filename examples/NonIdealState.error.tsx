/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NonIdealState } from '@itwin/itwinui-react';
import { SvgError } from '@itwin/itwinui-illustrations-react';

export default () => {
  return (
    <div style={{ position: 'relative', minHeight: 400 }}>
      <NonIdealState
        svg={<SvgError />}
        heading='Error'
        description={
          <>
            We can't find the iModel that you are looking for or it does not
            exist.
          </>
        }
      />
    </div>
  );
};
