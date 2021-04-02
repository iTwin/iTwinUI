# Storybook

## How to run Storybook in development mode

Execute `yarn storybook` command from main file directory

## Folder structure

stories/core : Contains all of the stories of the components in src/core.

## Writing Stories

Given a component named `Alert`

```jsx
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Alert, AlertProps } from '../../src/core';

export default {
  title: 'Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          'A small box to quickly grab user attention and communicate a brief message',
      },
    },
  },
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    onClick: { control: { disable: true } },
    onClose: { control: { disable: true } },
  },
} as Meta<AlertProps>;
```

* `title` : this controls the name shown in the sidebar for the component. It should be unique. If a component is a sub-class of another component the title should be **Parent Component / Child Component**. Example: Input/Checkbox.
* `component`: the name of the component. Storybook uses this to get the props and other meta data about the component.
* `parameters`: set of static, named metadata about a story, typically used to control the behavior of Storybook features and addons. In the example above, it is being used to describe the component and Storybook docs add-on will display it in the Docs tab.
i.e. use `controls: { hideNoControlsWarning: true }` to hide message if component has no props/controls in stories.
* `argTypes`: used to set some default values/behavior to all stories. In this example we hide some props (className, style and click handlers) from the controls tab as there is no point to change those for the user. Read more about argTypes in the links below.

```jsx
export const Informational: Story<AlertProps> = (args) => {
  return (
    <Alert
      type='informational'
      clickableText='More Info.'
      onClose={action('Close!')}
      onClick={action('Clicked more info!')}
      {...args}
    >
      {args.children}
    </Alert>
  );
};

Informational.args = {
  children: 'This is an informational message.',
  clickableText: 'More Info.',
  type: 'informational',
};

```

* `Informational` - the name of the story. Should be always PascalCase. Use name `Basic` if story just displays component with default values.
* `Informational.args` - this can be used to define initial values of the component props.
* `action('Close!')` - use action from `@storybook/addon-actions` to display any actions happening in 'Actions' tab.

Before writing more complicated stories, be sure to check up already written stories to keep the same code style. We already have used the most of the common storybook features.

## Useful links
* [Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)
* [argTypes](https://storybook.js.org/docs/react/api/argtypes)
* [args](https://storybook.js.org/docs/react/writing-stories/args)
* [Controls add-on](https://storybook.js.org/docs/react/essentials/controls)
* [Docs add-on](https://github.com/storybookjs/storybook/blob/master/addons/docs/README.md)
* [Add-ons market place](https://storybook.js.org/addons)
