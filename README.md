<p align="center">
  <img src="https://itwinplatformcdn.azureedge.net/iTwinUI/iTwinUI-logo.png" alt="iTwinUI logo" />
</p>

<h1 align="center">iTwinUI-react</h1>

<div align="center">
  
  [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/iTwin/iTwinUI-react/blob/main/LICENSE.md)
  ![Build status](https://github.com/iTwin/iTwinUI-react/actions/workflows/build.yml/badge.svg?branch=main)

</div>

## What is iTwinUI-react?

iTwinUI-react is a library built on top of the [iTwinUI](https://github.com/iTwin/iTwinUI) library.
The goal of this project is to provide React components for using the styles and components from the core `iTwinUI` project.

---

## Install

```
npm install @itwin/itwinui-react
```

```
yarn add @itwin/itwinui-react
```

---

## Use
Import the component you want and start using it!

```jsx
import { Button } from '@itwin/itwinui-react';

const App = () => (
  <Button>Hello!</Button>
);
```
---

## Theming
By default, all components use the light theme but we also provide support for switching to dark theme in two different ways:

- Use `ThemeProvider` in your root component where you can pass one of the following values:
  - `light` (default)
  - `dark`
  - `os` (which respects the color scheme of the operating system)

```jsx
import { ThemeProvider } from '@itwin/itwinui-react';

const App = () => (
  <>
    <ThemeProvider theme='dark' />
    // Your code goes here.
  </>
);
```

- The `useTheme` hook also provides the same functionality as `ThemeProvider`.

```jsx
import { useTheme } from '@itwin/itwinui-react';

const App = () => {
  useTheme('dark');
  return (
    <>
      // Your code goes here.
    </>
  );
};
```

*Note: You only need to use one of these methods, and it only needs to be done once.*

---

## Contributing

We welcome you to contribute and make this UI design system better. You can submit feature requests or bugs by creating an [issue](https://github.com/iTwin/iTwinUI-react/issues).
Please read our [CONTRIBUTING.md](https://github.com/iTwin/iTwinUI-react/blob/main/CONTRIBUTING.md) for more information.

---

## Changelog
Read our [CHANGELOG.md](https://github.com/iTwin/iTwinUI-react/blob/main/CHANGELOG.md) to find recent changes.
