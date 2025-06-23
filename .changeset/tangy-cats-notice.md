---
'@itwin/itwinui-react': minor
---

Some `on[Foo]Change` props and similar props are now only called when the value of `foo` *changes* (uncontrolled mode) or should change (controlled mode). Some of the affected components:
* `Tabs.Wrapper`'s `onValueChange` and `Tabs`'s `onTabSelected`. (To listen to each click, use `onClick` on `Tabs.Tab` instead.)
* `DropdownMenu`'s, `Popover`'s, and `Tooltip`'s `onVisibleChange` prop.
