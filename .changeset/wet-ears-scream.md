---
'@itwin/itwinui-react': patch
---

`DatePicker` with `enableRangeSelect` now allows `startDate` and `endDate` to *both* be `undefined` (e.g. when there is no initial range). Passing `Date` to just *one* of them is not allowed.
