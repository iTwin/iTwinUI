/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Text } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex>
      <Text>This is a regular text</Text>
      <Text isMuted>This is a muted text</Text>
    </Flex>
  );
};
