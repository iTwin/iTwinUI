# Contributing
We welcome all types of contribution. 

Need a feature or found a bug? Please create an item in [our backlog.](https://dev.azure.com/bentleycs/UX%20Design/_backlogs/backlog/iTwinUI/Features/?workitem=543453) Be sure to read description in the given link.

Want to contribute by creating a PR? Great! Then read further.

## Getting Started
We use yarn for package management, so be sure to have it installed
 `npm install -g yarn`

1. `git clone https://bentleycs@dev.azure.com/bentleycs/UX%20Design/_git/iTwinUI-React`
2. `cd iTwinUI-React`
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
				|		|
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

### Testing

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

### Yalc

You may want to install `yalc` and `concurrently` (`nodemon` or `chokindar-cli`) globally and use those two scripts to compile and push changes to other project linked to iTwinUI-react :
- Add scripts to package.json :
  - `"watch": "concurrently --kill-others \"yarn watch:tsx\" \"yarn watch:yalc:push\"",`
  - `"watch:tsx": "tsc --watch",`
  - `"watch:yalc:push": "delay 20 && cd lib && nodemon -e js,ts,tsx,d.ts -x \"yalc push\"",`
- Chokindar version (untested) :
  - `"watch:yalc:push": "delay 20 && cd lib && chokidar \"**/*.js\" \"**/*.ts\" \"**/*.tsx\" \"**/*.d.ts\" -c \"yalc push\"",`

### Changelog

The `CHANGELOG.md` file must be updated for any new components or changes that you add. If unsure of which release your changes will go to, you can add a placeholder version and date (on the top):
```
## 0.1.X

`Date`

### What's new
```

## Pull Requests

#### Checklist

1. Component created following project structure
2. Component contains proper inline documentation
3. Tests have been added for component
4. Update changelog.
5. Create a branch `git checkout -b yourName/your-feature-name`
6. Stage `git add -A`
7. Commit `git commit -m"<commit_message>"`
8. Before the changes are committed, the formatter and tests are run; the commit will not happen if the tests fail.
9. After ensuring that the tests passed and the changes were committed, `git push`
10. Navigate to [the DevOps page](https://dev.azure.com/bentleycs/UX%20Design/_git/iTwinUI-React/pullrequests?_a=mine)
11. Create a Pull Request
12. Pending code review, your changes will be accepted into the repository.
13. When completing your pull request, you might want to add a custom merge message (available in completion step) to summarize the changes your commit brings.
