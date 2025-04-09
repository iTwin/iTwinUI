---
'@itwin/itwinui-css': major
---

Multi-select now requires different markup:
- The tag-container should be be rendered outside the select-button.
- The select-button requires an additional `data-iui-multi` attribute.
- For small size only, the tag-container requires an additional `data-iui-size` attribute.

<details>
<summary>Diff</summary>

```diff
  <div class='iui-input-with-icon'>
    <div
      role='combobox'
      tabindex='0'
      class='iui-select-button iui-field'
      data-iui-size='small'
+     data-iui-multi
    >
-     <span class='iui-content'>
-       <div class='iui-select-tag-container'>…</div>
-     </span>
    </div>
    <svg class='iui-end-icon'>…</svg>
+   <span class='iui-content'>
+     <div class='iui-select-tag-container' data-iui-size='small'>…</div>
+   </span>
  </div>
```

</details>
