---
'@itwin/itwinui-react': patch
---

Fixed internal usage of `ResizeObserver` to prevent throwing a "ResizeObserver loop limit exceeded" error. Some affected components: `ButtonGroup`, `Tabs`, `Table`, `Tree`, `Breadcrumbs`, etc.
