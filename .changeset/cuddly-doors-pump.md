---
"@itwin/itwinui-css": patch
---

`input`'s and `textarea`'s start/end inline padding when inside `iui-input-flex-container` is now collapsed when it is preceded/followed by a borderless `iui-button` or a padded `iui-svg-icon`. This prevents unnecessary empty space in the flex container.
