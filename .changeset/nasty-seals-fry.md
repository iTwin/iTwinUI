---
'@itwin/itwinui-css': patch
---

Fixed a visual bug where elements like `iui-button-icon` inside the `iui-button` were not hidden when the button was in a loading state. Now, `data-iui-loading="true"` on `iui-button` hides *all* its children except `iui-button-spinner`.
