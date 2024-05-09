/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as path from 'node:path';

export const itwinuiReactAliases =
  process.env.NODE_ENV === 'development'
    ? {
        '@itwin/itwinui-react/styles.css?url': path.resolve(
          '../../packages/itwinui-react/styles.css?url',
        ),
        '@itwin/itwinui-react/styles.css': path.resolve(
          '../../packages/itwinui-react/styles.css',
        ),
        '@itwin/itwinui-react': path.resolve(
          '../../packages/itwinui-react/src',
        ),
      }
    : {};
