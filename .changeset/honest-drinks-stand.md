---
'@itwin/itwinui-react': patch
---

Fixed `Table` bug where it unintentionally tries to add props (e.g. `useControlledState` and `autoResetResize`) to the DOM which leads to a console error.
