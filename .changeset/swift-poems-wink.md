---
'@itwin/itwinui-react': patch
---

`ComboBox` options will now attempt to use `value` (instead of `label`) as `key` in cases where it is serializable.
