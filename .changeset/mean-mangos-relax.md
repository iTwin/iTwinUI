---
'@itwin/itwinui-react': patch
---

Fixed a bug in `ComboBox` with `multiple` enabled where the number of tags used to keep changing in an infinite loop in certain specific container widths. As a result of this fix, the overflow behavior has been improved in other components too (e.g. `ButtonGroup`, `Breadcrumbs`, `MiddleTextTruncation`, etc.)
