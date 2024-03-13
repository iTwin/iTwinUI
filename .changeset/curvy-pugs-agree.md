---
"@itwin/itwinui-css": major
---

`.iui-table-row[data-iui-loading]` has been replaced with a new `iui-table-body-extra` class, which must be set on an element outside the table-body.

```diff
 <div class="iui-table">
  …
  <div class="iui-table-body">
    …
-   <div class="iui-table-row" data-iui-loading="true">
-     <div class="iui-table-cell">
-       <div class="iui-progress-indicator-radial"></div>
-     </div>
-   </div>
  </div>
+ <div class="iui-table-body-extra" data-iui-loading="true">
+   <div class="iui-progress-indicator-radial"></div>
+ </div>
 </div>
 ```
