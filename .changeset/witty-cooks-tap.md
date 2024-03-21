---
"@itwin/itwinui-css": major
---

`iui-breadcrumbs` will need to be added to the classes of all `iui-header-breadcrumbs` elements. `iui-breadcrumbs-list` will also need to be added to the classes of all `iui-header-breadcrumbs-list` elements.

```diff
- <nav class="iui-header-breadcrumbs">
- <ol class="iui-header-breadcrumbs-list">
+ <nav class="iui-breadcrumbs iui-header-breadcrumbs">
+ <ol class="iui-breadcrumbs-list iui-header-breadcrumbs-list">
```
