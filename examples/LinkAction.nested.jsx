/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Anchor, LinkAction, LinkBox, Surface } from '@itwin/itwinui-react';

export default () => {
  return (
    <LinkBox as={Surface}>
      <Surface.Body isPadded>
        <LinkAction href='https://example.com'>Primary link</LinkAction>
        <LinkBox>
          <Anchor href='https://mdn.io'>Secondary link</Anchor>
        </LinkBox>
      </Surface.Body>
    </LinkBox>
  );
};
