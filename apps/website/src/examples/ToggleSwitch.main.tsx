/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ToggleSwitch, Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      <ToggleSwitch label='Option 1' defaultChecked={true} />
      <ToggleSwitch label='Option 2' defaultChecked={false} />
      <ToggleSwitch label='Option 3' defaultChecked={true} disabled />
      <ToggleSwitch label='Option 4' defaultChecked={false} disabled />
    </Flex>
  );
};
