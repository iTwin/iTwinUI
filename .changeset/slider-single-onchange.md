---
'@itwin/itwinui-react': patch
---

Fixed `Slider` so that `onChange` is fired only once per pointer interaction. Previously, pressing on the rail (or slightly off-center on a thumb) fired `onChange` immediately and then again on release. The rail press now activates the closest thumb, so the value can be dragged from there and is committed with a single `onChange` on `pointerup`.
