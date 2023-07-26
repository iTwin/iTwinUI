---
'@itwin/itwinui-react': minor
---

Changed `all: revert` to `all: revert-layer` so that only styles from the v1 layer are reverted, thus avoiding issues with inadvertently removing browser default styles.
