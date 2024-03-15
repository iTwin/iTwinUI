/**
 * Parses the changelog file and returns the contents for the specified version.
 * @param {"@itwin/itwinui-react" | "@itwin/itwinui-variables"} pkg
 * @returns {string}
 */
export const parseChangelog = (pkg, version) => {
  const changelog = fs.readFileSync(
    `./packages/${pkg.substring('@itwin/'.length)}/CHANGELOG.md`,
    'utf8',
  );
  const lines = changelog.split('\n');

  /**
   * @param {string[]} lines
   * @param {string | undefined} version (E.g. "3.6.0")
   * @returns {number}
   */
  const h2Index = (lines, version) =>
    lines.findIndex((line) =>
      version != null ? line === `## ${version}` : line.startsWith('## '),
    );

  const firstH2Index = h2Index(lines, version);
  const secondH2Index = (() => {
    const newLines = lines.slice(firstH2Index + 1);

    let index = h2Index(newLines);
    // If this is the only version, return where the next version would have started, if it existed
    if (index === -1) {
      index = newLines.length;
    }

    return index + firstH2Index + 1; // Add the offset to account for the slice
  })();

  const content = lines.slice(firstH2Index + 2, secondH2Index - 1).join('\n');
  return content;
};
