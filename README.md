<p align="center">
  <img src="https://itwinplatformcdn.azureedge.net/iTwinUI/iTwinUI-logo.png" alt="iTwinUI logo" />
</p>

<p align="center">An open-source design system that helps us build a unified web experience.</p>
  
<div align="center">
  
  [![itwinui-css on npm](https://img.shields.io/npm/v/@itwin/itwinui-css)](https://www.npmjs.com/package/@itwin/itwinui-css)
  [![Build status](https://github.com/iTwin/iTwinUI/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/iTwin/iTwinUI/actions/workflows/build.yml?query=branch%3Amain)
  [![Dependencies Status](https://img.shields.io/badge/dependencies-none-brightgreen)](https://www.npmjs.com/package/@itwin/itwinui-css?activeTab=dependencies)

</div>

<div align="center">
  
  [Key features](#key-features) • [Install](#install) • [Use](#use) • [Contributing](#contributing)

</div>

<p align="center">
  <img src="https://itwinplatformcdn.azureedge.net/iTwinUI/interface-mockup.png" alt="A mockup of an iTwinUI interface." />
</p>

## Key features

The iTwinUI package is a CSS (Sass/SCSS) library for building beautiful and well working web UI components with support for multiple color themes within Bentley Systems & iTwin.js applications.

The goal of this project is to transform UX design specifications into flexible and usable style for Bentley web applications. This is accomplished by developing the style using Sass (.scss) and providing end users with that Sass, as well as CSS. This provides great flexibility to the end user and more readily enables adoption of the iTwinUI standards.

---

## Install

```
npm install @itwin/itwinui-css
```

```
yarn add @itwin/itwinui-css
```

---

## Use

You need to add `iui-body` class to your `<body>` element in order to get recommended stylings.

### Using Sass:

```scss
@import '@itwin/itwinui-css/scss/variables';

.my-class {
  padding: $iui-m;

  @include themed {
    color: t(iui-text-color);
  }
}
```

> Note: We highly recommend using post-processing tools for CSS (like [postcss](https://www.npmjs.com/package/postcss) and [autoprefixer](https://www.npmjs.com/package/autoprefixer)) to add vendors' prefixes as we are not doing that manually in SCSS.

### Using CSS (applying global styles):

```css
@import '@itwin/itwinui-css/css/global';
```

---

## Contributing

Are you interested in helping iTwinUI grow and expand? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/iTwinUI/issues).
Please read our [CONTRIBUTING.md](https://github.com/iTwin/iTwinUI/blob/main/CONTRIBUTING.md) for more information.

## Changelog

Read our [CHANGELOG.md](https://github.com/iTwin/iTwinUI/blob/main/CHANGELOG.md) to find recent changes.
