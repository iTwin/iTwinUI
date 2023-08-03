/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Surface } from '@itwin/itwinui-react';

export default () => {
  return (
    <Surface
      elevation={4}
      style={{
        blockSize: 200,
        paddingInline: 12,
        paddingBlock: 12,
        inlineSize: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p>This is a surface</p>
    </Surface>
  );
};
