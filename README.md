<center>
  <img src="https://dev.azure.com/bentleycs/c6d27a6d-51e6-4003-a205-5e88775e4d73/_apis/git/repositories/341cfc45-ed2c-47b4-909f-b24a3c34fe63/items?path=%2F.storybook%2Fpublic%2Fitwin.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=docz-removed&resolveLfs=true&%24format=octetStream&api-version=5.0" alt="iTwin logo" width="167" height="40">

  **An open-source design system that helps us build a unified web experience.**

  [![Build status](https://bentleycs.visualstudio.com/UX%20Design/_apis/build/status/bwc/bwc?branchName=master)](https://bentleycs.visualstudio.com/UX%20Design/_build/latest?definitionId=939)
  [![Teams Link](https://img.shields.io/badge/Microsoft%20Teams-bwc--react-green.svg)](https://teams.microsoft.com/l/channel/19%3aa697e82c0d0a43e58bbd1d01881abac0%40thread.skype/bwc-react?groupId=7ec5737d-780e-40e6-bf0e-e3991fd6f3a1&tenantId=067e9632-ea4c-4ed9-9e6d-e294956e284b)

  [Key features](#key-features) • [How to setup](#how-to-setup) • [How to use](#how-to-use) • [Contributing](#contributing)

  <img src="https://i.imgur.com/UVWfang.png" alt="A mockup of an iTwinUI interface.">
</center>

## Key features

The iTwin UI package is the evolution of the now retired [BWC package](https://dev.azure.com/bentleycs/UX%20Design/_git/bwc). It is a CSS (Sass/SCSS) library for building beautiful and well working web UI components with support for multiple color themes within Bentley Systems & iTwin.js applications.

The goal of this project is to transform [UX Design specifications](https://ux.bentley.com/itwin/) into flexible and usable style for Bentley web applications. This is accomplished by developing the style using SASS (.scss) and providing end users with that SASS, as well as CSS and JSS. This provides great flexibility to the end user and more readily enables adoption of the iTwin UI standards.
## How to setup

To clone and build iTwinUI you'll need [Docker](https://www.docker.com/get-started), [Git](https://git-scm.com), and [Yarn](https://yarnpkg.com) installed on your computer. From your command line:

```
# Clone this repository
$ git clone https://bentleycs@dev.azure.com/bentleycs/UX%20Design/_git/iTwinUI

# Go into the repository
$ cd iTwinUI

# Install dependencies
$ yarn install
```
## How to use

See the **Checklist** below.

### To build

`yarn build`

### To test

`yarn test`

### Update reference images

`yarn approve`

### To lint SCSS and fix autofixable errors

`yarn lint`

### To clean

`yarn clean`

### VSCode Users

Install the [stylelint plugin](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint) for linter warnings in your editor

## Contributing

- When making a new component
  - Make a new folder with the name of the component
  - Break variables and mixins into seperate files where possible
  - Make sure to include a classes.scss file in the folder as this file is used to generate all the relevant css classes
    - This file should simply define classes using your mixins.
    - Example from src/buttons/classes.scss, where index imports all mixins and relevant scss
    - Make sure to import your style in src/classes.scss and src/mixins.scss

```
@import './index';

.iui-button-high-visibility {
  @include iui-button-high-visibility;
}
```

### To add a test

- Make an .html file in tests/ displaying the elements you wish to test, using the built css in lib/css/
- Go to scripts/backstop.js and add a scenario to the scenario array where:
  - `label`: the name of the .html file you created
  - `selectors`: an optional array of strings containing the selectors to be tested, 'html' is default
  - `misMatchThreshold`: an optional number that controls how different the test must be from the reference for it to fail. The higher the number the greater the difference must be to trigger a failure, '0.1' is default

### Checklist

1. Create branch of the form `feature/{description}` or `bug/{description}`
2. Changes made in the `src/` directory
3. Test added to `backstop/tests`

- This is an HTML file that imports the style from `../../lib/css` and implements the classes
- If this file grows too large (see `backstop/tests/tiles.html`) break it into smaller sections, each with a unique id

4. Add the test the the scenarios array in `backstop/scenarios.js`.

- If the test has subsections, add the ID's

5. Use `yarn develop {test name}` to run just the test for what you are developing, making changes as needed.
6. Once you are satisfied with your work, run `yarn approve`.
7. Stage and commit changes.
8. On commit, `yarn lint` and `yarn test` will both be run.
9. After ensuring that neither of these processes errors, push to your branch with `git push`
10. Run `git merge master` to merge any missed changes.
11. [Click this link](https://bentleycs.visualstudio.com/UX%20Design/_git/iTwin%20UI/pullrequests?_a=mine) and create a new pull request.
12. Add reviewers and link work items.
