# Contributing

We welcome all types of contribution.

Need a feature or found a bug? Please create an [issue](https://github.com/iTwin/iTwinUI/issues).

Have a question or suggestion? Please create a [discussion](https://github.com/iTwin/iTwinUI/discussions).

Want to contribute by creating a pull request? Great! [Fork iTwinUI](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) to get started.

---

## How to setup

To clone and build iTwinUI, you'll need [Git](https://git-scm.com) and [Yarn 1](https://yarnpkg.com/getting-started/install) installed on your computer.

1. [Create a local clone](https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository) of your forked repository. You can do this from the command line or using the Github Desktop app.
2. Go to the directory where you cloned iTwinUI. e.g. `cd iTwinUI`.
3. Run `yarn install` from that directory.

### VSCode Users

Install the recommended [plugins](./.vscode/extensions.json) for linter warnings in editor.

---

## Run locally

### To build

`yarn build`

You can also use `yarn build:watch` to rebuild automatically when files change.

### To preview

The minified html files are outputted into the `backstop/minified/` folder and can be opened directly in your browser. You may want to use a local http server (e.g. with the  [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)).

### To run visual tests

`yarn test`

_Before running this command, make sure Docker is running. See [Testing](#Testing) section below for more details._

### To lint SCSS and fix autofixable errors

`yarn lint`

---

## Developing

### Directory structure

- **`src/` contains all the .scss files** with a folder for each component.
  - After running build, the generated .css files are put in `lib/css/` folder (in project root).
- **`backstop/tests/` contains the .html files** that uses those built styles.
  - After running build, the minified .html files are put in `backstop/minified/` folder.
- **`backstop/scenarios/` contains the .js files** where visual test scenarios are defined.

### Adding a new component

If you'd like to get your component added to iTwinUI, follow these guidelines.

We provide a script that can automatically create all the necessary files for you. Simply run `yarn createComponent [component-name]` (e.g. `yarn createComponent my-component`).

- Add all your component styles in `src/[component-name]/[component-name].scss` file.
  - Break variables and mixins into separate files where possible.
  - Use existing Sass variables for spacing (margin, padding, sizing, etc).
  - Use [`themed`](https://github.com/iTwin/iTwinUI/blob/main/src/style/theme.scss#L430) mixin wherever color is involved.
- Define classes for your mixin in `src/[component-name]/classes.scss` file.
  - *Running the `createComponent` command will do this for you.*
- Make sure your component index and classes are imported in `src/index.scss` and `src/classes.scss`.
  - *Running the `createComponent` command will also do this for you but you need to manually sort the imports alphabetically.*
- Write tests for your new component in `backstop/tests/[component-name].html` and `backstop/scenarios/[component-name].js`. See [Testing](#Testing) section below.
- After running `yarn build` you can open minified html in browser to check up, how your component looks like from `backstop/minified`.

### Testing

For running tests you will need [Docker](https://www.docker.com/products/docker-desktop). It helps to avoid cross-platform rendering differences.

- To run tests for a specific component, use this command:

  `yarn test --filter=[component_name]` (e.g. `yarn test --filter=side-navigation`)

- To approve test images, run `yarn approve`.

- To delete old/unused tests images, run `yarn clean:images`.

#### How to write tests:

- Write the html in `backstop/tests/[component-name].html` displaying the elements you wish to test and their all possible states, using the built CSS in `lib/css/`.

- Write the test cases in `backstop/scenarios/[component-name].js` and ensure it exports scenarios list (see `backstop/scenarios/alert.js` for example).
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

---

## Committing your work

Before creating a pull request, make sure your changes address a specific issue. Do a search to see if there are any existing issues that are still open. If you don't find one, you can create one.

To enable us to quickly review and accept your pull requests, always create one pull request per issue. Never merge multiple requests in one unless they have the same root cause. Be sure to follow best practices and keep code changes as small as possible. Avoid pure formatting changes or random "fixes" that are unrelated to the linked issue.

### Checklist

- Component added or modified using [guidelines](#Developing) above.
- Tests added or updated in `backstop/tests/` and `backstop/scenarios/`.
  - `.html` file has all possible states of the component.
  - `.js` file has scenarios covering these cases.
  - All existing and new tests should pass.

After verifying that your changes are ready, you can [create a pull request from your fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). Make sure that the name of your pull request follows the [Conventional Commits spec](https://www.conventionalcommits.org/), and that you have a proper description with screenshots and a [closing keyword](https://docs.github.com/en/github/writing-on-github/working-with-advanced-formatting/using-keywords-in-issues-and-pull-requests).

If your pull request changes an existing component, we ask that the description distinctly lists all visual changes that have occurred. These notes are used by the Visual Design team to update specifications and images within documentation.
