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
        <Button key={0} onClick={() => {}}>
          Root
        </Button>
        <Button key={1} onClick={() => {}}>
          My files
        </Button>
        <Button key={2} onClick={() => {}}>
          Documents
        </Button>
        <Button key={3} onClick={() => {}}>
          Status reports
        </Button>
        <Button key={4} onClick={() => {}}>
          December
        </Button>
      </Breadcrumbs>
    </div>
  );
};
