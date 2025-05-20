---
'@itwin/itwinui-react': minor
---

Added a new `wrapperProps` prop to `ToggleSwitch` to pass props to the wrapper. As a result:
- If `wrapperProps` is provided, `className` and `style` will be applied on the `input` and `wrapperProps` are
applied on the wrapper.
- Else, `className` and `style` will be applied on the wrapper.
