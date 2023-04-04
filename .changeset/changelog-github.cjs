// see https://github.com/changesets/changesets/blob/main/docs/modifying-changelog-format.md

/** @type {import('@changesets/types').ChangelogFunctions} */
module.exports = {
  getReleaseLine: async ({ commit, summary }, type, options) => {
    if (!options.repo) {
      throw new Error(
        'Please provide a repo to this changelog generator like this:\n"changelog": ["./changelog-github.mjs", { "repo": "org/repo" }]',
      );
    }

    const [firstLine, ...futureLines] = summary
      .split('\n')
      .map((l) => l.trimEnd());

    // make API call to find PR number associated with the commit
    const prOrCommit = await (async () => {
      try {
        const [{ number }] = await fetch(
          `https://api.github.com/repos/${options.repo}/commits/${commit}/pulls`,
        ).then((r) => r.json());

        return `[#${number}](https://github.com/${options.repo}/pull/${number})`;
      } catch {
        // fallback to commit sha if API call fails for some reason
        return commit;
      }
    })();

    let returnVal = `- ${prOrCommit}: ${firstLine}`;

    // indent everything so it's aligned with the first line
    if (futureLines.length > 0) {
      returnVal += `\n${futureLines.map((l) => `  ${l}`).join('\n')}`;
    }

    return returnVal;
  },

  getDependencyReleaseLine: async (changesets, dependenciesUpdated) => {
    if (dependenciesUpdated.length === 0) return '';

    const updatedDependenciesList = dependenciesUpdated.map(
      (dependency) => `  - ${dependency.name}@${dependency.newVersion}`,
    );

    return ['- Updated dependencies:', ...updatedDependenciesList].join('\n');
  },
};
