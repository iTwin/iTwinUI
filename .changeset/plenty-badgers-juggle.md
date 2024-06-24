---
'@itwin/itwinui-react': minor
---

`MenuItem`'s `tabIndex` now is `0` when it's selected and `-1` when it's not. Additionally, `MenuItem` passed inside most menu type components (e.g. `DropdownMenu`, `SplitButton`, `Table`'s column manager, etc.) have roving `tabIndex`.
