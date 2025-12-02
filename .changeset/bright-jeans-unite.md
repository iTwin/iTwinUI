---
'@itwin/itwinui-react': patch
---

Fixed a bug in `Table` where the SelectionColumn Header would incorrectly calculate the indeterminate state if `state.selectedRowIds` contained any `false` values.
