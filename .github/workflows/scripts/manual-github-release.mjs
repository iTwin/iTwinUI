/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import fs from 'node:fs';
import { Octokit } from 'octokit';

const publishablePackages = [
  '@itwin/itwinui-react',
  '@itwin/itwinui-variables',
];

/**
 * Parses the changeset file and returns the latest version
 * @param {"@itwin/itwinui-react" | "@itwin/itwinui-variables"} pkg
 * @returns {{ version: string; content: string; }}
 */
const parseChangelog = (pkg) => {
  const changelog = fs.readFileSync(
    `./packages/${pkg.substring('@itwin/'.length)}/CHANGELOG.md`,
    'utf8',
  );
  const lines = changelog.split('\n');

  /**
   * @param {string[]} lines
   * @returns {number}
   */
  const h2Index = (lines) => lines.findIndex((line) => line.startsWith('## '));

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

  const version = lines[firstH2Index].replace('## ', '');
  const content = lines.slice(firstH2Index + 2, secondH2Index - 1).join('\n');
  return {
    version,
    content,
  };
};

/**
 * @param {"@itwin/itwinui-react" | "@itwin/itwinui-variables"} pkg
 */
const createGitHubRelease = async (pkg) => {
  const { version, content } = parseChangelog(pkg);

  const tagName = `${pkg}@${version}`;
  const releaseName = tagName;
  const releaseBody = content;

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
    console.log(`Release for ${pkg}@${version} already exists`);
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

publishablePackages.forEach((pkg) => {
  createGitHubRelease(pkg);
});
