/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex>
      <Button size='small'>Small</Button>
      <Button>Medium</Button>
      <Button size='large'>Large</Button>
    </Flex>
  );
};
