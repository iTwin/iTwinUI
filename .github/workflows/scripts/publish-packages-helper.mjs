import { $ } from 'execa';

/**
 * Gets the current version of the package from package.json
 * @param {"@itwin/itwinui-react" | "@itwin/itwinui-variables"} pkg
 * @returns {Promise<string>}
 */
const getCurrentPackageVersion = async (pkg) => {
  const packageJson = JSON.parse(
    fs.readFileSync(
      `./packages/${pkg.substring('@itwin/'.length)}/CHANGELOG.md`,
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

const shouldPublishToNpm = async (pkg, version) => {
  const npmLatestVersion = await getNpmPackageVersion(pkg);

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
