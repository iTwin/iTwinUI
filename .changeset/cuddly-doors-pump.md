---
"@itwin/itwinui-css": patch
---

`input`'s and `textarea`'s start/end inline padding when inside `iui-input-flex-container` is now collapsed when it is preceded/followed by a `.iui-input-flex-container-icon` (e.g. borderless `.iui-button` or padded `.iui-svg-icon`). This prevents unnecessary empty space in the flex container.
