/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { exec } from 'node:child_process';

// react-table-types.d.ts created by tsc may not be importable from @itwin/itwinui-react/react-table
// for older node versions. This is because tsconfig requires Node16 for moduleResolution when trying to
//  import using the `exports` of @itwin/itwinui-react's package.json. Thus, we need to copy
// react-table-types.d.ts manually to esm/react-table so that older node versions can still import by
// path instead of only by endpoint module resolution.
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#ecmascript-module-support-in-nodejs
['cjs', 'esm'].forEach((buildType) => {
  exec(
    `copyfiles -u 3 src/core/Table/types/react-table-types.d.ts ${buildType}`,
    (error) => {
      if (error) {
        console.error(
          `Error copying react-table-types.d.ts to ${buildType} build folder`,
          error,
        );
      } else {
        console.log(
          `✓ Finished copying react-table-types.d.ts to ${buildType} build folder`,
        );
      }
    },
  );
});
