---
"@itwin/itwinui-css": minor
---

The default size for an `iui-avatar` element that appears inside of an `iui-tile` is now the same default size as all other `iui-avatar` elements. Setting `data-iui-size` to `"x-large"` will give the `iui-avatar` the size of the old default.

```diff
<div class="iui-tile-thumbnail-icon">
- <span class="iui-avatar"></span>
+ <span class="iui-avatar" data-iui-size="x-large"></span>
</div>
```
