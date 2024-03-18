---
"@itwin/itwinui-css": minor
---

Adds the `data-iui-status` attribute to elements styled with the `iui-anchor` class. This attribute is intended to be used for `<a>` elements inside of `iui-alert` and `iui-toast` elements.

```html
<div class="iui-alert" data-iui-status="informational">
...
<a class="iui-anchor iui-alert-link" data-iui-status="informational">Hello World</a>
...
</div>
```
