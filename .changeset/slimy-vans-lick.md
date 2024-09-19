---
'@itwin/itwinui-react': minor
---

`Popover` now enables the [`hide` middleware](https://floating-ui.com/docs/hide) to hide the floating content when the trigger is hidden.
* This also affects other popover-like components (e.g. `Select`, `ComboBox`, `DropdownMenu`).
* If the floating content gets hidden even when it shouldn't (e.g. due to some custom styles interfering with the trigger's hide detection), consider disabling the `hide` middleware.
