// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
const inquirer = require('inquirer');
const fs = require('fs');

const copyrightHeader = `// Copyright (c) Bentley Systems, Incorporated. All rights reserved.`;

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

const functionalTemplate = (
  name,
) => `export const ${name}: React.FC<${name}Props> = (props) => {
  const { ...rest } = props;

  return <div {...rest} />;
};`;

const componentFactory = (directory, name) => {
  return {
    path: `${directory}/${name}.tsx`,
    template: `${copyrightHeader}
import React from 'react';

export type ${name}Props = {};

/**
 * Describe me here!
 * @example
 * Example usages go here!
 */
${functionalTemplate(name)}

export default ${name};
`,
  };
};

const componentIndexFactory = (directory, name) => {
  return {
    path: `${directory}/index.ts`,
    template: `${copyrightHeader}
export { ${name} } from './${name}';
export type { ${name}Props } from './${name}';
export default './${name}';
`,
  };
};

const componentTestFactory = (directory, name) => {
  return {
    path: `${directory}/${name}.test.tsx`,
    template: `${copyrightHeader}
import React from 'react';
import { render } from '@testing-library/react';

import { ${name} } from './${name}';

it('should render in its most basic state', () => {
  // TODO: Make sure all required props are passed in here
  const { container } = render(<${name} />);
  expect(container.querySelector('div')).toBeTruthy();
});

// TODO: Write tests here!

it('should be improved', () => {
  expect(false).toBe(true);
});
`,
  };
};

const indexAppendFactory = (directory, name) => {
  return {
    path: `${directory.split('/').slice(0, -1).join('/')}/index.ts`,
    template: `
export { ${name} } from './${name}';
export type { ${name}Props } from './${name}';
`,
  };
};

inquirer
  .prompt([
    {
      name: 'collection',
      type: 'list',
      message: 'Which collection would you like to add to?',
      choices: ['core', 'utils'],
      default: 0,
    },

    {
      name: 'component',
      type: 'input',
      message: 'What is the name of the component?',
    },
  ])
  .then((answers) => {
    console.log();
    let { collection, component } = answers;
    let directory = `src/${collection}`;
    let levels = [];

    directory += `/${component}`;
    levels.push(directory);

    let componentOut = componentFactory(directory, component);
    let componentTest = componentTestFactory(directory, component);
    let componentIndex = componentIndexFactory(directory, component);
    let indexAppend = indexAppendFactory(directory, component);

    for (const level of levels) {
      makeDir(level);
    }

    appendFile(indexAppend);

    writeFile(componentOut);
    writeFile(componentTest);
    writeFile(componentIndex);
  });
