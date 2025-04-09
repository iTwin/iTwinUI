---
'@itwin/itwinui-react': minor
---

`Table`'s accessibility tree structure has been fixed. This required moving the `role="table"` attribute from the outermost element to a new element inside the Table's shadow DOM. Elements that are not allowed within `role="table"` (e.g. paginator, lazy-loading row) will now remain outside `role="table"`, thus resulting in a valid accessibility tree.

A new `tableProps` prop has been added, which allows passing props to the inner `role="table"` element.

**NOTE**: For backwards compatibility, ARIA attributes passed directly to `<Table>` will now be automatically propagated to the inner `role="table"` element by default. However, when `tableProps` or `role` is also passed, the ARIA attributes passed directly to `<Table>` will remain on the outermost element to keep the behavior more predictable.
