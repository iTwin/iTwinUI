# Contributing

We welcome all types of contribution.

Need a feature or found a bug? Please create an [issue.](https://github.com/iTwin/iTwinUI/issues)

Want to contribute by creating a PR? Great! Then read further.

## How to setup

To clone and build iTwinUI you'll need [Git](https://git-scm.com) and [Yarn](https://yarnpkg.com) installed on your computer. From your command line:

1. `git clone https://github.com/iTwin/iTwinUI.git`
2. `cd iTwinUI`
3. `yarn install`

### VSCode Users

Install the recommended [plugins](./.vscode/extensions.json) for linter warnings in editor.

---

## Run locally

### To build

`yarn build`

When developing you can use this command as it will automatically rebuild on files change:

`yarn build:watch`

### To test

Before running this command make sure Docker is running. Read more about [tests](#tests).

`yarn test`

### To lint SCSS and fix autofixable errors

`yarn lint`

---

## Developing

### Adding a component

We welcome UI components contributions! If you'd like to get your component added to iTwinUI, follow these guidelines:

- Make a new folder with the name of the component under `src` folder.
- Break variables and mixins into separate files where possible.
- Make sure to include a `classes.scss` file in the folder as this file is used to generate all the relevant css classes.

  - This file should simply define classes using your mixins.
  - Example from `src/toggle-switch/classes.scss`, where index imports all mixins and relevant scss.

    ```scss
    @import './index';

    .iui-toggle-switch {
      @include iui-toggle-switch;
    }
    ```

  - Make sure to import your style in `src/classes.scss` and `src/mixins.scss`.

- Write html for your new component in `your-component.html` file under `backstop/tests`
- After running `yarn build` you can open minified html in browser to check up, how your component looks like from `backstop/minified`.

### Editing or enhancing a component

When making changes to a component that already exists, we ask that all PRs distinctly list visual changes that have occurred. These notes are used by the Visual Design team to update specifications and images within documentation.

### Tests

For testing you will need [Docker](https://www.docker.com/products/docker-desktop). It helps to avoid cross-platform rendering differences.

To run selected tests use command:

 `yarn test --filter="test_name"`

To approve tests use command:

`yarn approve`

To delete old/unused tests images that left after refactoring or renames use command:

`yarn clean:images`

How to write tests:
- Create `.html` file in `backstop/tests` displaying the elements you wish to test and their all possible states, using the built CSS in `lib/css`.
- Create `.js` file in `backstop/scenarios` with the same name as `.html` file in previous step and ensure it exports scenarios list (take a look at `backstop/scenarios/alert.js`).
  - Use `scenario` function from `scenarioHelper.js` to create a scenario where the first argument is test case name and the second one is options.
    ```js
    const { scenario } = require('../scenarioHelper');
    module.exports = [scenario('basic')];
    ```
  - For actions like click, hover use according functions from `scenarioHelper.js` and pass them as scenario options `actions` property.
    ```js
    const { scenario, hover } = require('../scenarioHelper');
    module.exports = [
      scenario('hover', { actions: [hover('.element-selector')] }),
    ];
    ```
  - If you want to select only specific part of the test elements, pass `selectors` property to the options.
    ```js
    const { scenario } = require('../scenarioHelper');
    module.exports = [
      scenario('selected part', { selectors: ['.selected-part-selector'] }),
    ];
    ```
  - If you want to hide some elements because they might be moving e.g. spinner, pass `hideSelectors` property to the options.
    ```js
    const { scenario } = require('../scenarioHelper');
    module.exports = [
      scenario('hide part', { hideSelectors: ['.hide-selector'] }),
    ];
    ```
  - More information about options can be found in BackstopJS [GitHub](https://github.com/garris/BackstopJS#advanced-scenarios).

### Changelog

The `CHANGELOG.md` file must be updated for any new components or changes that you add. If unsure of which release your changes will go to, you can add a placeholder version and date (on the top):

```
## 0.1.X

`Date`

### What's new
```

### Committing your work

Before creating a pull request, make sure your changes address a specific issue. Do a search to see if there are any existing items that are still open. If you don't find one, you can create one.

To enable us to quickly review and accept your pull requests, always create one pull request per issue. Never merge multiple requests in one unless they have the same root cause. Be sure to follow best practices and keep code changes as small as possible. Avoid pure formatting changes or random "fixes" that are unrelated to the linked issue.

#### Checklist

- Branch created in the form of `yourName/your-feature`.
- Component created following project structure.
- Tests added to `backstop/tests` and `backstop/scenarios`.
  - `.html` file has all possible states of the component.
  - `.js` file has scenarios covering these cases.
- Updated changelog.
- Ensure, that issue is linked in the PR and you have a proper description of the PR.
