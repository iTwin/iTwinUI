/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const fs = require('fs');
const inquirer = require('inquirer');
const {
  copyrightBannerScss,
  copyrightBannerHtml,
  copyrightBannerJs,
} = require('./copyrightLinter');

inquirer
  .prompt([
    {
      name: 'component',
      type: 'input',
      message: 'What is the name of the component?',
    },
  ])
  .then(({ component }) => {
    const componentPascal = pascalize(component); // info-panel -> InfoPanel
    const componentKebab = kebabize(component); // InfoPanel -> info-panel

    const reactDirectory = `packages/itwinui-react/src/core/${componentPascal}`;
    makeDir(reactDirectory);
    writeFile(reactComponentFactory(reactDirectory, componentPascal));
    writeFile(reactComponentTestFactory(reactDirectory, componentPascal));
    writeFile(reactComponentIndexFactory(reactDirectory, componentPascal));
    appendFile(reactIndexAppendFactory(reactDirectory, componentPascal));

    const storyDirectory = 'apps/storybook/src';
    writeFile(storiesFactory(storyDirectory, componentPascal));
    writeFile(storyTestsFactory(storyDirectory, componentPascal));

    const cssPkgDirectory = `packages/itwinui-css`;
    const cssComponentDirectory = `${cssPkgDirectory}/src/${componentKebab}`;
    makeDir(cssComponentDirectory);
    writeFile(cssComponentIndexFactory(cssComponentDirectory, componentKebab));
    writeFile(
      cssComponentClassesFactory(cssComponentDirectory, componentKebab),
    );
    writeFile(cssComponentFactory(cssComponentDirectory, componentKebab));
    appendFile(cssGlobalAllFactory(`${cssPkgDirectory}/src`, componentKebab));

    const backstopDirectory = `${cssPkgDirectory}/backstop`;
    writeFile(demoHtmlFactory(`${backstopDirectory}/tests`, componentKebab));
    writeFile(
      scenarioJsFactory(`${backstopDirectory}/scenarios`, componentKebab),
    );
  });

// ----------------------------------------------------------------------------

/** Creates component .tsx under component directory */
const reactComponentFactory = (directory, componentName) => {
  return {
    path: `${directory}/${componentName}.tsx`,
    template: `${copyrightBannerJs}
import * as React from 'react';
import { useGlobals } from '../utils/index.js';

export type ${componentName}Props = {};

/**
 * Describe me here!
 * @example
 * Example usages go here!
 */
export const ${componentName} = (props: ${componentName}Props) => {
  const { ...rest } = props;
  useGlobals();
  return <div {...rest} />;
};

export default ${componentName};
`,
  };
};

/** Creates stories.tsx file next to all other stories */
const storiesFactory = (directory, componentName) => {
  return {
    path: `${directory}/${componentName}.stories.tsx`,
    template: `${copyrightBannerJs}
import { Story, Meta } from '@storybook/react';
import * as React from 'react';
import { ${componentName}, ${componentName}Props } from '@itwin/itwinui-react';

export default {
  component: ${componentName},
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
  },
  title: 'Core/${componentName}',
} as Meta<${componentName}Props>;

export const Basic: Story<${componentName}Props> = (args) => {
  return <${componentName} {...args} />;
};
`,
  };
};

/** Creates .test.ts file next to all other stories/tests */
const storyTestsFactory = (directory, componentName) => {
  return {
    path: `${directory}/${componentName}.test.ts`,
    template: `${copyrightBannerJs}
describe('${componentName}', () => {
  const storyPath = 'Core/${componentName}';
  const tests = ['Basic'];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.compareSnapshot(testName);
    });
  });
});    
`,
  };
};

/** Creates index.tsx file under component directory */
const reactComponentIndexFactory = (directory, componentName) => {
  return {
    path: `${directory}/index.ts`,
    template: `${copyrightBannerJs}
export { ${componentName} } from './${componentName}';
export type { ${componentName}Props } from './${componentName}';
export default './${componentName}';
`,
  };
};

/** Creates .test.tsx file under component directory */
const reactComponentTestFactory = (directory, componentName) => {
  return {
    path: `${directory}/${componentName}.test.tsx`,
    template: `${copyrightBannerJs}
import * as React from 'react';
import { render } from '@testing-library/react';

import { ${componentName} } from './${componentName}';

it('should render in its most basic state', () => {
  // TODO: Make sure all required props are passed in here
  const { container } = render(<${componentName} />);
  expect(container.querySelector('div')).toBeTruthy();
});

// TODO: Write tests here!

it('should be improved', () => {
  expect(false).toBe(true);
});
`,
  };
};

/** Appends component exports to the main barrel file */
const reactIndexAppendFactory = (directory, componentName) => {
  return {
    path: `${directory.split('/').slice(0, -1).join('/')}/index.ts`,
    template: `
export { ${componentName} } from './${componentName}';
export type { ${componentName}Props } from './${componentName}';
`,
  };
};

/** Creates index.scss under component directory */
const cssComponentIndexFactory = (directory, componentName) => {
  return {
    path: `${directory}/index.scss`,
    template: `${copyrightBannerScss}\n@import './${componentName}';\n`,
  };
};

/** Creates classes.scss under component directory */
const cssComponentClassesFactory = (directory, componentName) => {
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
const cssGlobalAllFactory = (directory, componentName) => {
  return {
    path: `${directory}/all.scss`,
    template: `@import './${componentName}/classes';\n`,
  };
};

/** Creates an empty component .scss file */
const cssComponentFactory = (directory, componentName) => {
  return {
    path: `${directory}/${componentName}.scss`,
    template: `${copyrightBannerScss}\n@mixin iui-${componentName} {};\n`,
  };
};

/** Creates a component .html with theme button */
const demoHtmlFactory = (directory, componentName) => {
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

/** Creates a .js file with a basic backstop visual test scenario */
const scenarioJsFactory = (directory, componentName) => {
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

// ----------------------------------------------------------------------------

function pascalize(text) {
  const clearAndUpper = (t) => t.replace(/-/, '').toUpperCase();
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

function kebabize(text) {
  return text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const makeDir = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

const writeFile = (obj) => {
  if (!fs.existsSync(obj.path)) {
    fs.writeFile(obj.path, obj.template, (error) => {
      if (error) {
        throw new Error(error.message);
      }
      console.log('Successfully wrote', obj.path);
    });
  }
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
      if (error) {
        throw new Error(error.message);
      }
      console.log('Successfully appended', obj.path);
    });
  } else {
    writeFile(obj);
  }
};
