---
'@itwin/itwinui-css': minor
---

Added new `iui-svg-icon` class for displaying svgs
- Supports `data-iui-icon-size` attribute for size. Can be one of: 's', 'm', 'l', 'auto'
- Supports `data-iui-icon-color` attribute for fill. Can be one of: 'informational', 'positive', 'warning', 'negative'

```html
<span class='iui-svg-icon' data-iui-icon-size='m' data-iui-icon-color='positive'>
  <svg>...</svg> 
</span>
```

