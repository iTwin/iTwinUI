---
'@itwin/itwinui-react': minor
---

Fixed `Table` markup by moving `role="table"` from the wrapper to a new `<div>` hidden in a shadow-root in the wrapper. Only the table elements will be slotted into this inner div with `role="table"` leaving non table elements (e.g. paginator, iui-table-body-extra) outside `role="table"`.

Added a new `tableProps` prop to pass props to the new inner `<div>`.

**NOTE**: To preserve accessibility, ARIA attributes passed to `Table` will now automatically be passed to the new inner `<div>` that has `role="table"`. However, passing `tableProps` or `role` to the `Table` will apply the ARIA attributes on the *wrapper* instead.
