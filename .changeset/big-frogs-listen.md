---
'@itwin/itwinui-react': patch
---

Components that use floating-ui will now use stable references to its setter functions in order to prevent a potential infinite re-render loop. Components affected include: `Tooltip`, `Popover`, `ComboBox`, `Select`, `DropdownMenu`, `DropdownButton`, `SplitButton`.
