import { $ } from 'execa';
import fs from 'fs';
import { parseChangelog } from './changelog-parser.mjs';
import { Octokit } from 'octokit';

/**
 * Returns all publishable packages that need to be published to npm/GitHub
 */
export const getPackagesToPublish = async () => {
  const publishablePackages = [
    '@itwin/itwinui-react',
    '@itwin/itwinui-variables',
  ];

  /**
   * @type {{ [pkg: string]: string }}
   */
  const packagesToPublish = {};

  for (const pkg of publishablePackages) {
    const currentPackageVersion = await getCurrentPackageVersion(pkg);
    if (await shouldPublishToNpm(pkg, currentPackageVersion)) {
      packagesToPublish[pkg] = currentPackageVersion;
    }
  }

  return packagesToPublish;
};

/**
 * Releases to npm and GitHub.
 * @param {"@itwin/itwinui-react" | "@itwin/itwinui-variables"} pkg
 * @param {string} version (E.g. "3.6.0")
 */
export const createRelease = async (pkg, version) => {
  // Release to npm
  if (shouldPublishToNpm(pkg, version)) {
    await $`pnpm changeset publish`;
    console.log(`Released ${pkg}@${version} to npm`);

    await $`git push origin --tags`;
  } else {
    console.log(
      `${pkg}${version} already exists on npm. So, skipping npm and GitHub releases`,
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
      `${pkg}@${version} already exists on GitHub. So, skipping GitHub release`,
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
  console.log(`Created release for ${pkg}@${version} on GitHub`);
};
