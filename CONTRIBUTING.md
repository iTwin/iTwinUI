# Contributing

We welcome all types of contribution.

Need a feature or found a bug? Please create an [issue](https://github.com/iTwin/iTwinUI-react/issues).

Have a question or suggestion? Please create a [discussion](https://github.com/iTwin/iTwinUI-react/discussions).

Want to contribute by creating a pull request? Great! [Fork iTwinUI-react](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/working-with-forks) to get started.

---

## How to setup

To clone and build iTwinUI-react, you'll need [Git](https://git-scm.com) and [Yarn 1](https://yarnpkg.com/getting-started/install) installed on your computer.

1. [Create a local clone](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo#step-2-create-a-local-clone-of-your-fork) of your forked repository. You can do this from the command line or using the Github Desktop app.
2. Go to the directory where you cloned iTwinUI-react. e.g. `cd iTwinUI-react`.
3. Run `yarn install` from that directory.

If using vscode, our prettier and editor configs will be used.
Please make sure to install all recommended extensions in [extensions.json](./.vscode/extensions.json).

### Preview using Storybook

We use [Storybook](https://storybook.js.org) to test and demo the components. You can run it locally with `yarn storybook`.
Be sure to add stories for your newly added component or feature. Read more [here](./stories/README.md) about storybook and how we write stories.

---

## Developing

Before developing, please read our [style guide](./STYLEGUIDE.md).

If you are creating a new component, use this script:

`yarn createComponent`

It ensures all needed imports are added and files are created.

> Note: Every component needs to use `useTheme()` hook to ensure styling (theming) works fine. The `createComponent` script mentioned above adds it automatically.

### Creating components

For a component named `Alert`, the `createComponent` script will add/modify the following files:

<details>
<summary>Directory structure</summary>

```
iTwinUI-react
|
+ - src
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
+ - stories
|   |
|   + - core
|       |
|       + - > Alert.stories.tsx
```

</details>

src/core/**Alert/Alert.tsx**

- Implements the React component and exports it, both named and by default.

src/core/**Alert/Alert.test.tsx**

- Contains all test cases for the component.

src/core/**Alert/index.ts**

```jsx
export { Alert } from './Alert';
export type { AlertProps } from './Alert';
export default './Alert';
```

src/core/**index.ts**

```jsx
---
export { Alert } from './Alert';
export type { AlertProps } from './Alert';
---
```

> Note: The script will add the exports to index.ts but you will need to manually sort them alphabetically.

stories/core/**Alert.stories.tsx**

- Contains common demo states and examples for the component.

### Unit Testing

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

### Visual Testing

We reuse our stories for visual tests (through [Creevey](https://github.com/wKich/creevey)). Start storybook and run `yarn creevey --ui` to open the test UI. You can run tests and approve images here.

By default, the stories will be rendered as-is, but interaction can be added using the `creevey` parameter of story, where you have access to a [Selenium WebDriver](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html) instance.

```jsx
parameters: {
  creevey: {
    tests: {
      async open() {
        const button = await this.browser.findElement({ css: '.iui-button' });
        const closed = await this.takeScreenshot();

        await button.sendKeys(' ');
        const opened = await this.takeScreenshot();
        await this.expect({ closed, opened }).to.matchImages();
      },
    },
  },
},
```

### Linking

If you want to test your changes in a local project, you can go into the `lib/` folder (which gets created when running `yarn build` or `yarn build:watch`) and run `yarn link`. Then from your test project, run `yarn link @itwin/itwinui-react`.

You might face an "invalid hook call" error if your test project is using a different version or instance of React. You can fix this by [linking React](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react) or by using [aliases](https://github.com/facebook/react/issues/13991#issuecomment-463486871) in your bundler. If it still doesn't work, you may consider using [`yalc`](https://github.com/wclr/yalc) instead.

#### Yalc instructions

Install yalc globally (`yarn global add yalc`) and run `yalc publish` from the `lib/` folder. Then from your test project, run `yalc add @itwin/itwinui-react`.

Every time you rebuild iTwinUI-react, you will need to run `yalc push`. You might want to automate this with a custom script using `chokidar-cli` or `nodemon`.

### Changelog

The `CHANGELOG.md` file must be updated for any new components or changes that you add. At the top of the file, create an "unreleased" section with a placeholder date (if not already present).

<details>
<summary>Example</summary>

```
## Unreleased

`Date`

### What's new
```
</details>

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
- Updated changelog.

Verify that your changes are ready, then [create a pull request from your fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). Make sure that an issue is linked to the pull request and that you have a proper description with screenshots.

Your pull request will be reviewed by one or more maintainers who might leave some comments/suggestions to help improve the quality and consistency of your code. Once approved, your changes will be accepted into the repository.
