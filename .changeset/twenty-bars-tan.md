---
'@itwin/itwinui-react': patch
---

Fixed `Table` regression where cell content was not stretching to the full cell width. Now, cell hit target size increase and cell clamping will only happen for non custom cells (no custom `Cell` or `cellRenderer`). The additional condition that the value should be a string for clamping still remains.
