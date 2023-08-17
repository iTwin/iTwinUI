# @itwin/itwinui-variables

## 2.1.0

### Minor Changes

- [#1485](https://github.com/iTwin/iTwinUI/pull/1485): Added new `--iui-color-text-placeholder` variable.

## 2.0.0

### Major Changes

- 2397ee0c: `.iui-root` is now required at the top of the app. Variables will _not_ be automatically set on `:root`.

  ```html
  <body class="iui-root">
    <!-- your application code -->
  </body>
  ```
