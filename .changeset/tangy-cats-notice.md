---
'@itwin/itwinui-react': minor
---

The behavior of all `on[Value]Change` props has been made consistent such that they are only called when `[value]` actually *changes* (uncontrolled mode) or should *change* (controlled mode).

Affected props include:
* `Tabs.Wrapper`: `onValueChange` prop
* `Tabs`: `onTabSelected` prop
* `DropdownMenu`: `onVisibleChange` prop
* `Popover`: `onVisibleChange` prop
* `Tooltip`: `onVisibleChange` prop
