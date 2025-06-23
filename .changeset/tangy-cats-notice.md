---
'@itwin/itwinui-react': minor
---

Some `on[Foo]Change` props are now only called when the value of `foo` **changes**. Some of the affected components:
* `Tabs.Wrapper`'s `onValueChange` and `Tabs`'s `onTabSelected` are now correctly called only when the value *changes*. To listen to each click, use `onClick` on `Tabs.Tab` instead.
* `DropdownMenu`'s, `Popover`'s, and `Tooltip`'s `onVisibleChange` prop.
