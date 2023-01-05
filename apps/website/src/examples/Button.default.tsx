/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button } from '@itwin/itwinui-react';

export default () => {
  return (
    <div>
      <div style={{ display: 'grid', gap: '24px', justifyItems: 'center' }}>
        <Button size='small'>Small</Button>
        <Button>Default</Button>
        <Button size='large'>Large</Button>
      </div>
    </div>
  );
};
