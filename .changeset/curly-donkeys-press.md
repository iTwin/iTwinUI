---
'@itwin/itwinui-css': major
---

`iui-select-tag` and related classes must now be used together with `iui-tag` (and related) classes. The `iui-select-tag-button-icon` class has been removed.

<details>

<summary>Diff</summary>

```diff
- <span class="iui-select-tag">
+ <span class="iui-select-tag iui-tag">
-   <span class="iui-select-tag-label">
+   <span class="iui-select-tag-label iui-tag-label">
      …
    </span>
    <button
-     class="iui-button iui-field iui-select-tag-button"
+     class="iui-button iui-field iui-select-tag-button iui-tag-button"
      aria-label="…"
    >
-     <svg class="iui-button-icon iui-select-tag-button-icon">…</svg>
+     <svg class="iui-button-icon">…</svg>
    </button>
  </span>
```

</details>
