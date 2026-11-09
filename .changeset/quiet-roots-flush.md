---
'@itwin/itwinui-react': patch
---

Fixed a "Maximum update depth exceeded" error in React 19 when many components that use shadow DOM (e.g. `ProgressRadial`, `ProgressLinear`, `VisuallyHidden`) mount at the same time.
