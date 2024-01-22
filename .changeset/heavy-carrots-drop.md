---
'@itwin/itwinui-react': patch
---

Fixed an issue in `Table` where the "select all" checkbox was disabled if all top-level rows were disabled. The logic has been updated to also consider sub-rows.
