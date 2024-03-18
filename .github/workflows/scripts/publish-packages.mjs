/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  getPackagesToPublish,
  createGithubRelease,
  createNpmRelease,
} from '../../../scripts/publish-packages-helper.mjs';

const packages = await getPackagesToPublish();

Object.entries(packages).forEach(async ([pkg, version]) => {
  try {
    await createNpmRelease(pkg, version);
    await createGithubRelease(pkg, version);
  } catch {
    console.log(`Failed to release ${pkg}@${version}`);
  }
});
