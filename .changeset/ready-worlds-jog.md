---
'@itwin/itwinui-react': patch
---

Fixed types to match internal JS usage:
- `DropdownMenu`'s `children` is now `React.JSX.Element` instead of `React.ReactNode`.
- `DropdownButton`'s `menuItems` now also allows directly passing `React.JSX.Element[]` (can be used with `dropdownMenuProps` prop's `closeOnItemClick`).
