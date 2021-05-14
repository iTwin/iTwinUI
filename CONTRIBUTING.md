# Contributing

We welcome all types of contribution.

Need a feature or found a bug? Please create an [issue](https://github.com/iTwin/iTwinUI/issues).

Want to contribute by creating a PR? Great! [Fork the repo](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/working-with-forks) and read further.

## How to setup

To clone and build iTwinUI, you'll need [Git](https://git-scm.com) and [Yarn 1](https://yarnpkg.com/getting-started/install) installed on your computer.

1. [Create a local clone](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo#step-2-create-a-local-clone-of-your-fork) of your forked repo. You can do this from the command line or using the Github Desktop app.
2. Go to the directory where you cloned iTwinUI. e.g. `cd iTwinUI`.
3. Run `yarn install` from that directory.

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

We welcome UI components contributions! If you'd like to get your component added to iTwinUI,  run `yarn createComponent [component-name]` (replacing `[component-name]` with the name of your component) to automatically create all the necessary files. Then follow these guidelines:

- Add all your component styles in `src/[component-name]/[component-name].scss` file.
- Break variables and mixins into separate files where possible.
- Define classes for your mixin in `src/[component-name]/classes.scss` file.
  - *Running the `createComponent` command will do this for you.*
- Make sure your component index and classes are imported in `src/index.scss` and `src/classes.scss`.
  - *Running the `createComponent` command will also do this for you but you need to manually sort the imports alphabetically.*
- Write tests for your new component in `backstop/tests/[component-name].html` and `backstop/scenarios/[component-name].js`. See [Tests](#Tests) section below.
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
  - More information about options can be found in [BackstopJS GitHub](https://github.com/garris/BackstopJS#advanced-scenarios).

### Changelog

The `CHANGELOG.md` file must be updated for any new components or changes that you add. If unsure of which release your changes will go to, you can add a placeholder version and date (on the top):

<details>
<summary>Example</summary>

```
## 1.X.X

`Date`

### What's new
```
</details>

### Committing your work

Before creating a pull request, make sure your changes address a specific issue. Do a search to see if there are any existing items that are still open. If you don't find one, you can create one.

To enable us to quickly review and accept your pull requests, always create one pull request per issue. Never merge multiple requests in one unless they have the same root cause. Be sure to follow best practices and keep code changes as small as possible. Avoid pure formatting changes or random "fixes" that are unrelated to the linked issue.

#### Checklist

- Component added or modified using [guidelines](#Developing) above.
- Tests added to `backstop/tests` and `backstop/scenarios`.
  - `.html` file has all possible states of the component.
  - `.js` file has scenarios covering these cases.
- Updated changelog.

After verifying that- Ensure, that issue is linked in the PR and you have a proper description of the PR.
