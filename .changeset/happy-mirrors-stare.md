---
"@itwin/itwinui-react": minor
---

Fixed a bug in `ComboBox` where the controlled state (`value` prop) was not given priority over the uncontrolled state. As a result, passing `value={undefined}` now reverts to the uncontrolled state instead of resetting the value. To reset the value, you now need to pass `value={null}`.
