---
'@itwin/itwinui-react': minor
---

The styling strategy has changed so there will now be a single stylesheet included at runtime, instead of separate css imports inside every component. All the styles are also wrapped in a cascade layer named `itwinui`. This behavior can be customized using the `includeCss` prop in `ThemeProvider`.

The dependencies on `@itwin/itwinui-css` and `@itwin/itwinui-variables` have been removed, so these packages don't need to be installed if you are only using components from `@itwin/itwinui-react`.
