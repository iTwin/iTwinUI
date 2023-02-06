/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Breadcrumbs } from '@itwin/itwinui-react';

export default () => {
  return (
    <Breadcrumbs>
      <a href='#'>Home</a>
      <a href='#'>Support</a>
      <span>Contact us</span>
    </Breadcrumbs>
  );
};
