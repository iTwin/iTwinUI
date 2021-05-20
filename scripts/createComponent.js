/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const inquirer = require('inquirer');
const fs = require('fs');

const copyrightHeader =
  '/*---------------------------------------------------------------------------------------------\n ' +
  '* Copyright (c) Bentley Systems, Incorporated. All rights reserved.\n ' +
  '* See LICENSE.md in the project root for license terms and full copyright notice.\n ' +
  '*--------------------------------------------------------------------------------------------*/';

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
) => `export const ${name} = (props: ${name}Props) => {
  const { ...rest } = props;
  useTheme();
  return <div {...rest} />;
};`;

const componentFactory = (directory, name) => {
  return {
    path: `${directory}/${name}.tsx`,
    template: `${copyrightHeader}
import React from 'react';
import { useTheme } from '../utils/hooks/useTheme';

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

const storiesFactory = (directory, name) => {
  return {
    path: `${directory}/${name}.stories.tsx`,
    template: `${copyrightHeader}
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { ${name}, ${name}Props } from '../../src/core';

export default {
  component: ${name},
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
  },
  title: 'Core/${name}',
} as Meta<${name}Props>;

export const Basic: Story<${name}Props> = (args) => {
  return <${name} {...args} />;
};
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
      name: 'component',
      type: 'input',
      message: 'What is the name of the component?',
    },
  ])
  .then(({ component }) => {
    console.log();
    let directory = 'src/core';
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

    writeFile(storiesFactory('stories/core', component));
  });
