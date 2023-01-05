/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Breadcrumbs } from '@itwin/itwinui-react';

export default () => {
  return (
    <Breadcrumbs>
      <a key={0} href='#'>
        Home
      </a>
      <a key={1} href='#'>
        Support
      </a>
      <span key={2}>Contact us</span>
    </Breadcrumbs>
  );
};
