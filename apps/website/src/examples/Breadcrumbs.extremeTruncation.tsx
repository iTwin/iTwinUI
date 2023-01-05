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
        maxWidth: 450,
        padding: 8,
      }}
    >
      <Breadcrumbs>
        <Button key={0} style={{ maxWidth: 90 }} onClick={() => {}}>
          <MiddleTextTruncation text='Root' endCharsCount={7} />
        </Button>
        <Button key={1} style={{ maxWidth: 90 }} onClick={() => {}}>
          <MiddleTextTruncation text='My files' endCharsCount={7} />
        </Button>
        <Button key={2} style={{ maxWidth: 90 }} onClick={() => {}}>
          <MiddleTextTruncation text='Documents' endCharsCount={7} />
        </Button>
        <Button key={3} style={{ maxWidth: 90 }} onClick={() => {}}>
          <MiddleTextTruncation text='Status reports' endCharsCount={7} />
        </Button>
        <Button key={4} style={{ maxWidth: 90 }} onClick={() => {}}>
          <MiddleTextTruncation text='December' endCharsCount={7} />
        </Button>
      </Breadcrumbs>
    </div>
  );
};
