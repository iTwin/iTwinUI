/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Breadcrumbs } from '@itwin/itwinui-react';

export default () => {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item onClick={() => {}}>Root</Breadcrumbs.Item>
      <Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
      <Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
    </Breadcrumbs>
  );
};
