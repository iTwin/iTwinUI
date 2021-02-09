<center>

  ![iTwinUI logo](/.storybook/public/itwin.png =167x40)

</center>

<h1 align="center">iTwinUI React</h1>

[![Build Status](https://dev.azure.com/bentleycs/UX%20Design/_apis/build/status/iTwinUI-React?branchName=main)](https://dev.azure.com/bentleycs/UX%20Design/_build/latest?definitionId=4767&branchName=main)
[![Teams Link](https://img.shields.io/badge/Microsoft%20Teams-bwc--react-green.svg)](https://teams.microsoft.com/l/channel/19%3aa697e82c0d0a43e58bbd1d01881abac0%40thread.skype/@bentley/itwinui-react?groupId=7ec5737d-780e-40e6-bf0e-e3991fd6f3a1&tenantId=067e9632-ea4c-4ed9-9e6d-e294956e284b)

[iTwinUI documentation](http://ux.bentley.com/itwin)

[iTwinUI React documentation and demo](https://ux.bentley.com/itwin/react)



## What is iTwinUI React?

`iTwinUI React` is a library built on top of the `iTwinUI` library.
The goal of this project is to provide React components for using the styles and components from the core `iTwinUI` project.

## Install

```
npm install @bentley/itwinui-react
```

```
yarn add @bentley/itwinui-react
```

## Use
Import the component you want and start using it!
> You need to use `ThemeProvider` component only once, recommended in your root component.


```jsx
import { Button, ThemeProvider } from '@bentley/itwinui-react';

const App = () => (
  <>
    <ThemeProvider />
    <Button>Hello!</Button>
  </>
);
```
---

## Contributing

This project is innersourced, so we welcome You to contribute to it and make this UI design system better. You can submit ideas or bugs by creating items in [our backlog.](https://dev.azure.com/bentleycs/UX%20Design/_backlogs/backlog/iTwinUI/Features/?workitem=543453).
Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

---

## Changelog
Read our [CHANGELOG.md](./CHANGELOG.md) to find recent changes.
