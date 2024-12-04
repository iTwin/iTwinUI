/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Text } from '@itwin/itwinui-react';

export default () => {
  return (
    <>
      <Text isSkeleton variant='headline'>
        This is a skeleton text
      </Text>
      <Text isSkeleton variant='title'>
        This is a skeleton text
      </Text>
      <Text isSkeleton variant='subheading'>
        This is a skeleton text
      </Text>
      <Text isSkeleton variant='leading'>
        This is a skeleton text
      </Text>
      <Text isSkeleton>This is a skeleton text</Text>
      <Text isSkeleton variant='small'>
        This is a skeleton text
      </Text>
    </>
  );
};
