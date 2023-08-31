/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { exec } from 'node:child_process';

// Since tsc does not include the react-table-types.d.ts file in the cjs and esm builds,
// we need to copy it manually.
['cjs', 'esm'].forEach((buildType) => {
  exec(
    `copyfiles -u 1 src/core/Table/types/react-table-types.d.ts ${buildType}`,
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
