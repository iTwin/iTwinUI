---
'@itwin/itwinui-react': minor
'@itwin/itwinui-css': patch
---

`Select` will now render a `<div role=combobox>` instead of a generic `<div>` for the trigger element. This element now also supports passing DOM props/attributes using `triggerProps`.

`LabeledSelect` will correctly associate the label with select's trigger using `aria-labelledby`.
