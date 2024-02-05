---
'@itwin/itwinui-react': minor
---

Removed unnecessary `Tag` styles, and added support for tags to be used as `<button>` elements.

If an `onClick` prop is passed to `Tag`, it will be automatically rendered as a `<button>`. This prop is mutually exclusive with the remove button, to prevent outputting invalid markup (nested buttons).
