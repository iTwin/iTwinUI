/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Breadcrumbs, Button } from '@itwin/itwinui-react';

export default () => {
  return (
    <Breadcrumbs>
      <Button key={0} onClick={() => {}}>
        Root
      </Button>
      <Button key={1} onClick={() => {}}>
        Item 1
      </Button>
      <Button key={2} onClick={() => {}}>
        Item 2
      </Button>
    </Breadcrumbs>
  );
};
