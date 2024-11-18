---
'@itwin/itwinui-css': major
---

Multi-select with now requires the tag-container to be rendered outside the select-button, and also requires an additional `data-iui-multi` attribute on the select-button.

<details>
<summary>Diff</summary>

```diff
  <div class='iui-input-with-icon'>
    <div
      role='combobox'
      tabindex='0'
      class='iui-select-button iui-field'
+     data-iui-multi
    >
-   <span class='iui-content'>
-     <div class='iui-select-tag-container'>…</div>
-   </span>
    </div>
    <svg class='iui-end-icon'>…</svg>
+   <span class='iui-content'>
+     <div class='iui-select-tag-container'>…</div>
+   </span>
  </div>
```

</details>
