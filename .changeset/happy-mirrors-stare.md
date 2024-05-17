---
"@itwin/itwinui-react": minor
---

Fixed a bug in `ComboBox` where the controlled state (`value` prop) was not given priority over the uncontrolled state.

As a result:
* setting the default value using `value={myDefaultValue}` will no longer work. Instead, use the new `defaultValue` prop.
* passing `value={undefined}` or `value={null}` will continue to reset the value. However, `value={null}` will switch to/remain in the *controlled* state. To reset the value and switch to/remain in the *uncontrolled* state, use `value={undefined}`.
