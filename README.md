<p align="center">
  <img src="https://itwinplatformcdn.azureedge.net/iTwinUI/iTwinUI-logo.png" alt="iTwinUI logo" />
</p>

<h3 align="center">An open-source design system that helps us build a unified web experience.<h3>
  
<div align="center">
  [![Dependencies Status](https://status.david-dm.org/gh/dwyl/esta.svg)](https://david-dm.org/dwyl/esta)
</div>

<div align="center">
  [Key features](#key-features) • [Install](#install) • [Use](#use) • [Contributing](#contributing)
</div>

<p align="center">
  ![A mockup of an iTwinUI interface.](https://itwinplatformcdn.azureedge.net/iTwinUI/interface-mockup.png)
</p>


## Key features

The iTwinUI package is a CSS (Sass/SCSS) library for building beautiful and well working web UI components with support for multiple color themes within Bentley Systems & iTwin.js applications.

The goal of this project is to transform [UX Design specifications](https://ux.bentley.com/itwin/) into flexible and usable style for Bentley web applications. This is accomplished by developing the style using SASS (.scss) and providing end users with that SASS, as well as CSS. This provides great flexibility to the end user and more readily enables adoption of the iTwinUI standards.

---

## Install

```
npm install @bentley/itwinui
```

```
yarn add @bentley/itwinui
```

---

## Use

You need to add `iui-body` class to your `<body>` element in order to get recommended stylings.

### Using SASS:

```scss
@import '@bentley/itwinui/scss/variables';

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
@import '@bentley/itwinui/css/global';
```

---

## Contributing

Are you interested in helping iTwinUI grow & expand? You can submit ideas or bugs by creating items in [our backlog](https://dev.azure.com/bentleycs/UX%20Design/_backlogs/backlog/iTwinUI/Features/?workitem=543453).
Please read our [CONTRIBUTING.md](https://dev.azure.com/bentleycs/UX%20Design/_git/iTwinUI?path=%2FCONTRIBUTING.md&_a=preview) for more information.

## Changelog

Read our [CHANGELOG.md](https://dev.azure.com/bentleycs/UX%20Design/_git/iTwinUI?path=%2FCHANGELOG.md&_a=preview) to find recent changes.
