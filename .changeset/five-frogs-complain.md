---
'@itwin/itwinui-react': minor
---

`ThemeProvider` will now attempt to automatically load `styles.css` if using `theme="inherit"` (or `includeCss` if using other themes).

While applications are still advised to manually import `styles.css`, this new behavior is intended to ease the migration for applications that may be using an older version of iTwinUI but want to consume dependencies that rely on iTwinUI v3.
