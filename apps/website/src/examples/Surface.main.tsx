/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Surface } from '@itwin/itwinui-react';

export default () => {
  return (
    <Surface elevation={4} style={{ height: 200, padding: 12 }}>
      <p>Change the elevation prop to adjust the shadow level.</p>
    </Surface>
  );
};
