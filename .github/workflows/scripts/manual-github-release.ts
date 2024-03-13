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

const changesetFiles = fs
  .readdirSync('./.changeset')
  .filter((file) => file.endsWith('.md'));
const changesets = changesetFiles.map((file) => parseChangeset(file));

console.log(changesets);
