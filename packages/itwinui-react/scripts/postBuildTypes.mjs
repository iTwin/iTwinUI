/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { exec } from 'node:child_process';

// Since tsc does not include the react-table-types.d.ts file in the esm build,
// we need to copy it manually.
exec(
  'copyfiles -u 1 src/core/Table/types/react-table-types.d.ts esm',
  (error) => {
    if (error) {
      console.error(
        'Error copying react-table-types.d.ts to esm build folder',
        error,
      );
    } else {
      console.log(
        '✓ Finished copying react-table-types.d.ts to esm build folder',
      );
    }
  },
);

// Since tsc does not include the react-table-types.d.ts file in the cjs build,
// we need to copy it manually.
exec(
  'copyfiles -u 1 src/core/Table/types/react-table-types.d.ts cjs',
  (error) => {
    if (error) {
      console.error(
        'Error copying react-table-types.d.ts to cjs build folder',
        error,
      );
    } else {
      console.log(
        '✓ Finished copying react-table-types.d.ts to cjs build folder',
      );
    }
  },
);
