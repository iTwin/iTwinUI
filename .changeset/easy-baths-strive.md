---
'@itwin/itwinui-react': minor
---

Added a new future flag to `ThemeProvider`'s `future` prop: `ToggleSwitch.preferRenderingWithoutWrapper`. Setting this to `true` will render a wrapper if a `label` or `icon` (deprecated) is provided. This make the behavior consistent with `Checkbox` and `Radio`.
