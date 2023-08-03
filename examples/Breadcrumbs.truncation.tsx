/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Breadcrumbs } from '@itwin/itwinui-react';

export default () => {
  return (
    <div
      style={{
        inlineSize: '75%',
        minInlineSize: 150,
        maxInlineSize: 450,
        borderInline: '1px solid pink',
        borderBlock: '1px solid pink',
        paddingInline: 8,
        paddingBlock: 8,
      }}
    >
      <Breadcrumbs>
        <Breadcrumbs.Item onClick={() => {}}>Root</Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={() => {}}>My files</Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={() => {}}>Documents</Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={() => {}}>Status reports</Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={() => {}}>December</Breadcrumbs.Item>
      </Breadcrumbs>
    </div>
  );
};
