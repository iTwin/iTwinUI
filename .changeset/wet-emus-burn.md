---
'@itwin/itwinui-css': major
---

Elevations for `iui-surface` need to be provided using the `data-iui-elevation` data attribute instead of by setting the `--iui-surface-elevation` CSS custom property.

<details>

<summary>Diff</summary>

```diff
- <div class='iui-surface' style='--iui-surface-elevation: var(--iui-shadow-2);'>2</div>
+ <div class='iui-surface' data-iui-elevation='2'>2</div>
```

</details>
