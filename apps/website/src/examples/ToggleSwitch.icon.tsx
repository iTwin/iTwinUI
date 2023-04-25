/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ToggleSwitch, Flex } from '@itwin/itwinui-react';
import { SvgCheckmark } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      <ToggleSwitch label='Option 1' icon={<SvgCheckmark />} defaultChecked={true} />
      <ToggleSwitch label='Option 2' icon={<SvgCheckmark />} defaultChecked={true} disabled />
    </Flex>
  );
};
