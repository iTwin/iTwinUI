---
'@itwin/itwinui-css': patch
---

`.iui-search-icon` no longer has the same width as `.iui-button`. Its width also no longer changes with the `.iui-searchbox` size. This is because its padding behavior is now similar to `.iui-svg-icon`'s padding behavior, where it uses a constant padding.
