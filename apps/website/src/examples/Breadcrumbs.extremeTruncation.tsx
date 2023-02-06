/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Breadcrumbs, Button, MiddleTextTruncation } from '@itwin/itwinui-react';

export default () => {
  return (
    <div
      style={{
        border: '1px solid pink',
        maxWidth: 425,
        padding: 8,
      }}
    >
      <Breadcrumbs>
        <Button style={{ maxWidth: 90 }}>
          <MiddleTextTruncation text='Root' endCharsCount={7} />
        </Button>
        <Button style={{ maxWidth: 90 }}>
          <MiddleTextTruncation text='My files' endCharsCount={7} />
        </Button>
        <Button style={{ maxWidth: 90 }}>
          <MiddleTextTruncation text='Documents' endCharsCount={7} />
        </Button>
        <Button style={{ maxWidth: 90 }}>
          <MiddleTextTruncation text='Status reports' endCharsCount={7} />
        </Button>
        <Button style={{ maxWidth: 90 }}>
          <MiddleTextTruncation text='December' endCharsCount={7} />
        </Button>
      </Breadcrumbs>
    </div>
  );
};
