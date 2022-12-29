/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Alert } from '@itwin/itwinui-react';

export default () => {
  return (
    <div>
      <p style={{ marginBottom: 12 }}>Page content before alert.</p>
      <Alert style={{ minWidth: 350 }}>This is a inline alert.</Alert>
      <p style={{ marginTop: 12 }}>Page content after alert.</p>
    </div>
  );
};
