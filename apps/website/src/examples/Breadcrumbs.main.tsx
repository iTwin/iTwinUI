/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Breadcrumbs, Button } from '@itwin/itwinui-react';

export default () => {
  return (
    <Breadcrumbs>
      <Button>Root</Button>
      <Button>Item 1</Button>
      <Button>Item 2</Button>
    </Breadcrumbs>
  );
};
