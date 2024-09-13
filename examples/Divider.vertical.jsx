/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Divider, Text } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <Text variant='subheading'>Section 1</Text>
      <Divider orientation='vertical' />
      <Text variant='subheading'>Section 2</Text>
    </div>
  );
};
