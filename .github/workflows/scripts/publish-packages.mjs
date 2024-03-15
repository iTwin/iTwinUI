/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  getPackagesToPublish,
  createRelease,
} from './helpers/publish-packages-helper.mjs';

getPackagesToPublish().then((packages) => {
  Object.entries(packages).forEach(([pkg, version]) =>
    createRelease(pkg, version),
  );
});
