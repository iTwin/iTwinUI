---
"@itwin/itwinui-css": major
---

Add `.iui-field` class to unify & centralize basic styling for `.iui-button`, `.iui-input`, `.iui-input-flex-container`, and `.iui-select-button`.
Paginator buttons now use the `.iui-field` data attribute for sizing rather than the `.iui-table-paginator-page-button-small` modifier class.
`.iui-select-tag-button` now requires `.iui-button .iui-field` and `data-iui-variant="borderless"`.
`.iui-breadcrumbs-content` now requires `.iui-button .iui-field`.
`.iui-sidenav-button .iui-expand` now requires `.iui-button .iui-field` and `data-iui-size="small"`.
Introduce `data-iui-type` with values of `feedback` or `dropdown` to `.iui-button`.

```diff
<button
  class="
    iui-button
+   iui-field
-   iui-button-dropdown
  "
+ data-iui-type="dropdown"
>
```

```diff
<button
  class="
    iui-button
+   iui-field
  "
- data-iui-variant="idea"
+ data-iui-variant="high-visibility"
+ data-iui-type="feedback"
>
```
