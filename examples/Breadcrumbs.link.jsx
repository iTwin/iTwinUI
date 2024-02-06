/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Breadcrumbs } from '@itwin/itwinui-react';

export default () => {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item href='#'>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href='#'>Support</Breadcrumbs.Item>
      <Breadcrumbs.Item>Contact us</Breadcrumbs.Item>
    </Breadcrumbs>
  );
};
