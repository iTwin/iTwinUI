---
"@itwin/itwinui-css": major
---

Add `.iui-field` class to unify & centralize basic styling for `.iui-button`, `.iui-input`, and `.iui-select-button`.

- Ideas button requires `.iui-button-idea` & `data-iui-variant="high-visibility"` instead of `data-iui-variant="idea"`.
- Disabled `.iui-input` and `.iui-select-button` with a value have a different text color.
- Disabled `.iui-input` and `.iui-select-button` with a placeholder no longer show placeholder text.
- Hover state colors for `.iui-input` and `.iui-select-button` now match `.iui-button`.
- Within `all.scss`, `field` include added.
