---
'@itwin/itwinui-react': minor
'@itwin/itwinui-css': minor
---

All styles will now be scoped and always take preference over previous major versions (`@itwin/itwinui-react`@`1.x`).

This enables incremental adoption of `@itwin/itwinui-react`@`2.x` for some parts of the app, while still using `1.x` for the rest of the app.

To use this feature, make sure that all parts that use v1 are updated to `@itwin/itwinui-css@0.63.2`, and then wrap the v2 parts in `ThemeProvider`:

```html
<body>
  <!-- rest of your app (v1) -->

  <ThemeProvider>
    <!-- new UI built using v2 -->
  </ThemeProvider>
</body>
```

For packages, there is a new theme `'inherit'`. Setting this enables scoping without forcing the default light theme. When the app eventually updates to v2, it can use its own `ThemeProvider` with any theme, and the components inside your package will inherit the app's theme.

```html
<body>
  <!-- rest of the app (maybe v1) -->

  <!-- inside your package ⬇️ -->
  <ThemeProvider theme='inherit'>
    <!-- v2 components inside package -->
  </ThemeProvider>
</bod
