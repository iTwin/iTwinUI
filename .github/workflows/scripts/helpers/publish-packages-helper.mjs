import { $ } from 'execa';
import fs from 'fs';
import { parseChangelog } from './changelog-parser.mjs';

/**
 * Gets the current version of the package from package.json
 * @param {"@itwin/itwinui-react" | "@itwin/itwinui-variables"} pkg
 * @returns {Promise<string>}
 */
const getCurrentPackageVersion = async (pkg) => {
  const packageJson = JSON.parse(
    fs.readFileSync(
      `./packages/${pkg.substring('@itwin/'.length)}/package.json`,
      'utf8',
    ),
  );
  return packageJson.version;
};
/**
 * Gets the latest version of the package from npm
 * @param {"@itwin/itwinui-react" | "@itwin/itwinui-variables"} pkg
 */
const getNpmPackageVersion = async (pkg) => {
  return await $`npm view ${pkg} version`;
};

/**
 * Returns 0 if a === b, 1 if a > b, -1 if a < b
 *
 * @example
 * semverCompare('1.0.0', '1.0.0') // 0
 * semverCompare('1.0.0', '1.0.1') // -1
 * semverCompare('1.0.1', '1.0.0') // 1
 *
 * @param {string} packageVersionA
 * @param {string} packageVersionB
 */
const semverCompare = (packageVersionA, packageVersionB) => {
  const a = packageVersionA.split('.').map(Number);
  const b = packageVersionB.split('.').map(Number);

  for (let i = 0; i < a.length; i++) {
    if (a[i] > b[i]) return 1;
    if (a[i] < b[i]) return -1;
  }

  return 0;
};

/**
 * @param {"@itwin/itwinui-react" | "@itwin/itwinui-variables"} pkg
 * @param {string} version (E.g. "3.6.0")
 * @returns {Promise<boolean>}
 */
const shouldPublishToNpm = async (pkg, version) => {
  const { stdout: npmLatestVersion } = await getNpmPackageVersion(pkg);

  // If current version is ahead of npm, publish
  return semverCompare(version, npmLatestVersion) === 1;
};

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
  console.log(`Created release for ${pkg}@${version} on GitHub`);
};
