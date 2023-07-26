---
'@itwin/itwinui-css': minor
---

Changed `all: revert` to `all: revert-layer` so that only styles from the v1 layer are reverted, thus avoiding issues with inadvertently removing browser default styles. This rule has also been moved from `all.css` to `revert-v1.css`.
