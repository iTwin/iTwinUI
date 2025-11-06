---
'@itwin/itwinui-css': major
---

`iui-toggle-switch-wrapper` is now only needed when have a label or a custom icon (deprecated). `data-iui-size` is now applied to the `<input>` element instead of the wrapper.

<details>
<summary>Diff</summary>

```diff
<label
  class='iui-toggle-switch-wrapper iui-label-on-right'
- data-iui-size="small"
>
  <input
    class='iui-toggle-switch'
+   data-iui-size="small"  
  />
  <svg-checkmark class='iui-toggle-switch-icon'>…</svg-checkmark>
  <span class='iui-toggle-switch-label'>…</span>
</label>


- <div class='iui-toggle-switch-wrapper'>
-   <input class='iui-toggle-switch' />
-   <svg-checkmark class='iui-toggle-switch-icon'>…</svg-checkmark>
- </div>
+ <input class='iui-toggle-switch' />
```

</details>
