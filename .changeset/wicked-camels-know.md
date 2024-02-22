---
'@itwin/itwinui-react': patch
---

`InputWithDecorations` now has an inline padding of `1px` to account for the `1px` border's inline edges. This prevents content that touches the border's inline edges from being overlapped by the border by `1px`. Slightly modified expandable `SearchBox` styles to account for the new padding.
