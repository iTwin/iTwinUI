---
"@itwin/itwinui-react": patch
---

Fixed a bug in `ComboBox` where the `isSelected` passed to `itemRenderer` was always `false` when `multiple` was `true`.
