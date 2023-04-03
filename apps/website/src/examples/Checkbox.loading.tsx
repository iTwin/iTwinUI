/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Checkbox, Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      <Checkbox label='Enable 2D mode' defaultChecked />
      <Checkbox label='Enable 3D mode' isLoading />
      <Checkbox label='Enable 4D mode' disabled />
    </Flex>
  );
};
