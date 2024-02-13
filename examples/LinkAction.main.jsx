/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Anchor,
  LinkAction,
  LinkBox,
  Surface,
  Text,
} from '@itwin/itwinui-react';

export default () => {
  return (
    <LinkBox as={Surface}>
      <Surface.Header>
        <Text as='h2' variant='subheading'>
          <LinkAction as={Anchor} href='https://www.example.com'>
            Stadium
          </LinkAction>
        </Text>
      </Surface.Header>
      <Surface.Body isPadded style={{ maxWidth: '40ch' }}>
        National stadium in Singapore. Features landscape details and a metro
        station.
      </Surface.Body>
    </LinkBox>
  );
};
