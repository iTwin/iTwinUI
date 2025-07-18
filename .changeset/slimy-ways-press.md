---
'@itwin/itwinui-react': minor
---

`Popover` now also sets a default max-width as the available width to prevent it from becoming too wide. This can be customized using the new `middleware.size.maxHeight` prop.

Also affects other components that use `Popover` internally: `DropdownMenu`, `ComboBox`, `Select`, etc.
