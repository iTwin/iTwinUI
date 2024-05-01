---
"@itwin/itwinui-css": major
---

`.iui-table-paginator-page-button` now requires the same markup as borderless buttons. The `.iui-table-paginator-page-button-small` modifier class has been removed.

```diff
  <button
-   class="iui-table-paginator-page-button iui-table-paginator-page-button-small"
+   class="iui-button iui-button-base iui-field iui-table-paginator-page-button"
+   data-iui-variant="borderless"
+   data-iui-size="small"
  >
```

As a result, the small paginator will now have a smaller width than before.
