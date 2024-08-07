---
'@itwin/itwinui-react': minor
---

Floating elements will now use `position: fixed` instead of `position: absolute`.
- This fixes some issues when a floating element is placed near the edge of the viewport.
- Some components affected: `Tooltip`, `Popover`, `Select`, `DropdownMenu`, `ComboBox`, etc.
