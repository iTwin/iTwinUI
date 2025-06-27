---
'@itwin/itwinui-react': patch
---

`DropdownButton`'s `menuItems` now also allows directly passing `React.JSX.Element[]` or `React.JSX.Element` (like `DropdownMenu`'s `menuItems`). If doing so, can be used with `dropdownMenuProps` prop's `closeOnItemClick`.
