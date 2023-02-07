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
        border: '1px solid pink',
        maxWidth: 450,
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
