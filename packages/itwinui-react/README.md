<p align="center">
  <picture>
    <source
      media='(prefers-color-scheme: dark)'
      srcset='https://itwin.github.io/iTwinUI/logo-dark.svg'
    />
    <img
      src='https://itwin.github.io/iTwinUI/logo.svg'
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
The goal of this package is to provide React components that make it easier to use the styles from [`@itwin/itwinui-css`](https://github.com/iTwin/iTwinUI/tree/main/packages/itwinui-css). Check out the [documentation website](https://itwinui.bentley.com/) to detailed documentation and examples of all components.

🆕 Check out the [v3 migration guide](https://github.com/iTwin/iTwinUI/wiki/iTwinUI-react-v3-migration-guide) if you're upgrading from an older version.

---

## Installation

```
npm install @itwin/itwinui-react
```

---

## Setup

Wrap your application entrypoint in `ThemeProvider` and import `styles.css`.

```jsx
import { ThemeProvider } from '@itwin/itwinui-react';
import '@itwin/itwinui-react/styles.css';

export default function App() {
  return (
    <>
      <ThemeProvider>
        {/* Your components go here. */}
      </ThemeProvider>
    </>
  );
}
```

ThemeProvider has a `theme` prop which accepts one of the following values:
  - `light` (default)
  - `dark`
  - `os` (respects the color scheme of the operating system)
  - `inherit`

---

## Usage

After setting up ThemeProvider and styles, import the component you want and start using it!

```jsx
import { Button } from '@itwin/itwinui-react';

const Page = () => (
  <Button>Hello!</Button>
);
```

Check out this template for a live interactive demo:

[![Edit in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.io/github/iTwin/iTwinUI/tree/main/minimal-sandbox?file=/src/App.tsx)

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
