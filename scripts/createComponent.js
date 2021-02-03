const inquirer = require('inquirer');
const fs = require('fs');

const makeDir = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

const writeFile = (obj) => {
  const template = obj.template.replace(/\n/gm, '\r\n');
  fs.writeFile(obj.path, template, (error) => {
    if (error) throw new Error(error.message);
    console.log('Successfully wrote', obj.path);
  });
};

const appendFile = (obj, sub = false) => {
  if (fs.existsSync(obj.path)) {
    let file = fs.readFileSync(obj.path, 'utf-8');
    let tester = new RegExp(`.*${obj.template}.*`);
    let count = 0;

    for (const line of file.split('\n')) {
      if (tester.test(line)) {
        if (sub) {
          return;
        } else {
          throw new Error(`Duplicate line in ${obj.path}: ${count}`);
        }
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
    template: `import React from 'react';

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
    template: `export { ${name} } from './${name}';
export type { ${name}Props } from './${name}';
export default './${name}';
`,
  };
};

const componentTestFactory = (directory, name) => {
  return {
    path: `${directory}/${name}.test.tsx`,
    template: `import React from 'react';
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

const subCollectionAppendFactory = (directory, name) => {
  return {
    path: `${directory.split('/').slice(0, -2).join('/')}/index.ts`,
    template: `export { default as ${name} } from './${name}';`,
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
      name: 'isSub',
      type: 'confirm',
      message: 'Is this component part of a sub-collection?',
      default: false,
    },

    {
      when: (answers) => {
        return answers.isSub === true;
      },
      name: 'subCollection',
      type: 'input',
      message: 'What is the name of that sub-collection',
    },

    {
      name: 'component',
      type: 'input',
      message: 'What is the name of the component?',
    },
  ])
  .then((answers) => {
    console.log();
    let { collection, isSub, subCollection, component } = answers;
    let directory = `src/${collection}`;
    let levels = [];

    if (isSub) {
      directory += `/${subCollection}`;
      levels.push(directory);
    }

    directory += `/${component}`;
    levels.push(directory);

    let componentOut = componentFactory(directory, component);
    let componentTest = componentTestFactory(directory, component);
    let componentIndex = componentIndexFactory(directory, component);
    let indexAppend = indexAppendFactory(directory, component);

    for (const level of levels) {
      makeDir(level);
    }

    if (isSub) {
      let subCollectionAppend = subCollectionAppendFactory(
        directory,
        subCollection,
      );
      appendFile(subCollectionAppend, true);
    }

    appendFile(indexAppend);

    writeFile(componentOut);
    writeFile(componentTest);
    writeFile(componentIndex);
  });
