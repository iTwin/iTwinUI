---
'@itwin/itwinui-react': patch
---

Fixed `ThemeProvider` bug of re-mounting its children and losing state when `portalContainer` is toggled between `undefined` and defined.
