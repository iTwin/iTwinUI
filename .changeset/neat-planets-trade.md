---
"@itwin/itwinui-css": major
---

All individual component CSS files have been removed. Instead, import `all.css` (the root export).

```diff
- @import "@itwin/itwinui-css/css/anchor.css";
- @import "@itwin/itwinui-css/css/button.css";
  …
+ @import "@itwin/itwinui-css";
```
