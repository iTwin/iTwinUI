/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Octokit } from 'octokit';
import { $ } from 'execa';
import {
  getPackagesToPublish,
  shouldPublishToNpm,
} from './publish-packages-helper.mjs';
import { parseChangelog } from './changelog-parser.mjs';

/**
 * Releases to npm and GitHub.
 * @param {"@itwin/itwinui-react" | "@itwin/itwinui-variables"} pkg
 * @param {string} version (E.g. "3.6.0")
 */
const createRelease = async (pkg, version) => {
  // Release to npm
  if (shouldPublishToNpm(pkg, version)) {
    await $`pnpm release`;
    console.log(`Released ${pkg}@${version} to npm`);
  } else {
    console.log(
      `Current ${pkg} version is not ahead of npm version. So, skipping npm and GitHub releases`,
    );
    return;
  }

  // Release to GitHub
  const tagName = `${pkg}@${version}`;
  const releaseName = tagName;
  const releaseBody = parseChangelog(pkg, version);

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  try {
    await octokit.rest.repos.getReleaseByTag({
      owner: 'iTwin',
      repo: 'iTwinUI',
      tag: tagName,
    });

    // If release exists, return
    console.log(
      `Release for ${pkg}@${version} already exists on GitHub. So, skipping GitHub release`,
    );
    return;
  } catch (error) {
    // If release does not exist, continue
  }

  octokit.rest.repos.createRelease({
    owner: 'iTwin',
    repo: 'iTwinUI',
    draft: true,
    tag_name: tagName,
    name: releaseName,
    body: releaseBody,
  });
};

getPackagesToPublish().then((packages) => {
  Object.entries(packages).forEach(createRelease);
});
