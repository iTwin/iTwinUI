---
"@itwin/itwinui-css": major
---

Ideas button now requires `.iui-button-idea` and `data-iui-variant="high-visibility"` instead of `data-iui-variant="idea"`.

```diff
 <button
-  class="iui-button iui-button-base"
+  class="iui-button iui-button-base iui-field iui-button-idea"
-  data-iui-variant="idea"
+  data-iui-variant="high-visibility"
 >
```
