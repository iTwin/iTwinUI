---
"@itwin/itwinui-css": major
---

Add `.iui-field` class to unify & centralize basic styling for `.iui-button`, `.iui-input`, and `.iui-select-button`.

- Paginator buttons now use the `.iui-field` data attribute for sizing rather than the `.iui-table-paginator-page-button-small` modifier class.
- `.iui-select-tag-button` now requires `.iui-button .iui-field` and `data-iui-variant="borderless"`.
- `.iui-breadcrumbs-content` now requires `.iui-button .iui-field`.
- `a.iui-breadcrumbs-content` require nested `<span>` and hover state looks more like button.
- `.iui-sidenav-button .iui-expand` now requires `.iui-button .iui-field` and `data-iui-size="small"`.
- Ideas button requires `.iui-button-idea` & `data-iui-variant="high-visibility"` instead of `data-iui-variant="idea"`.
- Disabled `.iui-input` and `.iui-select-button` with a value have a different text color.
- Disabled `.iui-input` and `.iui-select-button` with a placeholder no longer show placeholder text.
- Within `all.scss`, `field` include added.
