import * as fs from 'fs';
import { render } from 'node-sass';
import { promisify } from 'util';

import * as symbols from 'log-symbols';
import { clearConsole, yellow, green, blue, timedLog } from './utils';

const ignorePaths = new RegExp('(.DS_Store)', 'gim');

clearConsole();

console.log(yellow('Compiling SCSS to CSS'));
console.log();

const path = './src';
const readdir: (directory: string) => Promise<string[]> = promisify(fs.readdir);

if (!fs.existsSync('./lib/')) {
  fs.mkdirSync('./lib/');
}

if (!fs.existsSync('./lib/css')) {
  fs.mkdirSync('./lib/css');
}

const renderSass = (path, file) => {
  return new Promise((resolve, reject) => {
    render(
      {
        file: path,
      },
      (err, result) => {
        if (!err) {
          fs.writeFile(`lib/css/${file}.css`, result.css, (err: any) => {
            if (err) {
              console.log(symbols.error, 'Error in writing file');
              reject(new Error(err.message));
            } else {
              console.log(
                '',
                green(symbols.success),
                green('Wrote ->'),
                blue(file + '.css'),
              );
              resolve();
            }
          });
        } else {
          throw new Error(err.message);
        }
      },
    );
  });
};

readdir(path).then(async (files) => {
  console.log('', blue(symbols.info), 'Read', blue(path));
  let count = 0;
  console.log();
  for (const file of files) {
    let regExp = new RegExp('.scss$', 'gim');
    const matchesScss = regExp.test(file);

    regExp = new RegExp('^bwc', 'gim');
    const matchesBwc = regExp.test(file);

    regExp = new RegExp('^style$', 'gim');
    const matchesStyle = regExp.test(file);

    const matchesIgnorePaths = ignorePaths.test(file);

    if (!(matchesScss || matchesBwc || matchesStyle || matchesIgnorePaths)) {
      renderSass(`${path}/${file}/classes.scss`, file)
        .then((result: string[]) => {
          count++;
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    }
  }

  await renderSass(`${path}/classes.scss`, 'all')
    .then((result: string[]) => {
      count++;
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  await renderSass(`${path}/style/global.scss`, 'global')
    .then((result: string[]) => {
      count++;
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  await renderSass(`${path}/reset-global-styles.scss`, 'reset-global-styles')
    .then((result: string[]) => {
      count++;
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  console.log();
  timedLog('', blue(symbols.info), 'Wrote', blue(count), 'files');
  console.log();
});
