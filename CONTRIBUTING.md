# Contributing

We welcome all types of contribution.

Need a feature or found a bug? Please create an [issue](https://github.com/iTwin/iTwinUI/issues).

Have a question or suggestion? Please create a [discussion](https://github.com/iTwin/iTwinUI/discussions).

Want to contribute by creating a pull request? Great! [Fork iTwinUI](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) to get started.

---

## How to setup

To clone and build iTwinUI, you'll need [Git](https://git-scm.com), [Node 16](https://nodejs.org/en/download/), and [Yarn 1](https://classic.yarnpkg.com/en/docs/install) installed on your computer.

1. [Create a local clone](https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository) of your forked repository. You can do this from the command line or using the Github Desktop app.
2. Go to the directory where you cloned iTwinUI. e.g. `cd iTwinUI`.
3. Run `yarn install` from that directory.

### VSCode Users

Install the recommended [plugins](./.vscode/extensions.json) for linter warnings in editor.

---

## Run locally

### To build

`yarn build`

### To open development servers

`yarn dev`

### To run all unit tests and visual tests

`yarn test`

_Before running this command, make sure Docker is running. See [Testing](#Testing) section below for more details._

### To lint and fix autofixable errors

`yarn lint`

---

## Developing

### Monorepo overview

We use [Turborepo](https://turborepo.org/) as our monorepo tool to improve the experience of [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/). It allows running commands in parallel and caches build outputs.

The root package.json includes a few commands that use `turbo run` to run the corresponding command in all workspaces.

e.g. to build all workspaces together, run the following command from the root:

```
yarn build
```

#### Development environment

To start the development server for all workspaces, run the following command from the root.
```
yarn dev
```

This will automatically build anything that's not already built, and run the `dev` script for every workspace in parallel, watching for file changes.

By default, a portal will be opened containing links to all the different dev servers:
  - docs website:  `http://localhost:1700`
  - vite playground: `http://localhost:1701`
  - next playground: `http://localhost:1702`
  - astro playground: `http://localhost:1703`
  - storybook: `http://localhost:6006` (storybook default)
  - html test pages: `http://localhost:5173` (vite default)

If you only need to run this task for a specific workspace, you can specify turborepo's `--filter` argument. For example, if you only want to start storybook, you could run `yarn dev --filter=storybook`.

### Running bespoke commands

If a script is not available in the root package.json or if you need to pass workspace-specific cli args, then you can specify the workspace as follows:
```
# passing Alert as a cli arg to the `test` command in itwinui-react
yarn workspace @itwin/itwinui-react test Alert
```

...or you can simply run the command normally from inside the workspace folder instead of the monorepo root.
```
# run this from inside packages/itwinui-react/ for the same result
yarn test Alert
```

Note that this bypasses the turborepo pipeline, so you will need to manually run any dependent tasks first. For example, if the `build` command of `storybook` relies on the `build` command of `@itwin/itwinui-react`, then you will need to manually run the `build` commands in the right order.
```
yarn workspace @itwin/itwinui-react build
yarn workspace storybook build
```

This is why it's recommended to use the turbo `--filter` syntax whenever possible.
```
yarn build --filter=storybook
```

### Adding a new component (CSS)

If you'd like to get your component added to iTwinUI, follow these guidelines.

We provide a script that can automatically create all the necessary files for you. Simply run `yarn createComponent [component-name]` (e.g. `yarn createComponent my-component`).

- Add all your component styles in `src/[component-name]/[component-name].scss` file.
  - Break variables and mixins into separate files where possible.
  - Use existing Sass variables for spacing (margin, padding, sizing, etc).
- Define classes for your mixin in `src/[component-name]/classes.scss` file.
  - _Running the `createComponent` command will do this for you._
- Make sure your component index and classes are imported in `src/all.scss`.
  - _Running the `createComponent` command will also do this for you but you need to manually sort the imports alphabetically._
- Write tests for your new component in `backstop/tests/[component-name].html` and `backstop/scenarios/[component-name].js`. See [Testing](#Testing) section below.
- After running `yarn build` you can open minified html in browser to check up, how your component looks like from `backstop/minified`.

### Visual testing (CSS)

#### How to run tests:

For running tests you will need [Docker](https://www.docker.com/products/docker-desktop). It helps to avoid cross-platform rendering differences.

- Make sure Docker is running.

- To run tests for a specific component, use this command:

  `yarn test --filter=[component_name]` (e.g. `yarn test --filter=side-navigation`)

- To approve test images, run `yarn approve:css`.

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
    module.exports = [scenario('hover', { actions: [hover('.element-selector')] })];
    ```
  - If you want to select only specific part of the test elements, pass `selectors` property to the options.
    ```js
    const { scenario } = require('../scenarioHelper');
    module.exports = [scenario('selected part', { selectors: ['.selected-part-selector'] })];
    ```
  - If you want to hide some elements because they might be moving e.g. spinner, pass `hideSelectors` property to the options.
    ```js
    const { scenario } = require('../scenarioHelper');
    module.exports = [scenario('hide part', { hideSelectors: ['.hide-selector'] })];
    ```
  - More information about options can be found in [BackstopJS GitHub](https://github.com/garris/BackstopJS#advanced-scenarios).

---

### Creating components (React)

Before developing, please read our [style guide](./STYLEGUIDE.md).

If you are creating a new component, use this script:

`yarn createComponent`

It ensures all needed imports are added and files are created.

> Note: Every component needs to use `useTheme()` hook to ensure styling (theming) works fine. The `createComponent` script mentioned above adds it automatically.

For a component named `Alert`, the `createComponent` script will add/modify the following files:

<details>
<summary>Directory structure</summary>

```
packages/itwinui-css
|
| - src
|   |
|   + - alert
|       + - > alert.scss
|       + - > classes.scss
|       + - > index.scss
|
| - backstop
|   |
|   + - tests
|       + - > alert.html
|
packages/itwinui-react
|
| - src
|   |
|   + - core
|       |
|       + - Alert
|       |   + - > Alert.test.tsx
|       |   + - > Alert.tsx
|       |   + - > index.ts
|       |
|       + - > index.ts
|
apps/storybook
|   |
|   + - src
|       |
|       + - > Alert.stories.tsx
|.      + - > Alert.test.ts
```

</details>

packages/itwinui-css/src/**alert/alert.scss**
  - Contains the framework-agnostic styling for the component

packages/itwinui-css/backstop/tests/**alert.html**
  - Contains all the test cases and demonstrations for the framework-agnostic css.

packages/itwinui-css/backstop/scenarios/**alert.js**
  - Contains the visual test scenarios for the html.

packages/itwinui-react/src/core/**Alert/Alert.tsx**

- Implements the React component and exports it, both named and by default.

packages/itwinui-react/src/core/**Alert/Alert.test.tsx**

- Contains all test cases for the component.

packages/itwinui-react/src/core/**Alert/index.ts**

```jsx
export { Alert } from './Alert';
export type { AlertProps } from './Alert';
export default './Alert';
```

packages/itwinui-react/src/core/**index.ts**

```jsx
---
export { Alert } from './Alert';
export type { AlertProps } from './Alert';
---
```

> Note: The script will add the exports to index.ts but you will need to manually sort them alphabetically.

apps/storybook/src/**Alert.stories.tsx**

- Contains common demo states and examples for the component.

apps/storybook/src/**Alert.test.tsx**

- Contains the Cypress test for the component.

### Importing icons

#### In `packages/itwinui-react`:

* Manually add the `<svg>` component to `utils/icons` and `utils/icons/index.ts`
* Import it from `utils`

e.g.
```tsx
import { SvgClose, SvgInfoCircular } from '../utils';
```

#### In other modules:

* Import it from `@itwin/itwinui-icons-react`

e.g.
```tsx
import { SvgChevronRightDouble, SvgFolder } from '@itwin/itwinui-icons-react';
```

### Documentation

We use [JSDoc](https://jsdoc.app/) (not TSDoc) to write documentation for our code.

Every component should have a multiline description and at least one example.

```jsx
/**
 * A small box to quickly grab user attention and communicate a brief message.
 * @example
 * <Alert>This is a basic alert.</Alert>
 */
export const Alert = (props: AlertProps) => {
  ...
```

Examples can be captioned. This is especially helpful when there are multiple examples.

```jsx
/**
 * Footer element with all needed legal and info links.
 * Be sure to place it manually at the bottom of your page.
 * You can use position 'absolute' with relative body or set the height of the content and place footer at the end.
 * @example <caption>Appending custom element after default elements</caption>
 * <Footer customElements={[{title: 'Bentley', url: 'https://www.bentley.com/'}]} />
 * @example <caption>Returning only custom elements</caption>
 * <Footer customElements={() => newFooterElements)} />
 ...
 */
export const Footer = (props: FooterProps) => {
  ...
```

Every prop should have a multiline description with relevant informational tags.

```jsx
export type AlertProps = {
  /**
   * Type of the alert.
   * @default 'informational'
   */
  type?: 'positive' | 'warning' | 'negative' | 'informational';
 /**
   * Action handler for the clickable text.
   * @deprecated `clickableTextProps` should be used instead.
   */
  onClick?: () => void;
  ...
```

More examples can be found in the [style guide](./STYLEGUIDE.md).

### Unit testing (React)

Each component has a corresponding jest test inside of its directory. Be sure to cover your added code with tests.

Use `yarn test` to run the tests. Add `--watch` flag if you want tests to rerun after changes.

We usually do not use `describe` block and our test case should start with 'should'.

```jsx
it('should be visible', () => {
  const { getByText } = render(
    <Tooltip parentId='container' content='some text' isVisible>
      <div>Visible!</div>
    </Tooltip>,
  );

  getByText('some text');
});
```

### Visual testing (React)

We reuse our stories for visual tests by taking screenshots of the story iframes in [Cypress](https://cypress.io/).

#### Running visual tests

1. Make sure you have [Docker](https://www.docker.com/get-started) installed and running.
2. From the monorepo root, run `yarn test --filter=storybook`. This will build storybook and run all cypress tests in docker.
   -  If you only need to run tests for a specific component, you can do so by passing the `--spec` argument to cypress. e.g. for testing `Alert`, you can run `yarn workspace storybook test --spec="**/Alert.*"`. Don't forget to build storybook first (yarn build --filter=storybook).
3. Once the tests finish running, you can approve any failing test images using `yarn approve:react`.

#### Writing visual tests

Inside the `apps/storybook` workspace, the `src/` directory has a set of `-.stories.tsx` files, each of which is accompanied by a `-.test.ts` file. Here's what a typical test file should look like:

```ts
describe('Alert', () => {
  const storyPath = 'Core/Alert';
  const tests = [
    'Positive',
    'Negative',
    'Warning',
    'Informational',
  ];

  tests.forEach((testName) => {
    it(testName, () => {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.compareSnapshot(testName);
    });
  });
});
```

Notice how we do all of these things manually:
- defining the names of all the stories that need to be tested and excluding the ones that don't.
- specifying the story iframe url using the custom `storyId` helper.
- visiting the iframe using `cy.visit`.
- taking and comparing the screenshot using `cy.compareSnapshot` from [`cypress-image-diff-js`](https://github.com/uktrade/cypress-image-diff).

We have full access to the [Cypress API](https://docs.cypress.io/api) so any additional interactions or custom logic can be easily added.

---

## Pull Requests

Before creating a pull request, make sure your changes address a specific issue. Do a search to see if there are any existing issues that are still open. If you don't find one, you can create one.

To enable us to quickly review and accept your pull requests, always create one pull request per issue. Never merge multiple requests in one unless they have the same root cause. Be sure to follow best practices and keep code changes as small as possible. Avoid pure formatting changes or random "fixes" that are unrelated to the linked issue.

### Checklist

- Component added or modified using [guidelines](#Developing) above.
  - All required files and exports added.
  - Proper inline documentation added.
  - Code follows style guide and has no linting errors (pre-commit hook will run linter).
- Tests added for all new code.
  - All existing and new tests should pass.
- Stories added to demonstrate new features.

Verify that your changes are ready, then [create a pull request from your fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). Make sure that the name of your pull request follows the [Conventional Commits spec](https://www.conventionalcommits.org/), and that you have a proper description with screenshots and a [closing keyword](https://docs.github.com/en/github/writing-on-github/working-with-advanced-formatting/using-keywords-in-issues-and-pull-requests).

If your pull request changes an existing component, we ask that the description distinctly lists all visual changes that have occurred. These notes are used by the Visual Design team to update specifications and images within documentation.

Your pull request will be reviewed by one or more maintainers who might leave some comments/suggestions to help improve the quality and consistency of your code. Once approved, your changes will be accepted into the repository.
