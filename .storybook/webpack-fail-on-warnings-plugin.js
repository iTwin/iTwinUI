// Copyright (c) Bentley Systems, Incorporated. All rights reserved.

const ignoredWarnings = [
  'AssetsOverSizeLimitWarning',
  'EntrypointsOverSizeLimitWarning',
  'NoAsyncChunksWarning',
];

class WebpackFailOnWarningsPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('FailOnWarnings', (stats) => {
      const warnings = stats.compilation.warnings.filter(
        (warning) => !ignoredWarnings.includes(warning.name),
      );
      const exitMessage = `Exiting process because of unexpected warnings in webpack build.`;
      if (warnings.length > 0) {
        process.on('beforeExit', () => {
          console.error(exitMessage);
          process.exit(1);
        });
      }
    });
  }
}

module.exports = WebpackFailOnWarningsPlugin;
