---
'@itwin/itwinui-css': minor
'@itwin/itwinui-react': minor
---

Added new `TransferList` component. 

This component is used to move one or more items between lists. This is achieved by wrapping a `TransferList` around two `TransferList.ListboxWrapper` subcomponents, and using a `TransferList.Toolbar` in between them for functionality. A `TransferList.ListboxWrapper` wraps around a `TransferList.Listbox` and an optional `TransferList.ListboxLabel`. The `TransferList.Listbox` contains the list of items, and a `TransferList.Item` subcomponent must wrap around each list item.
