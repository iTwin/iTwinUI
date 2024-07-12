---
'@itwin/itwinui-react': minor
---

Replaced old virtualization implementation with `@tanstack/react-virtual` for the `Table` component. This change also fixed some issues with `Table` virtualization, including the issue where scrolling would jump when rows are scrolled past in some cases.
