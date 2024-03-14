/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import fs from 'node:fs';
import { Octokit, App } from 'octokit';

console.log(Octokit);

/**
 * @example
 * Input:
 * ```md
 * ---
 * "@itwin/itwinui-css": patch
 * ---
 *
 * This is a test changeset.
 * ```
 *
 * Output:
 * ```json
 * {
 *   "file": "file_name.md",
 *   "packages": {
 *    "@itwin/itwinui-css": "patch"
 *   },
 *   content: "This is a test changeset."
 * }
 * ```
 *
 * @example
 * Input:
 * ```md
 * ---
 * "@itwin/itwinui-react": patch
 * "@itwin/itwinui-variables": minor
 * ---
 *
 * This is a test changeset.
 * ```
 *
 * Output:
 * ```json
 * {
 *   "file": "file_name.md",
 *   "packages": {
 *     "@itwin/itwinui-react": "patch",
 *     "@itwin/itwinui-variables": "minor"
 *   },
 *   content: "This is a test changeset."
 * }
 * ```
 */
const parseChangeset = (changesetFile: string) => {
  const changeset = fs.readFileSync(`./.changeset/${changesetFile}`, 'utf8');

  const [metadata, content] = changeset.split('---\n\n');
  const packages = metadata
    .split('\n')
    .filter((line) => line.includes('@itwin'))
    .map((line) => line.split(':'))
    .reduce(
      (acc, [pkg, version]) => {
        acc[pkg.trim().substring(1, pkg.trim().length - 1)] = version.trim();
        return acc;
      },
      {} as Record<string, string>,
    );

  return {
    file: changesetFile,
    packages,
    content,
  };
};

/**
 * @example
 * Input:
 * ```json
 * [
 *   {
 *     "file": "file_name.md",
 *     "packages": {
 *      "@itwin/itwinui-css": "patch"
 *     },
 *     content: "This is a test changeset 1."
 *   },
 *   {
 *     "file": "file_name.md",
 *     "packages": {
 *       "@itwin/itwinui-react": "patch",
 *       "@itwin/itwinui-variables": "patch"
 *     },
 *     content: "This is a test changeset 2."
 *   },
 *   {
 *     "file": "file_name.md",
 *     "packages": {
 *       "@itwin/itwinui-react": "major",
 *       "@itwin/itwinui-variables": "minor"
 *     },
 *     content: "This is a test changeset 3."
 *   }
 * ]
 * ```
 *
 * Output:
 * ```json
 * [
 *   {
 *     package: "@itwin/itwinui-css",
 *     semver: "patch",
 *     contents: [
 *       "This is a test changeset 1.",
 *
 *   }
 * ]
 */
const getReleases = (changesets: ReturnType<typeof parseChangeset>[]) => {
  const releases = changesets.reduce(
    (acc, changeset) => {
      Object.entries(changeset.packages).forEach(([pkg, version]) => {
        if (acc[pkg]) {
          acc[pkg].push({
            version,
            changeset: changeset.file,
          });
        } else {
          acc[pkg] = [
            {
              version,
              changeset: changeset.file,
            },
          ];
        }
      });
      return acc;
    },
    {} as Record<string, { version: string; changeset: string }[]>,
  );

  return releases;
};

const changesetFiles = fs
  .readdirSync('./.changeset')
  .filter((file) => file.endsWith('.md'));
const changesets = changesetFiles.map((file) => parseChangeset(file));
const releases = getReleases(changesets);

console.log(releases);

// // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
// const octokit = new Octokit({ auth: `` });

// octokit.rest.repos.createRelease({
//   owner: 'iTwin',
//   repo: 'iTwinUI',
//   tag_name: '',
//   name: '',
//   draft: true,
//   body: '',
// });

// console.log(changesets);
