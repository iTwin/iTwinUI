<p align="center">
  <picture>
    <source
      media='(prefers-color-scheme: dark)'
      srcSet='https://itwinplatformcdn.azureedge.net/iTwinUI/iTwinUI-new-dark-logo.png'
    />
    <img
      src='https://itwinplatformcdn.azureedge.net/iTwinUI/iTwinUI-new-logo.png'
      alt='iTwinUI logo'
    />
  </picture>
</p>

<h1 align="center">iTwinUI-react</h1>

<div align="center">
  
  [![itwinui-react on npm](https://img.shields.io/npm/v/@itwin/itwinui-react)](https://www.npmjs.com/package/@itwin/itwinui-react)
  [![Build status](https://github.com/iTwin/iTwinUI/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/iTwin/iTwinUI/actions/workflows/build.yml?query=branch%3Amain)

</div>

## What is iTwinUI-react?

iTwinUI-react is a React component library for [iTwinUI](https://github.com/iTwin/iTwinUI).
The goal of this package is to provide React components that make it easier to use the styles from [`@itwin/itwinui-css`](https://github.com/iTwin/iTwinUI/tree/main/packages/itwinui-css). Check out the [demo website](https://itwin.github.io/iTwinUI/react) to see the components in action.

---

## Installation

```
npm install @itwin/itwinui-react
```

```
yarn add @itwin/itwinui-react
```

---

## Usage

Import the component you want and start using it!

```jsx
import { Button } from '@itwin/itwinui-react';

const App = () => (
  <Button>Hello!</Button>
);
```

Yes, that's really all you need as you can see in this live interactive demo:

[![Edit in CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/s/github/iTwin/iTwinUI/tree/main/cra?file=/src/App.tsx)

---

## Theming

By default, all components use the light theme, but we recommend wrapping your root element with `ThemeProvider`. You can pass one of the following values to its `theme` prop:
  - `light` (default)
  - `dark`
  - `os` (which respects the color scheme of the operating system)

```jsx
import { ThemeProvider } from '@itwin/itwinui-react';

const App = () => (
  <>
    <ThemeProvider theme='dark'>
      {/* Your components go here. */}
    </ThemeProvider>
  </>
);
```

---

## FAQ

For a list of frequently asked questions, visit the [wiki](https://github.com/iTwin/iTwinUI/wiki/FAQ).

---

## Contributing

We welcome you to contribute and make this UI design system better. You can submit feature requests or bugs by creating an [issue](https://github.com/iTwin/iTwinUI/issues).
Please read our [CONTRIBUTING.md](https://github.com/iTwin/iTwinUI/blob/main/CONTRIBUTING.md) for more information.

---

## Changelog

Read our [CHANGELOG.md](https://github.com/iTwin/iTwinUI/blob/main/packages/itwinui-react/CHANGELOG.md) to find recent changes.
