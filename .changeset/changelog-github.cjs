/** @type {import('@changesets/types').ChangelogFunctions} */
module.exports = {
  getReleaseLine: async ({ commit, summary }, type, options) => {
    checkOptionsRepo(options);

    const [firstLine, ...futureLines] = summary
      .split('\n')
      .map((l) => l.trimEnd());

    const prOrCommit = await (async () => {
      try {
        return await fetch(
          `https://api.github.com/repos/${options.repo}/commits/${commit}/pulls`,
        )
          .then((r) => r.json())
          .then(
            ([{ number }]) =>
              `[#${number}](https://github.com/${options.repo}/pull/${number}): `,
          );
      } catch {
        return `${commit}: ` || '';
      }
    })();

    let returnVal = `- ${prOrCommit}${firstLine}`;

    if (futureLines.length > 0) {
      returnVal += `\n${futureLines.map((l) => `  ${l}`).join('\n')}`;
    }

    return returnVal;
  },
  getDependencyReleaseLine: async (
    changesets,
    dependenciesUpdated,
    options,
  ) => {
    checkOptionsRepo(options);

    if (dependenciesUpdated.length === 0) return '';

    const updatedDependenciesList = dependenciesUpdated.map(
      (dependency) => `  - ${dependency.name}@${dependency.newVersion}`,
    );

    return ['- Updated dependencies:', ...updatedDependenciesList].join('\n');
  },
};

function checkOptionsRepo(options) {
  if (!options.repo) {
    throw new Error(
      'Please provide a repo to this changelog generator like this:\n"changelog": ["./changelog-github.mjs", { "repo": "org/repo" }]',
    );
  }
}
