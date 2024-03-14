/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import fs from 'node:fs';
import { Octokit, App } from 'octokit';
import * as core from '@actions/core';
// import { GitHubReleasesData } from './cache-github-releases-data.ts';

const publishablePackages = [
  '@itwin/itwinui-react',
  '@itwin/itwinui-variables',
] as const;
type PublishablePackages = (typeof publishablePackages)[number];
const possibleSemvers = ['major', 'minor', 'patch'] as const;
type PossibleSemvers = (typeof possibleSemvers)[number];

// const createGitHubRelease = (pkg: PublishablePackages) => {
//   if (!releasePackages.includes(pkg)) {
//     return;
//   }

//   const { version, content } = parseChangelog(pkg);

//   // const tagName = `${pkg}@${version}`;
//   const releaseName = `${pkg}@${version}`;
//   const releaseBody = content;

//   // console.log(`Creating release for ${pkg}@${version}`);
//   console.log({ pkg, releaseName, releaseBody });

//   // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
//   // const octokit = new Octokit({ auth: `` });

//   // octokit.rest.repos.createRelease({
//   //   owner: 'iTwin',
//   //   repo: 'iTwinUI',
//   //   tag_name: '',
//   //   name: '',
//   //   draft: true,
//   //   body: '',
//   // });
// };

// publishablePackages.forEach((pkg) => {
//   const changelog = parseChangelog(pkg);
//   console.log(`${pkg}: `, changelog);
// });

// const changesetFiles = fs
//   .readdirSync('./.changeset')
//   .filter((file) => file.endsWith('.md'));
// const changesets = changesetFiles.map((file) => parseChangeset(file));
// const releasePackages = getReleasePackages();
// releasePackages.forEach((pkg) => {
//   createGitHubRelease(pkg);
// });

// const githubReleasesData = JSON.parse(
//   core.getInput('github-releases-data'),
// );
// ) as GitHubReleasesData;

console.log('RECEIVED OUTPUT 123:');
console.log(core.getInput('github-releases-data'));
console.log('RECEIVED OUTPUT END');

console.log('ENV', process.env.GITHUB_RELEASES_DATA);

// console.log(changesets);
// console.log(releases);

// const changelog = parseChangelog('itwinui-react');
// console.log(changelog);

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
