---
'@itwin/itwinui-react': patch
---

`<Select multiple>` now renders the tag container outside the select-button. While this shouldn't make a noticeable difference in most cases, it might affect the use of `selectedItemRenderer`.
