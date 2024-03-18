/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  getPackagesToPublish,
  createGithubRelease,
  createNpmReleases,
} from './publish-packages-helper.mjs';

const packages = await getPackagesToPublish();
if (packages.length === 0) {
  console.log('No packages to publish');
  process.exit(0);
}

await createNpmReleases();

Object.entries(packages).forEach(async ([pkg, version]) => {
  try {
    await createGithubRelease(pkg, version);
  } catch {
    console.log(`Failed to release ${pkg}@${version}`);
  }
});
