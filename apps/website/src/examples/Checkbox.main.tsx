/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Checkbox } from '@itwin/itwinui-react';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Checkbox label='Basic' />
      <Checkbox label='Disabled' disabled />
      <Checkbox label='Loading' isLoading />
    </div>
  );
};
