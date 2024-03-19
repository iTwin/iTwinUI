---
"@itwin/itwinui-css": major
---

`iui-anchor` must now be explicitly added to `<a>` elements, in addition to the previous `iui-alert-link`, `iui-breadcrumbs-content`, `iui-tag-basic`, and `iui-toast-anchor` classes.

```diff
-<a class="iui-alert-link">
+<a class="iui-anchor iui-alert-link">
```

```diff
-<a class="iui-breadcrumbs-content">
+<a class="iui-anchor iui-breadcrumbs-content">
```

```diff
-<a class="iui-tag-basic">
+<a class="iui-anchor iui-tag-basic">
```

```diff
-<a class="iui-toast-anchor">
+<a class="iui-anchor iui-toast-anchor">
```

Additionally, all `<a>` elements within `iui-legal-footer` elements will need the `iui-anchor` class.

```diff
<li class="iui-legal-footer-item">
- <a>...</a>
+ <a class="iui-anchor>...</a>
</li>
```
