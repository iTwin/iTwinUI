---
'@itwin/itwinui-react': patch
---

Fixed broken expandable content when `Table` is asynchronously re-rendered. The max depth reached error caused by the `getRowId` prop passed into `Table` is also fixed.
