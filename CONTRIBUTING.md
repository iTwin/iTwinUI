# Contributing
We welcome all types of contribution. 

Need a feature or found a bug? Please create an item in [our backlog.](https://bentleycs.visualstudio.com/UX%20Design/_backlogs/backlog/UX%20Innersource/Backlog%20items)

Want to contribute by creating a PR? Great! Then read further.

## Getting Started
We use yarn for package management, so be sure to have it installed
 `npm install -g yarn`

1. `git clone https://bentleycs@dev.azure.com/bentleycs/UX%20Design/_git/iTwinUI-React`
2. `cd iTwinUI-react`
3. `yarn install`

If using vscode, our prettier and editor configs will be used.
Please make sure to install all recommended extensions in [extensions.json](./.vscode/extensions.json).

**src/core/index.ts** contains all shared types as well as all the exports for each component.

Each component has a folder containing the source TypeScript and an index file to export it.
Component groups (such as the TableComponents) should have their own subdirectory.
This subdirectory exports all of its components up to the main index file.

The build step (`yarn build`) compiles all the TypeScript and copies the output along with any needed styles or utilities to the lib/ folder.

## Contributing

**Recommended!**

There is a script to scaffold out your component, run it with

`yarn createComponent`

Or manually

1. Make a folder under `src/core` with the name of the component
2. In this folder, make a .tsx file of the same name and a file named index.ts
3. index.ts contains two exports, a named and a default from the named .tsx file.
4. `src/core/index.ts` exports this component
5. Implement the component in the named .tsx file.

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
...
export { Alert } from './Alert';
export type { AlertProps } from './Alert';
...
```

To extend the current collections, add the directory to the prompt in `scripts/createComponent`
and import the directory from `src/index.ts`.
### Development with Storybook

`yarn storybook`

Dynamically loads a development interface into the local browser with individual testing environments for all components contained in src/core. Read more [here](./stories/README.md)

### Testing

Each component has a corresponding jest test inside of its directory

This test should achieve as much coverage as possible.

Use `yarn test` to run the tests.

### Yalc

You may want to install `yalc` and `concurrently` (`nodemon` or `chokindar-cli`) globally and use those two script to compile and push change to other project linked to iTwinUI-react :
- Add those script to package.json :
  - `"watch": "concurrently --kill-others \"yarn watch:tsx\" \"yarn watch:scss\" \"yarn watch:yalc:push\"",`
  - `"watch:tsx": "tsc --watch",`
  - `"watch:scss": "node-sass src/ -wo lib/",`
  - `"watch:yalc:push": "delay 20 && cd lib && nodemon -e js,ts,tsx,d.ts,css,scss -x \"yalc push\"",`
- Chokindar version (untested) :
  - `"watch:yalc:push": "delay 20 && cd lib && chokidar \"**/*.js\" \"**/*.css\" \"**/*.ts\" \"**/*.tsx\" \"**/*.d.ts\" -c \"yalc push\"",`

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
3. Test has been created for component
4. Update changelog.
5. Create a branch `git checkout -b <branch_name>`
6. Stage `git add -A`
7. Commit `git commit -m"<commit_message>"`
8. Before the changes are committed, the formatter and tests are run; the commit will not happen if the tests fail.
9. After ensuring that the tests passed and the changes were committed, `git push`
10. If this fails, copy the suggested command and run that.
11. Navigate to [the DevOps page](https://dev.azure.com/bentleycs/UX%20Design/_git/iTwinUI-React/pullrequests?_a=mine)
12. Create a Pull Request
13. Pending code review, your changes will be accepted into the repository.
