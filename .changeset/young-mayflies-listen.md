---
'@itwin/itwinui-react': minor
---

`Popover` now enables the [`size` middleware](https://floating-ui.com/docs/size) to prevent it from overflowing the viewport.
- This also affects other popover-like components (e.g. `Select`, `ComboBox`, `DropdownMenu`).
- `Popover` now also sets a default max-height of `400px` to prevent it from becoming too large. This can be customized using the `middleware.size.maxHeight` prop.
