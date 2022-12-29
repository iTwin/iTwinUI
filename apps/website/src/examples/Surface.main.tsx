/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Surface } from '@itwin/itwinui-react';

export default () => {
  return (
    <Surface
      elevation={4}
      style={{
        width: '50%',
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span style={{ padding: '12px' }}>
        Change the elevation property of the component to adjust the shadow level.
      </span>
    </Surface>
  );
};
