---
'@itwin/itwinui-react': minor
---

Refactored the internal structure of text-only cells to improve the rendering performance of `Table`. The wrapper elements used for line clamping and increasing text selection hit target size are now always rendered in light DOM, avoiding the overhead of shadow DOM.
