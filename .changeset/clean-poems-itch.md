---
'@itwin/itwinui-react': minor
---

Added a new `wrapperProps` prop to `ToggleSwitch` to pass props to the wrapper. To prevent breaking changes:
- If this new `wrapperProps` is provided or ThemeProvider's new `future.consistentPropsSpread` flag is true, `className` and `style` will be applied on the `input` and `wrapperProps` will be applied on the wrapper.
- Else, `className` and `style` continue to be applied on the wrapper.
