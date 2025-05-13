---
'@itwin/itwinui-react': minor
---

Added a new future flag to `ThemeProvider`: `consistentPropsSpread`. Setting this to `true` will apply all props on the same element. Component affected:
- `ToggleSwitch`:
  - `consistentPropsSpread=false/undefined`: `className` and `style` applied on the wrapper instead of the `input` element where all the other props are applied.
  - `consistentPropsSpread=true`: `className` and `style` applied on the `input` element where all the other props are applied.
