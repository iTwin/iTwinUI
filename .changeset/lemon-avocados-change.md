---
"@itwin/itwinui-css": major
---

All `<a>` elements will now need to have the `iui-anchor` class in order to be styled with iTwinUI's standard link styling. Classes that previously provided these styles will no longer provide them. These effected classes are `iui-alert-link`, `iui-breadcrumbs-content`, `iui-tag-basic`, and `iui-toast-anchor`. Additionally, all `<a>` elements within `iui-legal-footer` elements will need the `iui-anchor` class.

```diff
<div class="iui-alert">
...
-<a class="iui-alert-link">Hello World</a>
+<a class="iui-anchor iui-alert-link">Hello World</a>
...
</div>
```
