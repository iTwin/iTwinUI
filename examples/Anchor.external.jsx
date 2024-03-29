/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Anchor } from '@itwin/itwinui-react';

export default () => {
  return (
    <Anchor href='https://www.example.com/' isExternal target='_blank'>
      Example Site
    </Anchor>
  );
};
