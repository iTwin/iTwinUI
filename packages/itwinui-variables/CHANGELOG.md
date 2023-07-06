# @itwin/itwinui-variables

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
