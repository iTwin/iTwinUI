---
'@itwin/itwinui-css': major
---

`.iui-tabs` now requires setting a new `data-iui-orientation` attribute. This change helps support nested tabs correctly.

```diff
 <div
   class='iui-tabs iui-default'
+  data-iui-orientation='horizontal' // or 'vertical'
```
