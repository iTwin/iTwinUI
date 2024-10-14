---
'@itwin/itwinui-react': patch
---

`ComboBox` with `multiple={true}` properly clears its input's value whenever the filter is cleared. e.g. when an option is toggled or the combobox is unfocused.
