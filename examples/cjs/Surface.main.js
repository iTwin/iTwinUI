/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Surface } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    Surface,
    {
      elevation: 4,
      style: {
        height: 200,
        padding: 12,
        width: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    React.createElement('p', null, 'This is a surface'),
  );
};
