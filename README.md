<center>

![iTwinUI logo](https://itwinplatformcdn.azureedge.net/iTwinUI/iTwinUI-logo.png)

**An open-source design system that helps us build a unified web experience.**

[![Build status](https://dev.azure.com/bentleycs/UX%20Design/_apis/build/status/iTwinUI?branchName=main)](https://dev.azure.com/bentleycs/UX%20Design/_build/latest?definitionId=4766&branchName=main)
[![@bentley/itwinui package in Packages feed in Azure Artifacts](https://feeds.dev.azure.com/bentleycs/_apis/public/Packaging/Feeds/cddcc498-6606-47b5-b068-e9fa20167bf8/Packages/2a2598be-dc85-46c1-9b3f-ac6137b357ed/Badge)](https://dev.azure.com/bentleycs/beconnect/_packaging?_a=package&feed=cddcc498-6606-47b5-b068-e9fa20167bf8&package=2a2598be-dc85-46c1-9b3f-ac6137b357ed&preferRelease=true)
[![Teams link](https://img.shields.io/badge/Teams-iTwinUI-7B83EB?logo=microsoft-teams&logoColor=white)](https://teams.microsoft.com/l/channel/19%3a6ed5d7dd0f5541158ae8ef9748f413de%40thread.skype/iTwinUI?groupId=7ec5737d-780e-40e6-bf0e-e3991fd6f3a1&tenantId=067e9632-ea4c-4ed9-9e6d-e294956e284b)

[Key features](#key-features) • [Install](#install) • [Use](#use) • [Contributing](#contributing)

![A mockup of an iTwinUI interface.](https://itwinplatformcdn.azureedge.net/iTwinUI/interface-mockup.png)

</center>

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

Using SASS:

```scss
@import '@bentley/itwinui/scss/mixins';

.my-class {
  padding: $iui-m;

  @include themed {
    color: t(iui-text-color);
  }
}
```

> Note: We highly recommend using post-processing tools for CSS (like [postcss](https://www.npmjs.com/package/postcss) and [autoprefixer](https://www.npmjs.com/package/autoprefixer)) to add vendors' prefixes as we are not doing that manually in SCSS.

Using CSS (applying global styles):

```css
@import '@bentley/itwinui/css/global';
```

---

## Contributing

Are you interested in helping iTwinUI grow & expand? You can submit ideas or bugs by creating items in [our backlog](https://dev.azure.com/bentleycs/UX%20Design/_backlogs/backlog/iTwinUI/Features/?workitem=543453).
Please read our [CONTRIBUTING.md](https://dev.azure.com/bentleycs/UX%20Design/_git/iTwinUI?path=%2FCONTRIBUTING.md&_a=preview) for more information.

## Changelog

Read our [CHANGELOG.md](https://dev.azure.com/bentleycs/UX%20Design/_git/iTwinUI?path=%2FCHANGELOG.md&_a=preview) to find recent changes.
