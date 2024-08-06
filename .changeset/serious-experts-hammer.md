---
'@itwin/itwinui-react': patch
---

Adjusted focus management in `Popover` so that it allows interactive elements inside the popover to be more easily focused. This more closely matches the behavior of the HTML `<dialog>` element, which focuses the first interactive element inside it.
