---
'@itwin/itwinui-react': patch
---

Fixed issue with `Table` column resizing where passing in a `width` value to a column that was less than iTwinUI's default `minWidth` would cause a shift in the `Table` component when the column was resized.
