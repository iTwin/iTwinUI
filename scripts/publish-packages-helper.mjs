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
    if (await shouldPublishToNpm(`${pkg}@${currentPackageVersion}`)) {
      packagesToPublish[pkg] = currentPackageVersion;
    }
  }

  return packagesToPublish;
};

/**
 * Releases all unpublished packages to npm.
 */
export const createNpmReleases = async () => {
  try {
    await $`pnpm changeset publish`;
  } catch (error) {
    console.log('Failed to release to npm');
    throw error;
  }
};

/**
 * Releases GitHub.
 * @param {string} pkg
 * @param {string} version (E.g. "3.6.0")
 */
export const createGithubRelease = async (pkg, version) => {
  // Release to GitHub
  const tagName = `${pkg}@${version}`;
  const releaseBody = parseChangelog(pkg, version);

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  octokit.rest.repos.createRelease({
    owner: 'iTwin',
    repo: 'iTwinUI',
    tag_name: tagName,
    name: tagName,
    body: releaseBody,
  });
  console.log(`Created release for ${pkg}@${version} on GitHub`);
};

/**
 * @param {string} pkg (e.g. `"pkg"` or `"pkg@version"`)
 */
const shouldPublishToNpm = async (pkg) => {
  try {
    await $`npm view ${pkg} version`;

    // If no error, package version already exists on npm
    return false;
  } catch (error) {
    // If error, package version does not exist on npm
    return true;
  }
};

/**
 * Gets the current version of the package from package.json
 * @param {string} pkg
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
