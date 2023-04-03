/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Breadcrumbs, Button } from '@itwin/itwinui-react';

export default () => {
  return (
    <div
      style={{
        width: '75%',
        minWidth: 150,
        maxWidth: 450,
        border: '1px solid pink',
        padding: 8,
      }}
    >
      <Breadcrumbs>
        <Button>Root</Button>
        <Button>My files</Button>
        <Button>Documents</Button>
        <Button>Status reports</Button>
        <Button>December</Button>
      </Breadcrumbs>
    </div>
  );
};
