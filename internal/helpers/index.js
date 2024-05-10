/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as path from 'node:path';

export const itwinuiReactAliases =
  process.env.NODE_ENV === 'development'
    ? [
        {
          find: /^@itwin\/itwinui-react$/,
          replacement: path.resolve(
            '../../packages/itwinui-react/src/index.ts',
          ),
        },
        {
          find: /^@itwin\/itwinui-react\/styles.css(.*)$/,
          replacement: path.resolve(
            '../../packages/itwinui-react/styles.css$1',
          ),
        },
        {
          find: /^@itwin\/itwinui-react\/react-table$/,
          replacement: path.resolve(
            '../../packages/itwinui-react/react-table.d.ts',
          ),
        },
      ]
    : [];
