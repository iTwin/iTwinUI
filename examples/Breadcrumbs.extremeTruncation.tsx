/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Breadcrumbs, MiddleTextTruncation } from '@itwin/itwinui-react';

export default () => {
  return (
    <div
      style={{
        width: '75%',
        minWidth: 150,
        maxWidth: 425,
        border: '1px solid pink',
        padding: 8,
      }}
    >
      <Breadcrumbs>
        <Breadcrumbs.Item onClick={() => {}} style={{ maxWidth: 90 }}>
          <MiddleTextTruncation text='Root' endCharsCount={7} />
        </Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={() => {}} style={{ maxWidth: 90 }}>
          <MiddleTextTruncation text='My files' endCharsCount={7} />
        </Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={() => {}} style={{ maxWidth: 90 }}>
          <MiddleTextTruncation text='Documents' endCharsCount={7} />
        </Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={() => {}} style={{ maxWidth: 90 }}>
          <MiddleTextTruncation text='Status reports' endCharsCount={7} />
        </Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={() => {}} style={{ maxWidth: 90 }}>
          <MiddleTextTruncation text='December' endCharsCount={7} />
        </Breadcrumbs.Item>
      </Breadcrumbs>
    </div>
  );
};
