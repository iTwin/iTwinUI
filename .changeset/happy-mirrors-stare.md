---
"@itwin/itwinui-react": minor
---

Fixed a bug in `ComboBox` where the controlled state (`value` prop) was not given priority over the uncontrolled state.

As a result:
* setting the default value using `value={myDefaultValue}` will no longer work. Instead, use the new `defaultValue` prop.
* Passing `value={undefined}` or `value={null}` to reset the value used to both remain in the *uncontrolled* state. However, now `value={null}`/`value={undefined}` will switch to/remain in the *controlled*/*uncontrolled* states respectively.
