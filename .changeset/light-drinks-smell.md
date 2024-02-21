---
'@itwin/itwinui-css': patch
---

`.iui-input-flex-container` now has an inline padding of `1px` to account for the `1px` border's inline edges. This prevents content that touches the inline borders from being overlapped by the border by `1px`. Slightly modified `.iui-expandable-searchbox` styles to account for the new padding.
