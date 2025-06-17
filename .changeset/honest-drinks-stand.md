---
'@itwin/itwinui-react': patch
---

Fixed `Table` bug where it unintentionally tried to add non-DOM props (e.g. `useControlledState` and `autoResetResize`) to the DOM which lead to a React console warning.
