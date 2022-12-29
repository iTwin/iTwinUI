<p align="center">
  <picture>
    <source
      media='(prefers-color-scheme: dark)'
      srcset='https://itwinplatformcdn.azureedge.net/iTwinUI/iTwinUI-new-dark-logo.png'
    />
    <img
      src='https://itwinplatformcdn.azureedge.net/iTwinUI/iTwinUI-new-logo.png'
      alt='iTwinUI logo'
    />
  </picture>
</p>

<p align="center">An open-source design system that helps us build a unified web experience.</p>
  
<div align="center">
  
  [![itwinui-css on npm](https://img.shields.io/npm/v/@itwin/itwinui-css)](https://www.npmjs.com/package/@itwin/itwinui-css)
  [![Build status](https://github.com/iTwin/iTwinUI/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/iTwin/iTwinUI/actions/workflows/build.yml?query=branch%3Amain)
  [![Dependencies Status](https://img.shields.io/badge/dependencies-none-brightgreen)](https://www.npmjs.com/package/@itwin/itwinui-css?activeTab=dependencies)

</div>

iTwinUI is a design system for building beautiful and well working web UI components within Bentley Systems & iTwin.js applications. It supports light and dark color schemes and also comes with high contrast versions of both.

iTwinUI-css consists of the following packages:

- `@itwin/itwinui-css` - the CSS for every component as well as some global styles
- `@itwin/itwinui-variables` - CSS variables for iTwinUI's design tokens

If you're looking for React components, check out [`@itwin/itwinui-react`](https://github.com/iTwin/iTwinUI/packages/itwinui-react) which is built on top of iTwinUI-css.

---

## Installation

Install both packages:

```
npm install @itwin/itwinui-css @itwin/itwinui-variables
```

or if using yarn:

```
yarn add @itwin/itwinui-css @itwin/itwinui-variables
```

---

## Usage

Import the global styles and variables (only needs to be done once per page):

```css
@import '@itwin/itwinui-variables';
@import '@itwin/itwinui-css/global';
```

> **Note**: If your project doesn't support export maps, then you might need to import the css from the real paths:
>
> ```css
> @import '@itwin/itwinui-variables/index.css';
> @import '@itwin/itwinui-css/css/global.css';
> ```

Apply the `iui-root` class at the root of your app, and use `data-iui-theme` to specify theme (`light` or `dark`). See [`@itwin/itwinui-variables/README.md`](https://github.com/iTwin/iTwinUI/blob/main/packages/itwinui-variables/README.md) for more details on theming.

```html
<body class="iui-root" data-iui-theme="light">
  <!-- your application code -->
</body>
```

Now you can start using our components:

```css
@import '@itwin/itwinui-css/css/button.css';
```

```html
<button class="iui-button" data-iui-variant="default">
  <span>Hello world</span>
</button>
```

Check out our [demo website](https://itwin.github.io/iTwinUI) for a preview of all our components.

---

## Contributing

Are you interested in helping iTwinUI grow and expand? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/iTwinUI/issues).
Please read our [CONTRIBUTING.md](https://github.com/iTwin/iTwinUI/blob/main/CONTRIBUTING.md) for more information.

## Changelog

Read our [CHANGELOG.md](https://github.com/iTwin/iTwinUI/blob/main/packages/itwinui-css/CHANGELOG.md) to find recent changes.
