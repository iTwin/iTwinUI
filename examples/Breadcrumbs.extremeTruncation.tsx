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
        inlineSize: '75%',
        minInlineSize: 150,
        maxInlineSize: 425,
        borderInline: '1px solid pink',
        borderBlock: '1px solid pink',
        paddingInline: 8,
        paddingBlock: 8,
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
