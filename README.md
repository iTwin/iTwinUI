<p align="center">
  <picture>
    <source
      media='(prefers-color-scheme: dark)'
      srcset='https://itwin.github.io/iTwinUI/dev/logo-dark.svg'
    />
    <img
      src='https://itwin.github.io/iTwinUI/dev/logo.svg'
      alt='iTwinUI logo'
    />
  </picture>
</p>

<p align="center">An open-source design system that helps us build a unified web experience.</p>

iTwinUI is a design system for building beautiful and well working web UI components within Bentley Systems & iTwin.js applications. It supports light and dark color schemes and also comes with high contrast versions of both.

iTwinUI consists of the following packages:

- [`@itwin/itwinui-css`](https://github.com/iTwin/iTwinUI/blob/main/packages/itwinui-css/README.md) - the CSS for every component as well as some global styles
- [`@itwin/itwinui-variables`](https://github.com/iTwin/iTwinUI/blob/main/packages/itwinui-variables/README.md) - CSS variables for iTwinUI's design tokens
- [`@itwin/itwinui-react`](https://github.com/iTwin/iTwinUI/blob/main/packages/itwinui-react/README.md) - react components that consume `@itwin/itwinui-css`

---

🆕 **iTwinUI v3** is now available! To upgrade from an older version, check out the [v3 migration guide](https://github.com/iTwin/iTwinUI/wiki/iTwinUI-react-v3-migration-guide).

---

## Usage

The easiest way to get started with iTwinUI is by using React components from `@itwin/itwinui-react`:

```jsx
import { ThemeProvider, Button } from '@itwin/itwinui-react';
import '@itwin/itwinui-react/styles.css';

export default function App() {
  return (
    <>
      <ThemeProvider theme='light'>
        <Button>Hello!</Button>
      </ThemeProvider>
    </>
  );
}
```

For more details, check out the [iTwinUI documentation website](https://itwinui.bentley.com).

---

## Contributing

Are you interested in helping iTwinUI grow and expand? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/iTwinUI/issues).
Please read our [CONTRIBUTING.md](https://github.com/iTwin/iTwinUI/blob/main/CONTRIBUTING.md) for more information.
