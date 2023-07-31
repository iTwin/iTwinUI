# @itwin/itwinui-variables

## 3.0.0-dev.1

### Major Changes

- [#1359](https://github.com/iTwin/iTwinUI/pull/1359): `iui-root` has been removed. `data-iui-theme` must now always be set in order to use variables.

### Patch Changes

- [#1360](https://github.com/iTwin/iTwinUI/pull/1360): The `color-scheme` property will now be correctly set for dark theme, resulting in better theming of built-in html elements.

## 2.1.0-dev.0

### Minor Changes

- [#1302](https://github.com/iTwin/iTwinUI/pull/1302): All selectors have been wrapped with `:where` to nullify specificity.

## 2.0.0

### Major Changes

- 2397ee0c: `.iui-root` is now required at the top of the app. Variables will _not_ be automatically set on `:root`.

  ```html
  <body class="iui-root">
    <!-- your application code -->
  </body>
  ```
