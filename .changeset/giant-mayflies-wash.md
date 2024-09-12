---
'@itwin/itwinui-react': patch
---

Fixed `scrollToRow` in un-virtualized `Table`. In virtualized `Table`, `scrollToRow` now also scrolls to the top for consistent behavior.
