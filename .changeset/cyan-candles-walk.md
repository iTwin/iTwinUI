---
"@itwin/itwinui-css": major
---

- Paginator buttons now use the `.iui-field` data attribute for variant & sizing rather than the `.iui-table-paginator-page-button-small` modifier class.
- Small paginator button width is less than it was before.

```diff
<button
-  class="iui-table-paginator-page-button iui-table-paginator-page-button-small"
+  class="iui-button iui-button-base iui-field iui-table-paginator-page-button"
+  data-iui-variant="borderless"
+  data-iui-size="small"
>
  ...
</button>
```
