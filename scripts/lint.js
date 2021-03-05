const myConfig = require('../.stylelintrc.json');
const stylelint = require('stylelint');

const yellow = (colored, plain) => {
  console.log('\x1b[33m%s\x1b[0m%s', colored, plain);
};
const red = (colored, plain) => {
  console.log('\x1b[31m%s\x1b[0m%s', colored, plain);
};
const cyanAfter = (plain, colored) => {
  console.log('%s\x1b[36m%s\x1b[0m', plain, colored);
};

let fileCount = 0;
let errorCount = 0;
let isError = false;

stylelint
  .lint({
    config: myConfig,
    files: ['src/**/*.scss', 'backstop/tests/*.html'],
    fix: true,
  })
  .then(function (data) {
    let output = JSON.parse(data.output);
    for (const file of output) {
      if (file.errored) {
        isError = true;
        fileCount++;
        red('Error: ', file.source);
        for (const warning of file.warnings) {
          errorCount++;
          yellow(
            `  ${warning.rule}`,
            ` | (${warning.line}, ${warning.column})`,
          );
          console.log(`    ${warning.text}`);
        }
      }
    }
    console.log();
    cyanAfter(`Files with errors: `, fileCount);
    cyanAfter(`Total errors: `, errorCount);
    if (isError) {
      throw new Error('Linter Encountered Error.');
    }
  })
  .catch(function (err) {
    console.error(err.stack);
    process.exit(1); //mandatory (as per the Node docs)
  });
