---
"@itwin/itwinui-react": patch
---

Fixed an issue where `Tooltip` would stay open after clicking on the trigger element. The tooltip will now be correctly dismissed upon click.

Also affects other components that use tooltips internally: `IconButton`, `SideNavigation`, etc.
