/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Kbd, KbdKeys } from '@itwin/itwinui-react';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Kbd>{KbdKeys.Enter}</Kbd>
      <Kbd>{KbdKeys.Command}</Kbd>
      <Kbd>{KbdKeys.Down}</Kbd>
    </div>
  );
};
