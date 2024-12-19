---
'@itwin/itwinui-react': patch
---

Added `Tooltip` delay grouping to components that use `Tooltip` internally. This prevents the tooltip from lingering when quickly hovering across different parts of the component.
* Components affected: `SideNavigation`, `Slider`, `Stepper`, `List`.
