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

type Package = 'itwinui-css' | 'itwinui-react' | 'itwinui-variables';

/**
 * Parses the changeset file and returns the latest version
 */
const parseChangelog = (pkg: Package) => {
  const changelog = fs.readFileSync(`./packages/${pkg}/CHANGELOG.md`, 'utf8');
  const lines = changelog.split('\n');

  const h2Index = (lines: string[]) =>
    lines.findIndex((line) => line.startsWith('## '));

  const firstH2Index = h2Index(lines);
  const secondH2Index = (() => {
    const newLines = lines.slice(firstH2Index + 1);

    let index = h2Index(newLines);
    // If this is the only version, return where the next version would have started, if it existed
    if (index === -1) {
      index = newLines.length;
    }

    return index + firstH2Index + 1; // Add the offset to account for the slice
  })();

  const latestVersion = lines
    .slice(firstH2Index + 2, secondH2Index - 1)
    .join('\n');
  return latestVersion;
};

// const changesetFiles = fs
//   .readdirSync('./.changeset')
//   .filter((file) => file.endsWith('.md'));
// const changesets = changesetFiles.map((file) => parseChangeset(file));

const changelog = parseChangelog('itwinui-react');
console.log(changelog);

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
