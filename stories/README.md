# Storybook

## How to run Storybook in development mode

Exec `npm run storybook` from main file directory

## Directory

stories/core : Contains all of the stories of the components contained in src/core.

## Writing Stories

Make sure to install the necessary Storybook add-ons if they are not and make sure to include them in [.storybook/main.js](../.storybook/main.js) or any other file as the usage section of that add-on says. Read the [Storybook 6](https://medium.com/storybookjs/storybook-6-0-1e14a2071000) documentation and make sure to use the correct file name and avoid the add-ons which will be deprecated soon.


Given a component named `Alert`

```
import React from 'react'
import { Alert } from '../../src/core'

export default {
  title: 'Alert',
  component: Alert,
  parameters: { docs: { description: { component: 'A small box to quickly grab user attention and communicate a brief message' } } }
}
```

* `title` : this controls the name shown in the sidebar for the component. It should be unique. If a component is a sub-class of another component the title should be **Parent Component / Child Component**. Example: Input/Checkbox
* `component`: the name of the component. Storybook uses this to get the props and other meta data about the component
* `parameters`: set of static, named metadata about a story, typically used to control the behavior of Storybook features and addons. In the example above, it is being used to describe the component and Storybook docs add-on will display it in the Docs tab.

```
export const info = (args) => {
  return (
    <Alert
      type='info'
      clickableText="More Info."
      {...args}
    >
      {args.message}
    </Alert>
  )
}

info.argTypes = {
  clickableText: { defaultValue: 'More Info.' }
}

info.args = {
  message: 'This is an info message'
}

```

* `info` - the name of the story
* `args` - used for handling dynamic changes along with the storybook controls add-on
* `info.argTypes` - used to set the default value for a prop. The default value can also be set in the parameters of export default
* `info.args` - this can be used to define dynamically changing properties which are not in props

## Useful links
* [Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)
* [Argtypes](https://storybook.js.org/docs/react/api/argtypes)
* [args](https://storybook.js.org/docs/react/writing-stories/args)
* [contols add-on](https://storybook.js.org/docs/react/essentials/controls)
* [docs add-on](https://github.com/storybookjs/storybook/blob/master/addons/docs/README.md)
* [More essential add-ons](https://storybook.js.org/addons)

[Main README](../README.md)