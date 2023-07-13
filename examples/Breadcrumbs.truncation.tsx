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
        width: '75%',
        minWidth: 150,
        maxWidth: 450,
        border: '1px solid pink',
        padding: 8,
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
