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
    appendFile(reactIndexAppendFactory(componentPascal));

    const storyDirectory = 'apps/react-workshop/src';
    writeFile(storiesFactory(storyDirectory, componentPascal));
    writeFile(storyTestsFactory(storyDirectory, componentPascal));

    const cssPkgDirectory = `packages/itwinui-css`;
    const cssComponentDirectory = `${cssPkgDirectory}/src/${componentKebab}`;
    makeDir(cssComponentDirectory);
    writeFile(cssComponentFactory(cssComponentDirectory, componentKebab));
    appendFile(cssGlobalAllFactory(`${cssPkgDirectory}/src`, componentKebab));

    const htmlDirectory = `apps/css-workshop`;
    writeFile(demoHtmlFactory(`${htmlDirectory}/pages`, componentKebab));
    writeFile(
      scenarioJsFactory(`${htmlDirectory}/backstop/tests`, componentKebab),
    );
  });

// ----------------------------------------------------------------------------

/** Creates component .tsx under component directory */
const reactComponentFactory = (directory, componentName) => {
  return {
    path: `${directory}/${componentName}.tsx`,
    template: `${copyrightBannerJs}
import * as React from 'react';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type ${componentName}Props = {};

/**
 * Describe me here!
 * @example
 * Example usages go here!
 */
export const ${componentName} = React.forwardRef((props, forwardedRef) => {
  const { ...rest } = props;
  return <Box ref={forwardedRef} {...rest} />;
}) as PolymorphicForwardRefComponent<'div', ${componentName}Props>;
`,
  };
};

/** Creates stories.tsx file next to all other stories */
const storiesFactory = (directory, componentName) => {
  return {
    path: `${directory}/${componentName}.stories.tsx`,
    template: `${copyrightBannerJs}
import * as React from 'react';
import { ${componentName} } from '@itwin/itwinui-react';

export default {
  component: ${componentName},
  title: '${componentName}',
};

export const Basic = () => {
  return <${componentName} />;
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
  const storyPath = '${componentName}';
  const tests = ['Basic'];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(500);
      
      cy.compareSnapshot(testName);
    });
  });
});    
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

import { ${componentName} } from './${componentName}.js';

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
    path: 'packages/itwinui-react/src/index.ts',
    template: `
export { ${componentName} } from './${componentName}/${componentName}.js';
`,
  };
};

/** Appends component classes to global all.scss */
const cssGlobalAllFactory = (directory, componentName) => {
  return {
    path: `${directory}/all.scss`,
    template: `@forward '${componentName}/${componentName}';\n`,
  };
};

/** Creates an empty component .scss file */
const cssComponentFactory = (directory, componentName) => {
  return {
    path: `${directory}/${componentName}.scss`,
    template: `${copyrightBannerScss}\n\n.iui-${componentName} {};\n`,
  };
};

/** Creates a component .html with theme button */
const demoHtmlFactory = (directory, componentName) => {
  const template = `\
---
import Layout from './_layout.astro';
---

<Layout title=${componentName}>
  <h1>${componentName}</h1>
  <hr />

  <section id="demo-default">
    <div class="iui-${componentName}"></div>
  </section>
</Layout>
`;

  return {
    path: `${directory}/${componentName}.astro`,
    template: template,
  };
};

/** Creates a .js file with a basic backstop visual test scenario */
const scenarioJsFactory = (directory, componentName) => {
  const template = `${copyrightBannerJs}
const { scenario } = require('./~scenarioHelper.cjs');

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
