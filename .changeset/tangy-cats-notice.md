---
'@itwin/itwinui-react': patch
---

`Tabs.Wrapper`'s `onValueChange` and `Tabs`'s `onTabSelected` is now correctly called only when the value *changes*. To listen to each click, use `onClick` on `Tabs.Tab` instead.
