const fs = require('fs');
const sass = require('node-sass');

const { yellow, green, red } = require('./utils');

const inDir = process.argv[2];
const outDir = process.argv[3];

const ignorePaths = ['.DS_Store', 'style'];

const compileScss = async (path, outFile) => {
  return new Promise((resolve, reject) => {
    sass.render({ file: path }, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      fs.writeFileSync(`${outDir}/${outFile}.css`, result.css);
      console.log(` Wrote -> ${outFile}.css [${result.stats.duration} ms]`);
      resolve();
    });
  });
};

const run = async () => {
  const files = await fs.promises.readdir(inDir, { withFileTypes: true });
  const directories = files.filter((f) => f.isDirectory()).map((f) => f.name);
  const promiseList = [];
  for (const directory of directories) {
    if (!ignorePaths.includes(directory)) {
      promiseList.push(
        compileScss(`${inDir}/${directory}/classes.scss`, directory)
      );
    }
  }

  promiseList.push(compileScss(`${inDir}/classes.scss`, 'all'));
  promiseList.push(compileScss(`${inDir}/style/global.scss`, 'global'));
  promiseList.push(
    compileScss(`${inDir}/reset-global-styles.scss`, 'reset-global-styles')
  );

  await Promise.all(promiseList);
  console.log(green(`Converted ${promiseList.length} files to CSS.`));
};

const main = async () => {
  console.log(yellow('Compiling SCSS to CSS'));
  try {
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    await run();
  } catch (error) {
    console.log(red(`Error converting files to CSS: ${error}`));
    process.exit(1);
  }
};

main();
