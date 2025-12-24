---
'@itwin/itwinui-react': minor
---

Added `text` prop to `DefaultCell` as an alternative to `children`. Using this prop will ensure that the cell content is conditionally wrapped with additional elements for better text selection experience and line clamping (if `clamp` prop is not `false`).
