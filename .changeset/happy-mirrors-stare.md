---
"@itwin/itwinui-react": minor
---

Fixed a bug in `ComboBox` where the controlled state (`value` prop) was not given priority over the uncontrolled state. Consequently, passing `undefined` now reverts to the uncontrolled state instead of resetting the value. To reset the value, you now need to pass `null`.
