---
'@itwin/itwinui-react': minor
---

Help with migration to *future* iTwinUI versions:
* Added a `future` prop to `ThemeProvider` to enable certain features from future versions.
* Added a theme bridge to make v3 components look like v5 components and thus allow using v5 components in existing v3 apps. To enable, pass `{ themeBridge: true }` to `future` ([remaining setup steps and more info](https://github.com/iTwin/iTwinUI/wiki/iTwinUI-v5-theme-bridge)).
