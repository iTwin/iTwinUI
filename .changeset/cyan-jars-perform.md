---
'@itwin/itwinui-react': minor
---

Added two new components for building complex input layouts.
 - `InputGrid` for the "outer" layout (label, inputs and statusMessage)
 - `InputWithDecorations` for the "inner" layout (start icon/button, end icon/button)

`LabeledInput`, `LabeledSelect`, `LabeledTextarea` and table `DatePickerInput` have been updated to make use of these new components internally.
