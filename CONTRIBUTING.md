# Contributing
We welcome all types of contribution. 

Need a feature or found a bug? Please create an [issue.](https://github.com/iTwin/iTwinUI-react/issues)

Want to contribute by creating a PR? Great! Then read further.

## Getting Started
We use yarn for package management, so be sure to have it installed
 `npm install -g yarn`

1. `git clone https://github.com/iTwin/iTwinUI-react.git`
2. `cd iTwinUI-react`
3. `yarn install`

If using vscode, our prettier and editor configs will be used.
Please make sure to install all recommended extensions in [extensions.json](./.vscode/extensions.json).

## Storybook
We use [Storybook](https://storybook.js.org) to test and demo the components. You can run it locally with `yarn storybook`.
Be sure to add stories for your newly added component or feature. Read more [here](./stories/README.md) about storybook and how we write stories.

## Developing

Before developing, please read our [style guide](./STYLEGUIDE.md)

If you are creating a new component, use this script:

`yarn createComponent`

It ensures all needed imports are added and files are created.

> Note: Every component needs to use `useTheme()` hook to ensure styling (theming) works fine. The script mentioned above adds it automatically.

Be sure to develop on your branch. We want to keep branch naming with developer name scope:

`git checkout -b yourName/your-feature-name`

### Intended Folder Structure

Given a component named `Alert`

```
iTwinUI-react
|
+ - src
    |
    + - core
        |
        + - Alert
        |   |
        |   + - > Alert.react.test.tsx
        |   |
        |   + - > Alert.tsx
        |   |
        |   + - > index.ts
        |
        + - > index.ts
```

Alert/Alert.tsx

- Implements the React component and exports it, both named and by default

Alert/index.ts

```jsx
export { Alert } from './Alert';
export type { AlertProps } from './Alert';
export default './Alert';
```

core/index.ts

```jsx
---
export { Alert } from './Alert';
export type { AlertProps } from './Alert';
---
```

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

### Linking
If you want to test your changes in a local project, you can go into the `lib/` folder (which gets created when running `yarn build` or `yarn build:watch`) and run `yarn link`. Then from your test project, run `yarn link @itwinui/react`.

You might face an "invalid hook call" error if your test project is using a different version or instance of React. You can fix this by [linking React](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react) or by using [aliases](https://github.com/facebook/react/issues/13991#issuecomment-463486871) in your bundler. If it still doesn't work, you may consider using `yalc`.

<details>
<summary>Yalc instructions (untested)</summary>
You may want to install `yalc`, `concurrently`, and `nodemon` or `chokidar-cli` globally to compile and push changes to another project linked to iTwinUI-react.
Add these scripts to package.json:
<pre>
  "watch": "concurrently --kill-others \"yarn watch:tsx\" \"yarn watch:yalc:push\"",
  "watch:tsx": "tsc --watch",
  "watch:yalc:push": "delay 20 && cd lib && nodemon -e js,ts,tsx,d.ts -x \"yalc push\"",
</pre>
Chokidar version:
<pre>
  "watch:yalc:push": "delay 20 && cd lib && chokidar \"**/*.js\" \"**/*.ts\" \"**/*.tsx\" \"**/*.d.ts\" -c \"yalc push\"",
</pre>
</details>


### Changelog

The `CHANGELOG.md` file must be updated for any new components or changes that you add. If unsure of which release your changes will go to, you can add a placeholder version and date (on the top):
```
## 0.1.X

`Date`

### What's new
```

## Pull Requests

Before creating a pull request, make sure your changes address a specific issue. Do a search to see if there are any existing issues that are still open. If you don't find one, you can create one.

To enable us to quickly review and accept your pull requests, always create one pull request per issue. Never merge multiple requests in one unless they have the same root cause. Be sure to follow best practices and keep code changes as small as possible. Avoid pure formatting changes or random "fixes" that are unrelated to the linked issue.

#### Checklist

1. Component created following project structure
2. Component contains proper inline documentation
3. Tests have been added for component
4. Update changelog.
5. Create a branch `git checkout -b yourName/your-feature-name`
6. Stage `git add -A`
7. Commit `git commit -m"<commit_message>"`
8. Before the changes are committed, the formatter is run.
9. After ensuring the changes are committed, `git push`
10. Navigate to [the github page](https://github.com/iTwin/iTwinUI-react/pulls)
11. Create a Pull Request
12. Pending code review, your changes will be accepted into the repository.
13. When completing your pull request, you might want to add a custom merge message (available in completion step) to summarize the changes your commit brings.
