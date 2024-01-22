---
'@itwin/itwinui-react': minor
---

The `portal.to` prop in floating elements now also accepts `null | undefined` which acts identically to the default prop behavior (i.e. as if `portal` was not passed). Components affected: `Dialog`, `DropdownMenu`, `Modal`, `Popover`, `SplitButton`, and `Tooltip`.
