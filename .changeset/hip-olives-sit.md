---
'@itwin/itwinui-react': minor
---

Added a `synchronizeThemeToRoot` option to `ThemeProvider`'s `themeOptions`. When enabled, iTwinUI CSS variables will be available globally, improving compatibility with third-party portals.

This is enabled automatically when `future` (or `future.synchronizeThemeToRoot`) is set to `true`.
