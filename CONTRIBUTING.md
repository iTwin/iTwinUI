# Contributing

We welcome all types of contribution.

Need a feature or found a bug? Please create an [issue](https://github.com/iTwin/iTwinUI/issues).

Have a question or suggestion? Please create a [discussion](https://github.com/iTwin/iTwinUI/discussions).

If you're only contributing changes to the **iTwinUI documentation website**, you can ignore this guide, as it's geared towards technical contributions to component code.

Want to contribute code changes to components? Great! [Fork iTwinUI](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) to get started.

---

## How to setup

### Using GitHub Codespaces (cloud IDE)

To get started without having to install anything locally, you can create a [codespace](https://docs.github.com/en/codespaces/overview) for this repository by clicking this link:

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/iTwin/iTwinUI)

### Local setup

To clone and build iTwinUI, you'll need [Git](https://git-scm.com), [Node 18+](https://nodejs.org/en/download/), and [Pnpm 9](https://pnpm.io/installation) installed on your computer.

1. [Create a local clone](https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository) of your forked repository. You can do this from the command line or using the Github Desktop app.
2. Go to the directory where you cloned iTwinUI. e.g. `cd iTwinUI`.
3. Run `pnpm install` from that directory.

**VSCode Users:** Install the recommended [plugins](./.vscode/extensions.json) for linter warnings in editor.

---

## Commands

### To build

`pnpm build`

### To open development servers

`pnpm dev`

### To run all tests

`pnpm test`

_Before running this command, make sure Docker is running. See [Visual testing](#visual-testing-css) (CSS and React) sections below for more details._

### To approve all test image changes

`pnpm approve` ([more info](#visual-testing-approval))

### To run all tests for a specific component

`pnpm test [component-name]` e.g. `pnpm test Alert`

_Please note this command is case sensitive. e.g. `Alert`, not `alert`._

### To lint and fix autofixable errors

`pnpm lint`

### To run commands using VSCode Tasks

Commands available in this repo can be run using VSCode Tasks which can be used in two ways:

- `Run task` from VSCode Search Bar: you can access the tasks using the top search bar (or press `Ctrl` + `Shift` + `P`) then search for `Run task`. A list of tasks should be displayed with the most recent used tasks on top, followed by the rest of available tasks.
- `Tasks` VSCode Extension: otherwise, you can install the `Tasks` extension so that all available tasks appear in the bottom taskbar.

---

## Developing

### Monorepo overview

We use [Turborepo](https://turborepo.org/) as our monorepo tool to improve the experience of [pnpm workspaces](https://pnpm.io/workspaces). It allows running commands in parallel and caches build outputs.

The root package.json includes a few commands that use `turbo run` to run the corresponding command in all workspaces.

e.g. to build all workspaces together, run the following command from the root:

```
pnpm build
```

If you only need to run this task for a specific workspace, you can specify turborepo's `--filter` argument. For example, if you only want to build itwinui-react, you could run `pnpm run build --filter=itwinui-react`. Note that this will automatically run `build` for any dependencies (e.g. `itwinui-css` and `itwinui-variables`). You can see the pipeline in the `turbo.json` file.

#### Development environment

To start the development server for all workspaces, run the following command from the root.

```
pnpm dev
```

This will automatically build anything that's not already built, and run the `dev` script for every workspace in parallel, watching for file changes.

By default, a portal will be opened containing links to all the different dev servers:

- docs website: `http://localhost:1700`
- vite playground: `http://localhost:1701`
- next playground: `http://localhost:1702`
- astro playground: `http://localhost:1703`
- react workshop (stories): `http://localhost:6006`
- css workshop (html pages): `http://localhost:3050`

### Running bespoke commands

If a script is not available in the root package.json or if you need to pass workspace-specific cli args, then you can specify the workspace as follows:

```
# passing Alert as a cli arg to the `test` command in itwinui-react
pnpm --filter=@itwin/itwinui-react run test Alert
```

...or you can simply run the command normally from inside the workspace folder instead of the monorepo root.

```
# run this from inside packages/itwinui-react/ for the same result
pnpm test Alert
```

Note that this bypasses the turborepo pipeline, so you will need to manually run any dependent tasks first. For example, if the `build` command of `react-workshop` relies on the `build` command of `@itwin/itwinui-react`, then you will need to manually run the `build` commands in the right order.

```
pnpm --filter=@itwin/itwinui-react run build
pnpm --filter=react-workshop run build
```

This is why it's recommended to use the turbo `--filter` syntax whenever possible.

```
pnpm run build --filter=react-workshop
```

> [!NOTE]
>
> The `--filter` syntax is available in both `turbo` and `pnpm`. The usage looks slightly different:
>
> - `turbo`: `pnpm run [command] --filter=[workspace]`
>   - e.g. `pnpm run build --filter=@itwin/itwinui-react`
>   - This will also run any dependent tasks defined in the Turbo pipeline, but does not allow args. (See [Turborepo docs](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)).
> - `pnpm`: `pnpm --filter=[workspace] run [command] [args]`
>   - e.g. `pnpm --filter=@itwin/itwinui-react run test Alert`
>   - This will only run the task per-workspace and supports additional args. (See [Pnpm docs](https://pnpm.io/filtering)).

---

### Creating components

Before developing, please read our [style guide](./STYLEGUIDE.md).

If you are creating a new component, use this script:

`pnpm createComponent`

It ensures all needed imports are added and files are created.

For a component named `Alert`, the `createComponent` script will add/modify the following files:

- packages/itwinui-css/src/**alert/alert.scss**: framework-agnostic component styles
- apps/css-workshop/pages/**alert.html**: html test cases for component css
- apps/css-workshop/backstop/tests/**alert.js**: visual test scenarios for html
- packages/itwinui-react/src/core/**Alert/Alert.tsx**: react component
- packages/itwinui-react/src/core/**Alert/Alert.test.tsx**: unit tests for react component
- packages/itwinui-react/src/**index.ts**: barrel file containing all public exports
- apps/react-workshop/src/**Alert.stories.tsx**: common demo states and examples ("stories")
- apps/react-workshop/src/**Alert.test.tsx**: cypress visual tests for stories
- apps/website/src/pages/docs/**alert.mdx**: documentation page for the component

<details>
<summary>Directory structure</summary>

```
packages/itwinui-css
|
| - src
|   |
|   + - alert
|       + - > alert.scss
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
|   + - > index.ts
|   |
|   + - core
|       |
|       + - Alert
|       |   + - > Alert.test.tsx
|       |   + - > Alert.tsx
|
apps/react-workshop
|   |
|   + - src
|       |
|       + - > Alert.stories.tsx
|       + - > Alert.test.ts
|
apps/website
|   |
|   + - src
|       |
|       + - pages
|           |
|           + - docs
|               + -> alert.mdx
```

</details>

### Importing icons

#### In `packages/itwinui-react`:

- Manually add the `<svg>` component to `utils/icons` and `utils/icons/index.ts`
- Import it from `utils`

e.g.

```tsx
import { SvgClose, SvgInfoCircular } from '../../utils';
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

Each component has a corresponding vitest test inside of its directory. Be sure to cover your added code with tests.

Use `pnpm test:unit` to run the unit tests. Run `pnpm test:unit:watch` if you want unit tests to rerun after changes.

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

### Visual testing (CSS)

We reuse our html test pages for visual tests by taking screenshots of parts of the page using [BackstopJS](https://github.com/garris/BackstopJS).

#### How to run tests:

For running tests you will need [Docker](https://www.docker.com/products/docker-desktop). It helps to avoid cross-platform rendering differences.

- Make sure Docker is running.
- To run tests for a specific component, use this command:
  `pnpm --filter=css-workshop run test --filter=[component_name]` (e.g. `pnpm --filter=css-workshop run test --filter=side-navigation`). But don't forget to build css-workshop first (pnpm build --filter=css-workshop).
- To approve test images, run `pnpm approve:css`.

#### How to write tests:

- Write the html in `apps/css-workshop/backstop/tests/[component-name].html` displaying the elements you wish to test and their all possible states.

- Write the test cases in `backstop/tests/[component-name].js` and ensure it exports scenarios list (see `backstop/tests/alert.js` for example).
  - Use `scenario` function from `scenarioHelper.js` to create a scenario where the first argument is test case name and the second one is options.
    ```js
    const { scenario } = require('./~scenarioHelper.cjs');
    module.exports = [scenario('basic')];
    ```
  - For actions like click, hover use according functions from `scenarioHelper.js` and pass them as scenario options `actions` property.
    ```js
    const { scenario, hover } = require('./~scenarioHelper.cjs');
    module.exports = [
      scenario('hover', { actions: [hover('.element-selector')] }),
    ];
    ```
  - If you want to select only specific part of the test elements, pass `selectors` property to the options.
    ```js
    const { scenario } = require('./~scenarioHelper.cjs');
    module.exports = [
      scenario('selected part', { selectors: ['.selected-part-selector'] }),
    ];
    ```
  - If you want to hide some elements because they might be moving e.g. spinner, pass `hideSelectors` property to the options.
    ```js
    const { scenario } = require('./~scenarioHelper.cjs');
    module.exports = [
      scenario('hide part', { hideSelectors: ['.hide-selector'] }),
    ];
    ```
  - More information about options can be found in [BackstopJS GitHub](https://github.com/garris/BackstopJS#advanced-scenarios).

### Visual testing (React)

We reuse our stories for visual tests by taking screenshots of the story iframes in [Cypress](https://cypress.io/).

#### Running visual tests

1. Make sure you have [Docker](https://www.docker.com/get-started) installed and running.
2. From the monorepo root, run `pnpm run test --filter=react-workshop` or `pnpm test:react`. This will build react-workshop and run all cypress tests in docker.
   - If you only need to run tests for a specific component, you can do so by passing the `--spec` argument to cypress. e.g. for testing `Alert`, you can run `pnpm test:react --spec="**/Alert.*"`.
3. Once the tests finish running, you can approve any failing test images using `pnpm approve:react`.

#### Writing visual tests

Inside the `apps/react-workshop` workspace, the `src/` directory has a set of `-.stories.tsx` files, each of which is accompanied by a `-.test.ts` file. Here's what a typical test file should look like:

```ts
describe('Alert', () => {
  const storyPath = 'Alert';
  const tests = ['Positive', 'Negative', 'Warning', 'Informational'];

  tests.forEach((testName) => {
    it(testName, () => {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(500);
      
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

### Visual testing (approval)

After making any desired visual changes, the following commands can be used to update the test image snapshots:

* `pnpm approve` (approve in all workspaces)
* `pnpm approve:css` (approve in css-workshop only) ([more info](#how-to-run-tests))
* `pnpm approve:react` (approve in react-workshop only) ([more info](#running-visual-tests))

### Accessibility testing

We use an automated script to evaluate each component example for accessibility violations using [`cypress-axe`](https://github.com/component-driven/cypress-axe). The setup for this can be found in the `a11y` workspace, and the component examples can be found in the `examples` workspace.

#### Running accessibility tests

In the terminal:

- Run `pnpm run test --filter=a11y` or `pnpm test:a11y` to run automated accessibility tests for all examples.

In the Cypress GUI:

1. From the monorepo root, run `pnpm --filter=a11y run open`. This will open the Cypress control panel where you can run the tests.
2. Choose a browser to evaluate your tests through, then press the `Start Component Testing in [YourBrowser]` button below.
3. Select `Component.cy.tsx` to run the script that tests all of the component examples.

##### Your results

In the terminal, a table will be produced for each violating component with the Axe rule ID being violated and its description.

In Cypress, if the component violates a Axe rule, its rule ID and the number of offending nodes will be output in a line in the testing window. You can click on the line to highlight the offending nodes in the test browser and to output more information in the browser console.

For more information on the Axe rule IDs and their meanings, visit [Deque University's list of Axe rules.](https://dequeuniversity.com/rules/axe/4.4/)

### E2E testing

The `testing/e2e` workspace facilitates testing of complex scenarios in a real browser. This is achieved by running [Playwright](https://playwright.dev/) tests against a [Remix](https://remix.run/) app.

- **To run tests**, use `pnpm run test --filter=e2e` or `pnpm test:e2e`.
- **To write tests**, add a new [Remix route](https://remix.run/docs/en/main/discussion/routes#conventional-route-folders) and a `.spec.ts` next to it.

For more details on how to write a test, see [Playwright docs](https://playwright.dev/docs/writing-tests).

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
- Added [changeset](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md) using `pnpm changeset`, if changes are user-facing.

Verify that your changes are ready, then [create a pull request from your fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). Make sure your pull request has a proper description and a [linked issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).

Your pull request will be reviewed by one or more maintainers who might leave some comments/suggestions to help improve the quality and consistency of your code. Once approved, your changes will be accepted into the repository.
