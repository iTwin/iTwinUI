/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ToggleSwitch, Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      <ToggleSwitch onChange={() => {}} label='Small' size='small' defaultChecked={true} />
      <ToggleSwitch onChange={() => {}} label='Medium' defaultChecked={true} />
    </Flex>
  );
};
