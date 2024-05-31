---
"@itwin/itwinui-react": minor
---

Fixed a bug in `ComboBox` where the controlled state (`value` prop) was not given priority over the uncontrolled state.

As a result:
* Setting the default value using `value={myDefaultValue}` will no longer work. Instead, use the new `defaultValue` prop.
* Resetting the value using `value={null}` will now force the ComboBox to switch to/remain in *controlled* mode. If you want to reset the value and also switch to/remain in *uncontrolled* mode, then use `value={undefined}` instead.
