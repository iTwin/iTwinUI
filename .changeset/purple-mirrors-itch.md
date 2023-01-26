---
'@itwin/itwinui-css': minor
---

- Added classes `iui-multilevel` and `iui-multilevel-header` - adds styling for 'headers' on menus.
- Added class `iui-multilevel-selected` - for the name of a selection on the end of a menu item.
- Added class `iui-flat` - to give a 'flat' look to the menu for placement in a side nav, info panel, etc.

```html
<ul class="iui-menu">
  <li class="iui-menu-item">
    <span class="iui-content">...</span>
    <span class="iui-content iui-multilevel-selected">...</span>
    <svg-caret-right-smallclass="iui-icon"></svg-caret-right-small>
  </li>
</ul>
```

```html
<div class="iui-multilevel">
  <div class="iui-multilevel-header">
    <svg-caret-left-small class="iui-icon"></svg-caret-left-small>
    <span class="iui-content">...</span>
  </div>
  <ul class="iui-menu">
    ...
  </ul>
</div>
```
