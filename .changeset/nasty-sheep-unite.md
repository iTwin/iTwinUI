---
'@itwin/itwinui-react': patch
---

Changed the internal implementation of `Table` cells so that an extra wrapper element is rendered when the cell contains _text only_. Any custom cell content (passed via `Cell`) will now be rendered as-is.
