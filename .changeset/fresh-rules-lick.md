---
'@itwin/itwinui-react': patch
---

Updated internal usage of `ResizeObserver` to prevent throwing a benign "ResizeObserver loop limit exceeded" error in React 17 apps. Some affected components: `ButtonGroup`, `Tabs`, `Table`, `Tree`, `Breadcrumbs`, etc.
