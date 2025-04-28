---
'@itwin/itwinui-react': patch
---

Fixed `Table` bug where it unintentionally tried to add `scrollToRow` to the DOM and thus led to a console error.
