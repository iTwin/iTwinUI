/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const fs = require('fs');
const { copyrightBannerScss, copyrightBannerHtml, copyrightBannerJs } = require('../../../scripts/copyrightLinter');

const componentName = process.argv.slice(2).join('-');

const makeDir = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

const writeFile = (obj) => {
  fs.writeFile(obj.path, obj.template, (error) => {
    if (error) throw new Error(error.message);
    console.log('Successfully wrote', obj.path);
  });
};

const appendFile = (obj) => {
  if (fs.existsSync(obj.path)) {
    let file = fs.readFileSync(obj.path, 'utf-8');
    let tester = new RegExp(`.*${obj.template}.*`);
    let count = 0;

    for (const line of file.split('\n')) {
      if (tester.test(line)) {
        throw new Error(`Duplicate line in ${obj.path}: ${count}`);
      }
      count++;
    }

    fs.appendFile(obj.path, obj.template, (error) => {
      if (error) throw new Error(error.message);
      console.log('Successfully appended', obj.path);
    });
  } else {
    writeFile(obj);
  }
};

/** Creates index.scss under component directory */
const componentIndexFactory = (directory) => {
  return {
    path: `${directory}/index.scss`,
    template: `${copyrightBannerScss}\n@import './${componentName}';\n`,
  };
};

/** Creates classes.scss under component directory */
const componentClassesFactory = (directory) => {
  const template = `${copyrightBannerScss}
@import './index';

.iui-${componentName} {
  @include iui-${componentName};
}
`;

  return {
    path: `${directory}/classes.scss`,
    template: template,
  };
};

/** Appends component classes to global all.scss */
const globalAllFactory = (directory) => {
  return {
    path: `${directory}/all.scss`,
    template: `@import './${componentName}/classes';\n`,
  };
};

/** Creates an empty component .scss file */
const componentFactory = (directory) => {
  return {
    path: `${directory}/${componentName}.scss`,
    template: `${copyrightBannerScss}\n@mixin iui-${componentName} {};\n`,
  };
};

/** Creates a component .html with theme button */
const demoHtmlFactory = (directory) => {
  const template = `${copyrightBannerHtml}
<!DOCTYPE html>
<html lang="en-US" id="theme">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${componentName} | iTwinUI</title>
    
    <script type="module">
      import "./assets/theme.js";
    </script>
    <style>
      @import url("./assets/demo.css") layer(demo);
      @import url('@itwin/itwinui-variables') layer(variables);
      @import url("@itwin/itwinui-css/css/all.css") layer(itwinui);
    </style>
  </head>
  <body class="iui-root">
    <theme-button></theme-button>
    <h1>${componentName}</h1>
    <hr />

    <section id="demo-default">
      <div class="iui-${componentName}"></div>
    </section>
  </body>
</html>
`;

  return {
    path: `${directory}/${componentName}.html`,
    template: template,
  };
};

/** Creates a .js file with a basic visual test scenario */
const scenarioJsFactory = (directory) => {
  const template = `${copyrightBannerJs}
const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('default', {
    selectors: ['#demo-default'],
  }),
];
`;

  return {
    path: `${directory}/${componentName}.js`,
    template: template,
  };
};

// Write/append all the files if componentName passed as command line arg
if (componentName) {
  makeDir(`src/${componentName}`);

  writeFile(componentIndexFactory(`src/${componentName}`));
  writeFile(componentClassesFactory(`src/${componentName}`));
  writeFile(componentFactory(`src/${componentName}`));
  writeFile(demoHtmlFactory(`backstop/tests`));
  writeFile(scenarioJsFactory(`backstop/scenarios`));

  appendFile(globalAllFactory('src'));
}
