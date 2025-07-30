---
'@itwin/itwinui-css': major
---

`iui-tabs-wrapper`, `iui-tabs`, `iui-tab`, `iui-tabs-content`, `iui-tabs-actions-wrapper`, and `iui-tabs-actions` now require setting a new `data-iui-orientation` attribute. This change helps support nested tabs correctly.

**Note**: Nested tabs is _not_ recommended for UX related reasons.

<details>
  <summary>Diff</summary>

```diff
- <div class='iui-tabs-wrapper iui-horizontal'>
+ <div class='iui-tabs-wrapper' data-iui-orientation="horizontal">
  <div
    class='iui-tabs'
+   data-iui-orientation="horizontal"    
  >
    <button
      class='iui-tab'
+     data-iui-orientation="horizontal"
    >
      …
    </button>

    <button
      class="iui-button iui-button-base iui-field"
      data-iui-variant="borderless"
    >
      …
    </button>
  </div>

  <div
    class='iui-tabs-actions-wrapper'
+   data-iui-orientation="horizontal"
  >
    <div
      class='iui-tabs-actions'
+     data-iui-orientation="horizontal"
    >
      …
    </div>
  </div>

  <div
    class='iui-tabs-content'
+   data-iui-orientation="horizontal"    
  >
    …
  </div>
</div>
```

</details>
