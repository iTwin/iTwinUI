/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Flex, Text } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex flexDirection='column'>
      <Text variant='headline'>This is a headline</Text>
      <Text variant='title'>This is a title</Text>
      <Text variant='subheading'>This is a subheading</Text>
      <Text variant='leading'>This is a leading</Text>
      <Text>This is a body</Text>
      <Text variant='small'>This is a small text</Text>
    </Flex>
  );
};
