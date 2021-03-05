# Contributing

## How to setup

To clone and build iTwinUI you'll need [Git](https://git-scm.com) and [Yarn](https://yarnpkg.com) installed on your computer. From your command line:

```
# Clone this repository
$ git clone https://bentleycs@dev.azure.com/bentleycs/UX%20Design/_git/iTwinUI

# Go into the repository
$ cd iTwinUI

# Install dependencies
$ yarn install
```

---

## How to use

See the **Checklist** below.

### To build

`yarn build`

### To test

Before running this command make sure Docker is running.

`yarn test`

### Update reference images

`yarn approve`

### To lint SCSS and fix autofixable errors

`yarn lint`

### To clean

`yarn clean`

### VSCode Users

Install the recommended plugins for linter warnings and code formatting.

---

## Developing

### Adding a component

We welcome UI components contributed by other teams! If you'd like to get your component added to iTwinUI, follow these guidelines:

- Make a new folder with the name of the component.
- Break variables and mixins into seperate files where possible.
- Make sure to include a `classes.scss` file in the folder as this file is used to generate all the relevant css classes.
  - This file should simply define classes using your mixins.
  - Example from `src/buttons/classes.scss`, where index imports all mixins and relevant scss.
  - Make sure to import your style in `src/classes.scss` and `src/mixins.scss`.

```
@import './index';

.iui-button-high-visibility {
  @include iui-button-high-visibility;
}
```

### Editing or enhancing a component

When making changes to a component that already exists, we ask that all PRs distinctly list visual changes that have occurred. These notes are used by the Visual Design team to update specifications and images within documentation.

### Adding tests

For testing you will need [Docker](https://www.docker.com/products/docker-desktop). It helps to avoid cross-platform rendering differences.

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

### Committing your work

Before creating a pull request, make sure your changes address a specific work item or bug in the iTwinUI backlog. Do a search to see if there are any existing items that are still open. If you don't find one, you can create one.

To enable us to quickly review and accept your pull requests, always create one pull request per work item. Never merge multiple requests in one unless they have the same root cause. Be sure to follow best practices and keep code changes as small as possible. Avoid pure formatting changes or random "fixes" that are unrelated to the linked work item.

1. Create a branch of the form `feature/{description}` or `bug/{description}`.
2. Changes made in the `src/` directory.
3. Test added to `backstop/tests` and `backstop/scenarios`.
   - `.html` file has all possible states of the component.
   - `.js` file has scenarios covering these cases.
4. Use `yarn develop {test name}` to run just the test for what you are developing, making changes as needed.
5. Once you are satisfied with your work, run `yarn approve`.
6. Stage and commit changes.
7. On commit, `yarn lint` will be run.
8. After ensuring that neither of these processes errors, push to your branch with `git push`.
9. Run `git merge main` to merge any missed changes.
10. [Click this link](https://dev.azure.com/bentleycs/UX%20Design/_git/iTwinUI/pullrequests) and create a new pull request.
11. Add reviewers and link work items.
