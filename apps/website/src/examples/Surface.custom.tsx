/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Flex, Surface, Text, IconButton } from '@itwin/itwinui-react';
import { SvgSettings } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Surface elevation={4} hasLayout={true}>
      <Surface.Header>
        <Flex justifyContent={'space-between'} style={{ flexGrow: '1' }}>
          <Text variant='subheading' as='h2'>
            Custom surface
          </Text>
          <IconButton styleType='borderless'>
            <SvgSettings />
          </IconButton>
        </Flex>
      </Surface.Header>
      <Surface.Body isPadded={true}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </Surface.Body>
    </Surface>
  );
};
